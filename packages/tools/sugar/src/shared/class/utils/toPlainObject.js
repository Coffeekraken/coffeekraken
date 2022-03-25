function toPlainObject(theClass) {
  const originalClass = theClass || {};
  const keys = Object.getOwnPropertyNames(originalClass);
  return keys.reduce((classAsObj, key) => {
    classAsObj[key] = originalClass[key];
    return classAsObj;
  }, {});
}
var toPlainObject_default = toPlainObject;
export {
  toPlainObject_default as default
};
