const descriptor = {
  name: "Bigint",
  id: "bigint",
  is: (value) => typeof value === "bigint",
  cast: (value) => {
    if (typeof value === "bigint")
      return value;
    if (typeof value !== "string" && typeof value !== "number") {
      return new Error(`Sorry but only <yellow>String</yellow> and <yellow>Number</yellow> can be casted to <green>Bigint</green>`);
    }
    let res;
    try {
      res = BigInt(value);
    } catch (e) {
      res = new Error(`It seem's that the passed value "<yellow>${value}</yellow>" can not be casted to a <green>BigInt</green>`);
    }
    return res;
  }
};
var bigintTypeDescriptor_default = descriptor;
export {
  bigintTypeDescriptor_default as default
};
