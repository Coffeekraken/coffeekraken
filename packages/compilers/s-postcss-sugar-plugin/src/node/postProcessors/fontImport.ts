import __getRoot from '../utils/getRoot';

export default function ({ ast, root }) {
  ast.walkAtRules((atRule) => {
    if (atRule.name.match(/^import/) && !atRule._fontImportMoved) {
      if (atRule.params.match(/^url\(/)) {
        atRule._fontImportMoved = true;
        atRule.remove();
        root.nodes.unshift(atRule);
      }
    }
  });

  return ast;
}
