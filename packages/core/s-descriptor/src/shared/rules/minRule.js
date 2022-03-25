const ruleObj = {
  name: "Min",
  id: "min",
  settings: {},
  accept: "Number",
  message: (resultObj) => {
    return `This value has to be minimum "<yellow>${resultObj.min}</yellow>". Received "<red>${resultObj.received}</red>"`;
  },
  processParams: (params) => {
    return { value: params };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (value < params.value) {
      return new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${value}</yellow>" must be greater or equal at <cyan>${params.value}</cyan>`);
    }
    return value;
  }
};
var minRule_default = ruleObj;
export {
  minRule_default as default
};
