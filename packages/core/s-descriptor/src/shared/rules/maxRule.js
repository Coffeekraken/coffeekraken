const ruleObj = {
  name: "Max",
  id: "max",
  settings: {},
  accept: "Number",
  message: (resultObj) => {
    return `This value has to be maximum "<yellow>${resultObj.max}</yellow>". Received "<red>${resultObj.received}</red>"`;
  },
  processParams: (params) => {
    return { value: params };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (value > params.value) {
      return new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${value}</yellow>" must be lower or equal at <cyan>${params.value}</cyan>`);
    }
    return value;
  }
};
var maxRule_default = ruleObj;
export {
  maxRule_default as default
};
