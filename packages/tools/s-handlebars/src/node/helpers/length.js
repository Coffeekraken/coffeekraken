import __isPlainObject from "@coffeekraken/sugar/shared/is/plainObject";
function length(value) {
  if (typeof value === "string")
    return value.length;
  if (Array.isArray(value))
    return value.length;
  if (__isPlainObject(value))
    return Object.keys(value).length;
  return 0;
}
export {
  length as default
};
