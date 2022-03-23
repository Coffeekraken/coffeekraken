import "../../../../../chunk-JETN4ZEY.mjs";
import _get from "lodash/get";
function propertyProxy(obj, property, descriptor, applySetterAtStart = false) {
  const objPath = property.split(".").slice(0, -1).join(".");
  if (objPath) {
    property = property.split(".").pop();
    obj = _get(obj, objPath);
  }
  let val = _get(obj, property);
  const currentDescriptor = Object.getOwnPropertyDescriptor(obj.prototype || obj, property);
  const _set = (value) => {
    if (descriptor.set) {
      value = descriptor.set(value);
    }
    if (currentDescriptor && currentDescriptor.set) {
      const ret = currentDescriptor.set(value);
      if (ret) {
        val = ret;
      } else {
        val = currentDescriptor.get();
      }
    } else {
      val = value;
    }
  };
  if (applySetterAtStart)
    _set(val);
  const d = Object.getOwnPropertyDescriptor(obj, property);
  Object.defineProperty(obj, property, {
    get: () => {
      let _val = val;
      if (descriptor.get) {
        _val = descriptor.get(_val);
      }
      if (currentDescriptor && currentDescriptor.get) {
        _val = currentDescriptor.get();
      }
      return _val;
    },
    set: (v) => {
      _set(v);
    },
    configurable: descriptor.configurable !== void 0 ? descriptor.configurable : currentDescriptor && currentDescriptor.configurable !== void 0 ? currentDescriptor.configurable : false,
    enumarable: descriptor.enumarable !== void 0 ? descriptor.enumarable : currentDescriptor && currentDescriptor.enumarable !== void 0 ? currentDescriptor.enumarable : true
  });
  return val;
}
var propertyProxy_default = propertyProxy;
export {
  propertyProxy_default as default
};
