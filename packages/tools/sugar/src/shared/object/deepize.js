import __set from "./set";
function deepize(object) {
  const finalObject = {};
  for (const key in object) {
    __set(finalObject, key, object[key]);
  }
  return finalObject;
}
var deepize_default = deepize;
export {
  deepize_default as default
};
