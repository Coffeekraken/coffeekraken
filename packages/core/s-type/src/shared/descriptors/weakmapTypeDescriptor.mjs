import "../../../../../chunk-JETN4ZEY.mjs";
const descriptor = {
  name: "WeakMap",
  id: "weakmap",
  is: (value) => value instanceof WeakMap,
  cast: (value) => {
    return new Error(`Sorry but nothing can be casted to a WeakMap for now`);
  }
};
var weakmapTypeDescriptor_default = descriptor;
export {
  weakmapTypeDescriptor_default as default
};
