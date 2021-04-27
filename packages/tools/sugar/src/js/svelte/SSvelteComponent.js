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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxvRUFBNkM7SUFDN0MsOEVBQXdEO0lBU3hELE1BQU0sZ0JBQWlCLFNBQVEsaUJBQVE7UUFDckMsWUFBWSxRQUFpRDtZQUMzRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxlQUFlLEVBQUUsRUFBRTthQUNwQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixDQUFDO0tBQ0Y7SUFFRCxrQkFBZSxnQkFBZ0IsQ0FBQyJ9