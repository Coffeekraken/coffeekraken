import "../../../../../chunk-JETN4ZEY.mjs";
var parse_default = (value) => {
  if (typeof value !== "string")
    return value;
  value = value.split("\u2800").join("").trim();
  try {
    return Function(`
      "use strict";
      return (${value});
    `)();
  } catch (e) {
    return value;
  }
};
export {
  parse_default as default
};
