import __idCompliant from "@coffeekraken/sugar/shared/string/idCompliant";
function cssClass(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = {};
  data.forEach((cssClass2) => {
    if (typeof cssClass2 !== "object" || !cssClass2.value || typeof cssClass2.value !== "string")
      return;
    const parts = cssClass2.value.split(/\s{2,20000}/).map((l) => l.trim());
    let className = parts == null ? void 0 : parts[0];
    const name = __idCompliant(className, {});
    const description = new String(parts && parts[1] ? parts[1] : null);
    description.render = true;
    res[name] = {
      name: parts[0],
      description
    };
    if (cssClass2.content) {
      const content = new String(cssClass2.content.join("\n"));
      content.render = true;
      res[name].content = content;
    }
  });
  return res;
}
var cssClass_default = cssClass;
export {
  cssClass_default as default
};
