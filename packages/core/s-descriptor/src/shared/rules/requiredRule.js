// @ts-nocheck
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = ruleObj;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWRSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVxdWlyZWRSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQXVCZCxNQUFNLE9BQU8sR0FBcUI7UUFDaEMsSUFBSSxFQUFFLFVBQVU7UUFDaEIsRUFBRSxFQUFFLFVBQVU7UUFDZCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxhQUFhLEVBQUUsQ0FBQyxNQUFlLEVBQUUsRUFBRTtZQUNqQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFDRCxLQUFLLEVBQUUsQ0FDTCxLQUFVLEVBQ1YsTUFBbUIsRUFDbkIsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1lBQ2hDLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7Z0JBQ3pCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQzNDLE9BQU8sS0FBSyxDQUFDO2lCQUNkO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FDRixDQUFDO0lBRUYsa0JBQWUsT0FBTyxDQUFDIn0=