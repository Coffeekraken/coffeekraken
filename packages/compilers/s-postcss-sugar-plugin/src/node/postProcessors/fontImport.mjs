import "../../../../../chunk-TD77TI6B.mjs";
function fontImport_default({ root }) {
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
export {
  fontImport_default as default
};
