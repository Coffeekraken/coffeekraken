import __upperFirst from "@coffeekraken/sugar/shared/string/upperFirst";
function returnTag(data, blockSettings) {
  const stringArray = data.value.trim().split(/(?<=^\S+)\s/);
  let type = stringArray && stringArray[0] ? __upperFirst(stringArray[0].replace("{", "").replace("}", "")) : null;
  if (type && type.includes("|")) {
    type = type.split("|").map((l) => __upperFirst(l.trim()));
  } else {
    type = [type];
  }
  const description = new String(stringArray[1] ? stringArray[1].trim() : "");
  description.render = true;
  return {
    type,
    description
  };
}
var return_default = returnTag;
export {
  return_default as default
};
