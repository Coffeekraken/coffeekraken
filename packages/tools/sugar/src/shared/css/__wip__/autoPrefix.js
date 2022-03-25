function autoPrefix(style) {
  let styleObj = typeof style === "object" ? style : {};
  let prefixedStyleObj = {};
  if (typeof style === "string") {
  }
  parseCss(style);
  return "";
}
function parseCss(css2) {
  const reg = /(\/\*\@-.*?)(?=\/\*\@-|\z)/gm;
  console.log(reg.exec(css2));
}
function deepMap(object, handler, path = "") {
  if (Array.isArray(object)) {
    object.forEach((item, i) => {
      const newPath = path === "" ? `${i}` : `${path}.${i}`;
      deepMap(item, handler, newPath);
    });
  } else if (typeof object === "object") {
    Object.keys(object).forEach((itemName) => {
      const itemValue = object[itemName];
      const newPath = path === "" ? `${itemName}` : `${path}.${itemName}`;
      deepMap(itemValue, handler, newPath);
    });
  } else {
    handler(object, path.split(".").pop(), path);
  }
}
export {
  autoPrefix as default
};
