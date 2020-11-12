const __babelParser = require('@babel/parser');
const __babelTraverse = require('@babel/traverse').default;
const { assign } = require('lodash');
const __uniquid = require('../../string/uniqid');
const __babelGenerator = require('@babel/generator').default;
const __isAtTopLevel = require('../ast/isAtTopLevel');

let _topLevelNodes;
let _exportedNames = [],
  _isDefaultAlreadyExported = false,
  _program;
module.exports = ({ types: t }) => ({
  pre(state) {
    _topLevelNodes = [];
    _exportedNames = [];
    _isDefaultAlreadyExported = false;
    _program = null;
  },
  visitor: {
    Program(path) {
      _program = path;
      _topLevelNodes = path.get('body');
    },
    CallExpression(path) {
      const topLevelBody = path.findParent(t.isProgram).container.program.body;

      if (
        t.isIdentifier(path.node.callee, { name: 'require' }) &&
        t.isStringLiteral(path.node.arguments[0])
        // path.node.arguments.length === 1
      ) {
        const program = path.findParent(t.isProgram);
        const requireExpression = path.parentPath;
        const dependencyName = path.node.arguments[0].value;

        // console.log(__babelGenerator(requireExpression));

        // Scenario:
        // var foo = require('bar')
        if (
          path.parentPath &&
          path.parentPath.parentPath &&
          path.parentPath.parentPath.parentPath &&
          t.isVariableDeclaration(path.parentPath.parentPath.parentPath.node) &&
          path.parentPath.parentPath.parentPath.node.declarations &&
          path.parentPath.parentPath.parentPath.node.declarations[0] &&
          t.isIdentifier(
            path.parentPath.parentPath.parentPath.node.declarations[0].id
          )
        ) {
          const assignmentExpression = path.parentPath.parentPath.parentPath;
          const assignmentExpressionNode = assignmentExpression.node;
          const assignedName =
            path.parentPath.parentPath.parentPath.node.declarations[0].id.name;

          const importName = path.scope.generateUidIdentifier(assignedName);

          let importAst = __babelParser.parse(
            `import ${assignedName} from '${dependencyName}'`,
            {
              sourceType: 'module',
              allowUndeclaredExports: true
            }
          );

          if (!__isAtTopLevel(assignmentExpression)) {
            topLevelBody.unshift(importAst);
            path.parentPath.node.init = importName;
          } else {
            path.parentPath.parentPath.replaceWith(importAst);
            path.parentPath.node.init = importName;
          }

          return;
        }

        if (
          t.isVariableDeclarator(path.parentPath.node) &&
          t.isIdentifier(path.parentPath.node.id)
        ) {
          const assignedName = path.parentPath.node.id.name;

          if (t.isVariableDeclaration(path.parentPath.parentPath.node)) {
            const importName = path.scope.generateUidIdentifier(assignedName);

            let importAst = __babelParser.parse(
              `import ${assignedName} from '${dependencyName}'`,
              {
                sourceType: 'module',
                allowUndeclaredExports: true
              }
            );

            if (!__isAtTopLevel(requireExpression)) {
              topLevelBody.unshift(importAst);
              path.parentPath.node.init = importName;
            } else {
              path.parentPath.parentPath.replaceWith(importAst);
              path.parentPath.node.init = importName;
            }
          }
        }

        // Scenario:
        // var foo = require('bar').baz;
        // TODO: Support chained member expressions like require('foo').bar.baz.lol
        else if (
          t.isMemberExpression(path.parentPath.node, { computed: false })
        ) {
          const memberExpressionPath = path.parentPath;
          const propertyName = memberExpressionPath.node.property;

          if (
            t.isVariableDeclarator(memberExpressionPath.parentPath.node) &&
            t.isIdentifier(memberExpressionPath.parentPath.node.id)
          ) {
            const variableDeclarator = memberExpressionPath.parentPath.node;
            const assignedName = memberExpressionPath.parentPath.node.id;

            if (
              t.isVariableDeclaration(
                memberExpressionPath.parentPath.parentPath.node
              )
            ) {
              const importName = path.scope.generateUidIdentifierBasedOnNode(
                assignedName
              );

              variableDeclarator.init = importName;

              program.node.body.unshift(
                t.importDeclaration(
                  [t.importSpecifier(importName, propertyName)],
                  t.stringLiteral(dependencyName)
                )
              );
            }
          }
        }
      }
    },

    MemberExpression(path) {
      const topLevelBody = path.findParent(t.isProgram).container.program.body;

      if (
        t.isIdentifier(path.node.object, { name: 'module' }) &&
        t.isIdentifier(path.node.property, { name: 'exports' })
      ) {
        if (
          t.isAssignmentExpression(path.parentPath.node) &&
          t.isExpressionStatement(path.parentPath.parentPath.node)
        ) {
          const assignmentExpression = path.parentPath;

          // Scenario:
          // module.exports = require('foo');
          if (
            t.isCallExpression(assignmentExpression.node.right) &&
            t.isIdentifier(assignmentExpression.node.right.callee, {
              name: 'require'
            }) &&
            t.isStringLiteral(assignmentExpression.node.right.arguments[0]) &&
            assignmentExpression.node.right.arguments.length === 1
          ) {
            assignmentExpression.parentPath.replaceWith(
              // Output:
              // export { default } from 'foo'

              t.exportNamedDeclaration(
                null,
                [
                  t.exportSpecifier(
                    t.identifier('default'),
                    t.identifier('default')
                  )
                ],
                assignmentExpression.node.right.arguments[0]
              )

              // Output:
              // export * from 'foo'

              // t.exportAllDeclaration(
              //   assignmentExpression.node.right.arguments[0]
              // )
            );
            return;
          }

          // Scenario:
          // module.exports = bar;
          if (t.isExpression(assignmentExpression.node.right)) {
            const code = __babelGenerator(assignmentExpression.node).code;

            // if (_topLevelNodes.indexOf(path.node) !== -1) {
            //   console.log('AT top');
            // }

            let wasAtTopLevel = true;
            if (!__isAtTopLevel(assignmentExpression)) {
              topLevelBody.push(
                t.exportDefaultDeclaration(assignmentExpression.node.right)
              );
              _isDefaultAlreadyExported = true;
              wasAtTopLevel = false;
            }

            if (
              !wasAtTopLevel ||
              ((code.toLowerCase().includes('module.exports.default') ||
                code.toLowerCase().includes('module.exports')) &&
                _isDefaultAlreadyExported)
            ) {
              assignmentExpression.parentPath.remove();
            } else {
              assignmentExpression.parentPath.replaceWith(
                t.exportDefaultDeclaration(assignmentExpression.node.right)
              );
              _isDefaultAlreadyExported = true;
            }
          }
          return;
        }

        if (t.isMemberExpression(path.parentPath.node)) {
          const subMemberExpression = path.parentPath;
          const namedExport = subMemberExpression.node.property;

          if (
            t.isAssignmentExpression(subMemberExpression.parentPath.node) &&
            t.isExpressionStatement(
              subMemberExpression.parentPath.parentPath.node
            )
          ) {
            const assignmentExpression = subMemberExpression.parentPath;

            // Scenario:
            // module.exports.foo = require('bar');
            if (
              t.isCallExpression(assignmentExpression.node.right) &&
              t.isIdentifier(assignmentExpression.node.right.callee, {
                name: 'require'
              }) &&
              t.isStringLiteral(assignmentExpression.node.right.arguments[0]) &&
              assignmentExpression.node.right.arguments.length === 1
            ) {
              assignmentExpression.parentPath.replaceWith(
                t.exportNamedDeclaration(
                  null,
                  [t.exportSpecifier(t.identifier('default'), namedExport)],
                  assignmentExpression.node.right.arguments[0]
                )
              );

              return;
            }

            // Scenario:
            // module.exports.foo = bar;
            if (t.isExpression(assignmentExpression.node.right)) {
              const varId = __uniquid();
              const value = __babelGenerator(assignmentExpression.node.right)
                .code;
              const name = assignmentExpression.node.left.property.name;
              if (!value || value === 'module.exports') return;

              topLevelBody.unshift(__babelParser.parse(`let __${varId}`));
              topLevelBody.push(
                __babelParser.parse(`export { __${varId} as ${name} }`, {
                  sourceType: 'module',
                  allowUndeclaredExports: true
                })
              );
              assignmentExpression.replaceWithSourceString(
                `__${varId} = ${value}`
              );
            }
          }
        }

        return;
      }

      if (
        t.isIdentifier(path.node.object, { name: 'exports' }) &&
        t.isAssignmentExpression(path.parentPath.node)
      ) {
        const assignmentExpression = path.parentPath;
        const namedExport = path.node.property;
        const topLevelBody = path.findParent(t.isProgram).container.program
          .body;

        // Scenario:
        // exports.foo = require('bar');
        if (
          t.isCallExpression(assignmentExpression.node.right) &&
          t.isIdentifier(assignmentExpression.node.right.callee, {
            name: 'require'
          }) &&
          t.isStringLiteral(assignmentExpression.node.right.arguments[0]) &&
          assignmentExpression.node.right.arguments.length === 1
        ) {
          assignmentExpression.parentPath.replaceWith(
            t.exportNamedDeclaration(
              null,
              [t.exportSpecifier(t.identifier('default'), namedExport)],
              assignmentExpression.node.right.arguments[0]
            )
          );
          return;
        }

        if (t.isExpression(assignmentExpression.node.right)) {
          // Scenario:
          // exports.default = bar;
          if (t.isIdentifier(namedExport, { name: 'default' })) {
            assignmentExpression.parentPath.replaceWith(
              t.exportDefaultDeclaration(assignmentExpression.node.right)
            );
            return;
          }

          // Scenario:
          // exports.foo = bar;
          let expressions = path.container;
          if (!Array.isArray(expressions)) expressions = [expressions];
          expressions.forEach((expression, i) => {
            if (!expression) return;
            const varId = __uniquid();
            const value = __babelGenerator(expression.right).code;
            const name = namedExport.name;

            if (!value) return;

            if (_exportedNames.indexOf(name) !== -1) return;
            _exportedNames.push(name);

            topLevelBody.unshift(__babelParser.parse(`let __${varId}`));
            topLevelBody.push(
              __babelParser.parse(`export { __${varId} as ${name} }`, {
                sourceType: 'module',
                allowUndeclaredExports: true
              })
            );
            assignmentExpression.replaceWithSourceString(
              `__${varId} = ${value}`
            );
          });
        }
      }
    }
  }
});
