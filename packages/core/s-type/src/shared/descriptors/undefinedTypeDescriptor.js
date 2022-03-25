const descriptor = {
  name: "Undefined",
  id: "undefined",
  is: (value) => value === void 0,
  cast: (value) => {
    return void 0;
  }
};
var undefinedTypeDescriptor_default = descriptor;
export {
  undefinedTypeDescriptor_default as default
};
