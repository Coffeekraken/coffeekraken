const descriptor = {
  name: "WeakSet",
  id: "weakset",
  is: (value) => value instanceof WeakSet,
  cast: (value) => {
    return new Error(`Sorry but nothing can be casted to a WeakSet for now`);
  }
};
var weaksetTypeDescriptor_default = descriptor;
export {
  weaksetTypeDescriptor_default as default
};
