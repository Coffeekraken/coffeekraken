import __deepMap from "./deepMap";
import __set from "./set";
function toJson(object) {
  const newObj = {};
  __deepMap(object, ({ value, path }) => {
    __set(newObj, path, value);
    return value;
  }, {
    privateProps: false,
    classInstances: true
  });
  return newObj;
}
export {
  toJson as default
};
