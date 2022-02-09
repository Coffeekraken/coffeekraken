import __getRoot from '../utils/getRoot';

export default function ({ root }) {
  root.walkAtRules((atRule) => {
    if (atRule.name.match(/^import/) && !atRule._fontImportMoved) {
      if (atRule.params.match(/^url\(('|")?https?:\/\//)) {
        atRule._fontImportMoved = true;
        atRule.remove();
        root.nodes.unshift(atRule);
      }
    }
  });
}
