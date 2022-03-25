const descriptor = {
  name: "Null",
  id: "null",
  is: (value) => value === null,
  cast: (value) => {
    return null;
  }
};
var nullTypeDescriptor_default = descriptor;
export {
  nullTypeDescriptor_default as default
};
