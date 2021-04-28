var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-class", "../../shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const deepMerge_1 = __importDefault(require("../../shared/object/deepMerge"));
    class SSVelteComponent extends s_class_1.default {
        constructor(settings) {
            super(deepMerge_1.default({
                svelteComponent: {}
            }, settings || {}));
            console.log('Hello');
        }
    }
    exports.default = SSVelteComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9zdmVsdGUvU1N2ZWx0ZUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLG9FQUE2QztJQUM3Qyw4RUFBd0Q7SUFTeEQsTUFBTSxnQkFBaUIsU0FBUSxpQkFBUTtRQUNyQyxZQUFZLFFBQWlEO1lBQzNELEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLGVBQWUsRUFBRSxFQUFFO2FBQ3BCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7S0FDRjtJQUVELGtCQUFlLGdCQUFnQixDQUFDIn0=