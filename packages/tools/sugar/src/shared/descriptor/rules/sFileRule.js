// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../_SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
    const ruleObj = {
        name: 'Required',
        id: 'required',
        settings: {
            when: [undefined, null]
        },
        message: 'This value is required',
        processParams: (params) => {
            return { value: params };
        },
        apply: (value, params, ruleSettings, settings) => {
            if (params.value === true) {
                if (ruleSettings.when.indexOf(value) !== -1) {
                    return false;
                }
            }
            return true;
        }
    };
    // register the new rule
    _SDescriptor_1.default.registerRule(ruleObj);
    exports.default = ruleObj;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0ZpbGVSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic0ZpbGVSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQU9kLG1FQUEwQztJQW9CMUMsTUFBTSxPQUFPLEdBQXFCO1FBQ2hDLElBQUksRUFBRSxVQUFVO1FBQ2hCLEVBQUUsRUFBRSxVQUFVO1FBQ2QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztTQUN4QjtRQUNELE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsYUFBYSxFQUFFLENBQUMsTUFBZSxFQUFFLEVBQUU7WUFDakMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsS0FBSyxFQUFFLENBQ0wsS0FBVSxFQUNWLE1BQWUsRUFDZixZQUEyQixFQUMzQixRQUE4QixFQUNBLEVBQUU7WUFDaEMsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDekIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDM0MsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUNGLENBQUM7SUFFRix3QkFBd0I7SUFDeEIsc0JBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbEMsa0JBQWUsT0FBTyxDQUFDIn0=