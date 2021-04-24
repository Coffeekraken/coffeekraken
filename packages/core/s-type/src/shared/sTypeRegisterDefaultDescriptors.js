var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_SType", "./descriptors/stringTypeDescriptor", "./descriptors/mapTypeDescriptor", "./descriptors/objectTypeDescriptor", "./descriptors/arrayTypeDescriptor", "./descriptors/integerTypeDescriptor", "./descriptors/numberTypeDescriptor", "./descriptors/booleanTypeDescriptor", "./descriptors/undefinedTypeDescriptor", "./descriptors/nullTypeDescriptor", "./descriptors/symbolTypeDescriptor", "./descriptors/bigintTypeDescriptor", "./descriptors/dateTypeDescriptor", "./descriptors/functionTypeDescriptor", "./descriptors/weakmapTypeDescriptor", "./descriptors/weaksetTypeDescriptor", "./descriptors/setTypeDescriptor", "./descriptors/classTypeDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _SType_1 = __importDefault(require("./_SType"));
    const stringTypeDescriptor_1 = __importDefault(require("./descriptors/stringTypeDescriptor"));
    const mapTypeDescriptor_1 = __importDefault(require("./descriptors/mapTypeDescriptor"));
    const objectTypeDescriptor_1 = __importDefault(require("./descriptors/objectTypeDescriptor"));
    const arrayTypeDescriptor_1 = __importDefault(require("./descriptors/arrayTypeDescriptor"));
    const integerTypeDescriptor_1 = __importDefault(require("./descriptors/integerTypeDescriptor"));
    const numberTypeDescriptor_1 = __importDefault(require("./descriptors/numberTypeDescriptor"));
    const booleanTypeDescriptor_1 = __importDefault(require("./descriptors/booleanTypeDescriptor"));
    const undefinedTypeDescriptor_1 = __importDefault(require("./descriptors/undefinedTypeDescriptor"));
    const nullTypeDescriptor_1 = __importDefault(require("./descriptors/nullTypeDescriptor"));
    const symbolTypeDescriptor_1 = __importDefault(require("./descriptors/symbolTypeDescriptor"));
    const bigintTypeDescriptor_1 = __importDefault(require("./descriptors/bigintTypeDescriptor"));
    const dateTypeDescriptor_1 = __importDefault(require("./descriptors/dateTypeDescriptor"));
    const functionTypeDescriptor_1 = __importDefault(require("./descriptors/functionTypeDescriptor"));
    const weakmapTypeDescriptor_1 = __importDefault(require("./descriptors/weakmapTypeDescriptor"));
    const weaksetTypeDescriptor_1 = __importDefault(require("./descriptors/weaksetTypeDescriptor"));
    const setTypeDescriptor_1 = __importDefault(require("./descriptors/setTypeDescriptor"));
    const classTypeDescriptor_1 = __importDefault(require("./descriptors/classTypeDescriptor"));
    _SType_1.default.registerType(stringTypeDescriptor_1.default);
    _SType_1.default.registerType(mapTypeDescriptor_1.default);
    _SType_1.default.registerType(objectTypeDescriptor_1.default);
    _SType_1.default.registerType(arrayTypeDescriptor_1.default);
    _SType_1.default.registerType(integerTypeDescriptor_1.default);
    _SType_1.default.registerType(numberTypeDescriptor_1.default);
    _SType_1.default.registerType(booleanTypeDescriptor_1.default);
    _SType_1.default.registerType(undefinedTypeDescriptor_1.default);
    _SType_1.default.registerType(nullTypeDescriptor_1.default);
    _SType_1.default.registerType(symbolTypeDescriptor_1.default);
    _SType_1.default.registerType(bigintTypeDescriptor_1.default);
    _SType_1.default.registerType(dateTypeDescriptor_1.default);
    _SType_1.default.registerType(functionTypeDescriptor_1.default);
    _SType_1.default.registerType(weakmapTypeDescriptor_1.default);
    _SType_1.default.registerType(weaksetTypeDescriptor_1.default);
    _SType_1.default.registerType(setTypeDescriptor_1.default);
    _SType_1.default.registerType(classTypeDescriptor_1.default);
    exports.default = _SType_1.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1R5cGVSZWdpc3RlckRlZmF1bHREZXNjcmlwdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNUeXBlUmVnaXN0ZXJEZWZhdWx0RGVzY3JpcHRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxzREFBK0I7SUFDL0IsOEZBQXdFO0lBQ3hFLHdGQUFrRTtJQUNsRSw4RkFBd0U7SUFDeEUsNEZBQXNFO0lBQ3RFLGdHQUEwRTtJQUMxRSw4RkFBd0U7SUFDeEUsZ0dBQTBFO0lBQzFFLG9HQUE4RTtJQUM5RSwwRkFBb0U7SUFDcEUsOEZBQXdFO0lBQ3hFLDhGQUF3RTtJQUN4RSwwRkFBb0U7SUFDcEUsa0dBQTRFO0lBQzVFLGdHQUEwRTtJQUMxRSxnR0FBMEU7SUFDMUUsd0ZBQWtFO0lBQ2xFLDRGQUFzRTtJQUV0RSxnQkFBTyxDQUFDLFlBQVksQ0FBQyw4QkFBc0IsQ0FBQyxDQUFDO0lBQzdDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDJCQUFtQixDQUFDLENBQUM7SUFDMUMsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsOEJBQXNCLENBQUMsQ0FBQztJQUM3QyxnQkFBTyxDQUFDLFlBQVksQ0FBQyw2QkFBcUIsQ0FBQyxDQUFDO0lBQzVDLGdCQUFPLENBQUMsWUFBWSxDQUFDLCtCQUF1QixDQUFDLENBQUM7SUFDOUMsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsOEJBQXNCLENBQUMsQ0FBQztJQUM3QyxnQkFBTyxDQUFDLFlBQVksQ0FBQywrQkFBdUIsQ0FBQyxDQUFDO0lBQzlDLGdCQUFPLENBQUMsWUFBWSxDQUFDLGlDQUF5QixDQUFDLENBQUM7SUFDaEQsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsNEJBQW9CLENBQUMsQ0FBQztJQUMzQyxnQkFBTyxDQUFDLFlBQVksQ0FBQyw4QkFBc0IsQ0FBQyxDQUFDO0lBQzdDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDhCQUFzQixDQUFDLENBQUM7SUFDN0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsNEJBQW9CLENBQUMsQ0FBQztJQUMzQyxnQkFBTyxDQUFDLFlBQVksQ0FBQyxnQ0FBd0IsQ0FBQyxDQUFDO0lBQy9DLGdCQUFPLENBQUMsWUFBWSxDQUFDLCtCQUF1QixDQUFDLENBQUM7SUFDOUMsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsK0JBQXVCLENBQUMsQ0FBQztJQUM5QyxnQkFBTyxDQUFDLFlBQVksQ0FBQywyQkFBbUIsQ0FBQyxDQUFDO0lBQzFDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDZCQUFxQixDQUFDLENBQUM7SUFFNUMsa0JBQWUsZ0JBQU8sQ0FBQyJ9