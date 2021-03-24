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
        name: 'Max',
        id: 'max',
        settings: {},
        accept: 'Number',
        message: (resultObj) => {
            return `This value has to be maximum "<yellow>${resultObj.max}</yellow>". Received "<red>${resultObj.received}</red>"`;
        },
        processParams: (params) => {
            return { value: params };
        },
        apply: (value, params, ruleSettings, settings) => {
            if (value > params.value) {
                return {
                    max: params.value,
                    received: value
                };
            }
            return true;
        }
    };
    exports.default = ruleObj;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4UnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1heFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBb0JkLE1BQU0sT0FBTyxHQUFxQjtRQUNoQyxJQUFJLEVBQUUsS0FBSztRQUNYLEVBQUUsRUFBRSxLQUFLO1FBQ1QsUUFBUSxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsUUFBUTtRQUNoQixPQUFPLEVBQUUsQ0FBQyxTQUFjLEVBQVUsRUFBRTtZQUNsQyxPQUFPLHlDQUF5QyxTQUFTLENBQUMsR0FBRyw4QkFBOEIsU0FBUyxDQUFDLFFBQVEsU0FBUyxDQUFDO1FBQ3pILENBQUM7UUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtZQUNoQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFDRCxLQUFLLEVBQUUsQ0FDTCxLQUFVLEVBQ1YsTUFBbUIsRUFDbkIsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1lBQ2hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hCLE9BQU87b0JBQ0wsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLO29CQUNqQixRQUFRLEVBQUUsS0FBSztpQkFDaEIsQ0FBQzthQUNIO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztJQUVGLGtCQUFlLE9BQU8sQ0FBQyJ9