function classInstance(object) {
  if (!object)
    return false;
  if (typeof object !== "object")
    return false;
  if (object.constructor && object.constructor.name === "Object")
    return false;
  if (Object.prototype.toString.call(object) === "[object Object]")
    return false;
  if (object.constructor === Object)
    return false;
  return true;
}
export {
  classInstance as default
};
