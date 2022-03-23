import "../../../../../chunk-JETN4ZEY.mjs";
const descriptor = {
  name: "Function",
  id: "function",
  is: (value) => typeof value === "function",
  cast: (value) => {
    return new Error(`Sorry but nothing is castable to a Function`);
  }
};
var functionTypeDescriptor_default = descriptor;
export {
  functionTypeDescriptor_default as default
};
