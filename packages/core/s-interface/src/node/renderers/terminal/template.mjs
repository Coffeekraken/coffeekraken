import "../../../../../../chunk-TD77TI6B.mjs";
import __parseHtml from "@coffeekraken/sugar/shared/console/parseHtml";
import __countLine from "@coffeekraken/sugar/shared/string/countLine";
function template_default({ interfaceClass, properties }) {
  let tpl = [];
  tpl = tpl.concat([
    "",
    `<yellow>${interfaceClass.name}</yellow> interface help`,
    ""
  ]);
  if (interfaceClass.description) {
    tpl.push(interfaceClass.description);
    tpl.push("");
  }
  for (const propKey in properties) {
    const propertyObj = properties[propKey];
    const titleStr = `--${propertyObj.name} ${propertyObj.alias ? `(${propertyObj.alias})` : ""} ${propertyObj.type} ${propertyObj.default && __countLine(propertyObj.default) <= 20 ? propertyObj.default : ""} ${propertyObj.description || ""}`;
    tpl.push(titleStr.replace(/\s{2,999}/gm, " "));
    if (propertyObj.default && __countLine(propertyObj.default) > 20) {
      tpl.push(propertyObj.default);
    }
  }
  return __parseHtml(tpl.join("\n"));
}
export {
  template_default as default
};
