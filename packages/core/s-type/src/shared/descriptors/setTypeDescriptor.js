const descriptor = {
  name: "Set",
  id: "set",
  is: (value) => value instanceof Set,
  cast: (value) => {
    if (value instanceof Set)
      return value;
    const set = /* @__PURE__ */ new Set();
    set.add(value);
    return set;
  }
};
var setTypeDescriptor_default = descriptor;
export {
  setTypeDescriptor_default as default
};
