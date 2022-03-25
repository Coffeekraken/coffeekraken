const ruleObj = {
  priority: 1,
  name: "Required",
  id: "required",
  settings: {
    when: [void 0, null]
  },
  message: "This value is required",
  processParams: (params) => {
    return { value: params };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (params.value === true) {
      if (ruleSettings.when.indexOf(value) !== -1) {
        return new Error("This property is <yellow>required</yellow>");
      }
    }
    return value;
  }
};
var requiredRule_default = ruleObj;
export {
  requiredRule_default as default
};
