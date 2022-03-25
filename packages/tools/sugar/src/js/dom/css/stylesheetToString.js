function stylesheetToString(stylesheet) {
  let stack = [];
  if (!(stylesheet instanceof StyleSheetList)) {
    if (!Array.isArray(stylesheet))
      stack.push(stylesheet);
  } else {
    Object.keys(stylesheet).forEach((k) => {
      stack.push(stylesheet[k]);
    });
  }
  let str = ``;
  stack.forEach((style) => {
    str += style.cssRules ? Array.from(style.cssRules).map((rule) => {
      var _a;
      return (_a = rule.cssText) != null ? _a : "";
    }).join("\n") : "";
  });
  return str;
}
export {
  stylesheetToString as default
};
