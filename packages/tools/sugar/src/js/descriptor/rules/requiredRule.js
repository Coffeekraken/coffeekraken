import SDescriptor from '../SDescriptor';
const ruleObj = {
    name: 'Required',
    id: 'required',
    settings: {
        when: [undefined, null, '']
    },
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        if (params.value === true) {
            if (ruleSettings.when.indexOf(value) !== -1) {
                return {};
            }
        }
        return true;
    }
};
// register the new rule
SDescriptor.registerRule(ruleObj);
export default ruleObj;
