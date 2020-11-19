const __babelGenerator = require('@babel/generator').default;
const __babelParser = require('@babel/parser');

let program;
module.exports = ({ types: t }) => ({
  pre() {
    program = null;
  },
  visitor: {
    Program(path) {
      program = path;
      // path.get('body.0');
    },
    Expression(path) {
      if (!path.parentPath.isImportDeclaration() && !path.parentPath.isImport())
        return;
      // const topLevelBody = path.findParent(t.isProgram);
      // console.log(topLevelBody.container.program.body[0]);

      // console.log(program.node.body[0]);

      // program.node.body.unshift(
      //   __babelParser.parse('const coco = "plop"', {
      //     sourceType: 'module'
      //   })
      // );

      // if (POLYFILLS_MAP[path.node.value]) {
      //   path.node.value = POLYFILLS_MAP[path.node.value];
      // }
    }
  }
});
