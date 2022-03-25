const descriptor = {
  name: "Symbol",
  id: "symbol",
  is: (value) => typeof value === "symbol",
  cast: (value) => {
    if (typeof value === "symbol")
      return value;
    return Symbol(value);
  }
};
var symbolTypeDescriptor_default = descriptor;
export {
  symbolTypeDescriptor_default as default
};
