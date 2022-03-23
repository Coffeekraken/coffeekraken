import "../../../../../chunk-JETN4ZEY.mjs";
const descriptor = {
  name: "Number",
  id: "number",
  is: (value) => typeof value === "number",
  cast: (value) => {
    if (typeof value !== "string") {
      return new Error(`Sorry but only strings can be casted to numbers...`);
    }
    const res = parseFloat(value);
    if (isNaN(res))
      return new Error(`Sorry but the conversion of "<yellow>${value}</yellow>" to a <green>Number</green> does not work...`);
    return res;
  }
};
var numberTypeDescriptor_default = descriptor;
export {
  numberTypeDescriptor_default as default
};
