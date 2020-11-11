const __packageRoot = require('../../../path/packageRoot');
const __SPromise = require('../../../promise/SPromise');
const __packageJson = require('../../../package/json');
const __babel = require('@babel/core');
const __babelParser = require('@babel/parser');
const __babelGenerator = require('@babel/generator').default;
const __fs = require('fs');
const __path = require('path');
const __isDir = require('../../../is/directory');
const __sugarConfig = require('../../../config/sugar');
const __SEs6Import = require('../../../es6/SEs6Import');
const __SEs6Export = require('../../../es6/SEs6Export');
const __extension = require('../../../fs/extension');
const __resolve = require('resolve');
const __glob = require('glob');
const __rollup = require('rollup');
const __rollupPluginVirtual = require('@rollup/plugin-virtual');
const __rollupPluginIncludePaths = require('rollup-plugin-includepaths');
const { match } = require('micromatch');
const __moduloze = require('moduloze').build;
const __uniqid = require('../../../string/uniqid');
const __buildInModules = require('builtin-modules');
const { parse } = require('path');
const __unquote = require('../../../string/unquote');

/**
 * @name                js
 * @namespace           sugar.node.server.frontend.handlers
 * @type                Function
 *
 * This function is responsible of responding to express requests made on the home page
 *
 * @param         {Object}          req             The express request object
 * @param         {Object}          res             The express response object
 * @param         {Object}         [settings={}]    The handler settings
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = async function js(req, res, settings = {}) {
  // search for the view to render
  const packageRoot = __packageRoot();
  const packageJson = __packageJson();

  let content = 'not found...';
  let filePath = req.path.slice(0, 1) === '/' ? req.path.slice(1) : req.path;

  const rootDir = __sugarConfig('frontend.rootDir');
  const potentialPath = __path.resolve(rootDir, filePath);
  // try to get the file
  if (__fs.existsSync(potentialPath)) {
    content = __fs.readFileSync(potentialPath, 'utf8');
  }

  if (content) {
    // const parsedContent = __babelParser.parse(content, {
    //   allowImportExportEverywhere: true
    // });

    // console.log(parsedContent.program.body[0]);

    // transpile commonjs to es6
    content = __babel.transformSync(content, __sugarConfig('babel')).code;

    const code = `
    export let name1, name2; // also var, const
    export let name1 = 'plop', name2 = coco, nameN; // also var, const
    export function functionName(arg, arg2 = 'adf'){ const hello = arg2; }
    export class ClassName {}
    export let name1; // also var, const
    
    // Export list
    export { name1, name2, nameN };
    
    // Renaming exports
    export { variable1 as name1, variable2 as name2, nameN };
    
    // Exporting destructured assignments with renaming
    export const { name1, name2: bar } = o;
    
    // Default exports
    export default expression;
    export default function () {} // also class, function*
    export default function name1() {} // also class, function*
    export { name1 as default };
    
    // Aggregating modules
    export * from 'something'; // does not set the default export
    export * as name1 from 'something'; // Draft ECMAScript® 2O21
    export { name1, name2, nameN } from 'something';
    export { import1 as name1, import2 as name2, nameN } from 'something';
    export { default } from 'something';
    
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line global-require
      export { default } from './dist/hotkeys.common.min.js';
    } else {
      // eslint-disable-next-line global-require
      export { default } from './dist/hotkeys.common.js';
    }
    `;

    const line = code.split('\n')[14].trim();
    const parsed = __babelParser.parse(line, {
      allowImportExportEverywhere: true
    }).program.body[0];
    let exportObj = {
      named: []
    };
    console.log(parsed);
    switch (parsed.type) {
      case 'ExportNamedDeclaration':
        if (parsed.declaration && parsed.declaration.type) {
          switch (parsed.declaration.type) {
            case 'VariableDeclaration':
              const declarations =
                parsed.declaration && parsed.declaration.declarations
                  ? parsed.declaration.declarations
                  : parsed.declarations
                  ? parsed.declarations
                  : [];

              declarations.forEach((declaration) => {
                if (declaration.id && declaration.id.properties) {
                  declaration.id.properties.forEach((prop) => {
                    const parts = __babelGenerator(prop).code.split(':');
                    let value = null;
                    if (parts.length > 1) {
                      value = __unquote(parts.pop().trim());
                    }
                    exportObj.named.push({
                      name: prop.value.name,
                      value
                    });
                  });
                  return;
                }

                const parts = line
                  .slice(declaration.start, declaration.end)
                  .split('=');
                let value = null;
                if (parts.length > 1) {
                  value = __unquote(parts.pop().trim());
                }
                exportObj.named.push({
                  name: declaration.id.name,
                  value
                });
              });
              break;
            case 'ClassDeclaration':
            case 'FunctionDeclaration':
              const codeAst = parsed.declaration;
              const value = __babelGenerator(codeAst).code;
              exportObj.named.push({
                name: parsed.declaration.id.name,
                value
              });
              break;
          }
          break;
        } else if (parsed.specifiers) {
          const parts = __babelGenerator(parsed).code.split('=');
          let value = null;
          if (parts.length > 1) {
            value = __unquote(parts.pop().trim());
          }
          parsed.specifiers.forEach((specifier) => {
            console.log(specifier.exported);
            exportObj.named.push({
              name: specifier.local.name,
              as:
                specifier.exported.name !== specifier.local.name
                  ? specifier.exported.name
                  : null,
              value
            });
          });
        }
    }

    console.log(exportObj);

    // const exportMatches = __SEs6Export.parseCode();
    // console.log(exportMatches);

    // update the imports to relative paths
    const imports = __SEs6Import.parseCode(content);
    imports.forEach((es6Import) => {
      if (
        es6Import.path.slice(0, 1) === '/' ||
        es6Import.path.slice(0, 1) === '.'
      )
        return;

      if (__buildInModules.indexOf(es6Import.path) !== -1) {
        return;
      }

      if (es6Import.default && !es6Import.star) {
        es6Import.star = es6Import.default;
        es6Import.default = null;
      }

      const resolvedPath = __resolve.sync(es6Import.path, {
        basedir: rootDir,
        moduleDirectory: settings.nodeModulesDir || ['node_modules'],
        preserveSymlinks: true
      });

      const relativePath = __path.relative(rootDir, resolvedPath);

      // prepend the "node_modules" path
      es6Import.path = `/${relativePath}`;

      // replace the import with the new one
      content = content.replace(es6Import.raw, es6Import.toString());
    });

    // remove some weird exports for typescript
    content = content.replace(
      /export\svar\sdefault\s?=\s?((?!;|,).)*[,;]{1}/gm,
      ''
    );

    let matches = content.match(
      /(module\.)?exports(\.[a-zA-Z0-9-_\.]+)?\s{0,99999999999}=\s{0,99999999999}((?!;|,).)*[,;]{1}/gm
    );
    if (matches) {
      let matchesArray = [];
      matches
        .map((str) => str.trim())
        .map((match) => {
          const parts = match.split('=');
          const value = parts[1].trim().replace(/[,;]$/, '');
          const name = parts[0]
            .replace('module.exports', '')
            .replace('exports.', '')
            .trim();
          return {
            raw: match,
            name: name || 'default',
            value
          };
        })
        .forEach((exportObj) => {
          // only export the same variable once
          if (matchesArray.indexOf(exportObj.name) !== -1) return;
          matchesArray.push(exportObj.name);

          const id = __uniqid();
          const strVar = `let __${id};`;
          const str = `
            __${id} = ${exportObj.value};
          `;
          const strExport = `
            export { __${id} as ${exportObj.name} };
          `;
          content = `
            ${strVar}
            ${content}
            ${strExport}
          `;

          content = content.replace(exportObj.raw, str);
        });
    }
  }

  return new __SPromise(
    (resolve, reject, trigger) => {
      return resolve({
        data: content,
        type: 'text/javascript'
      });
    },
    {
      id: 'frontendServerJsHandler'
    }
  );
};
