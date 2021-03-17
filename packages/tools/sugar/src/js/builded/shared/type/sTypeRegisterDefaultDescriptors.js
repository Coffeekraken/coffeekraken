// @shared
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
    var _SType_1 = __importDefault(require("./_SType"));
    var stringTypeDescriptor_1 = __importDefault(require("./descriptors/stringTypeDescriptor"));
    var mapTypeDescriptor_1 = __importDefault(require("./descriptors/mapTypeDescriptor"));
    var objectTypeDescriptor_1 = __importDefault(require("./descriptors/objectTypeDescriptor"));
    var arrayTypeDescriptor_1 = __importDefault(require("./descriptors/arrayTypeDescriptor"));
    var integerTypeDescriptor_1 = __importDefault(require("./descriptors/integerTypeDescriptor"));
    var numberTypeDescriptor_1 = __importDefault(require("./descriptors/numberTypeDescriptor"));
    var booleanTypeDescriptor_1 = __importDefault(require("./descriptors/booleanTypeDescriptor"));
    var undefinedTypeDescriptor_1 = __importDefault(require("./descriptors/undefinedTypeDescriptor"));
    var nullTypeDescriptor_1 = __importDefault(require("./descriptors/nullTypeDescriptor"));
    var symbolTypeDescriptor_1 = __importDefault(require("./descriptors/symbolTypeDescriptor"));
    var bigintTypeDescriptor_1 = __importDefault(require("./descriptors/bigintTypeDescriptor"));
    var dateTypeDescriptor_1 = __importDefault(require("./descriptors/dateTypeDescriptor"));
    var functionTypeDescriptor_1 = __importDefault(require("./descriptors/functionTypeDescriptor"));
    var weakmapTypeDescriptor_1 = __importDefault(require("./descriptors/weakmapTypeDescriptor"));
    var weaksetTypeDescriptor_1 = __importDefault(require("./descriptors/weaksetTypeDescriptor"));
    var setTypeDescriptor_1 = __importDefault(require("./descriptors/setTypeDescriptor"));
    var classTypeDescriptor_1 = __importDefault(require("./descriptors/classTypeDescriptor"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1R5cGVSZWdpc3RlckRlZmF1bHREZXNjcmlwdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC90eXBlL3NUeXBlUmVnaXN0ZXJEZWZhdWx0RGVzY3JpcHRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsb0RBQStCO0lBQy9CLDRGQUF3RTtJQUN4RSxzRkFBa0U7SUFDbEUsNEZBQXdFO0lBQ3hFLDBGQUFzRTtJQUN0RSw4RkFBMEU7SUFDMUUsNEZBQXdFO0lBQ3hFLDhGQUEwRTtJQUMxRSxrR0FBOEU7SUFDOUUsd0ZBQW9FO0lBQ3BFLDRGQUF3RTtJQUN4RSw0RkFBd0U7SUFDeEUsd0ZBQW9FO0lBQ3BFLGdHQUE0RTtJQUM1RSw4RkFBMEU7SUFDMUUsOEZBQTBFO0lBQzFFLHNGQUFrRTtJQUNsRSwwRkFBc0U7SUFFdEUsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsOEJBQXNCLENBQUMsQ0FBQztJQUM3QyxnQkFBTyxDQUFDLFlBQVksQ0FBQywyQkFBbUIsQ0FBQyxDQUFDO0lBQzFDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDhCQUFzQixDQUFDLENBQUM7SUFDN0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsNkJBQXFCLENBQUMsQ0FBQztJQUM1QyxnQkFBTyxDQUFDLFlBQVksQ0FBQywrQkFBdUIsQ0FBQyxDQUFDO0lBQzlDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDhCQUFzQixDQUFDLENBQUM7SUFDN0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsK0JBQXVCLENBQUMsQ0FBQztJQUM5QyxnQkFBTyxDQUFDLFlBQVksQ0FBQyxpQ0FBeUIsQ0FBQyxDQUFDO0lBQ2hELGdCQUFPLENBQUMsWUFBWSxDQUFDLDRCQUFvQixDQUFDLENBQUM7SUFDM0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsOEJBQXNCLENBQUMsQ0FBQztJQUM3QyxnQkFBTyxDQUFDLFlBQVksQ0FBQyw4QkFBc0IsQ0FBQyxDQUFDO0lBQzdDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDRCQUFvQixDQUFDLENBQUM7SUFDM0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsZ0NBQXdCLENBQUMsQ0FBQztJQUMvQyxnQkFBTyxDQUFDLFlBQVksQ0FBQywrQkFBdUIsQ0FBQyxDQUFDO0lBQzlDLGdCQUFPLENBQUMsWUFBWSxDQUFDLCtCQUF1QixDQUFDLENBQUM7SUFDOUMsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsMkJBQW1CLENBQUMsQ0FBQztJQUMxQyxnQkFBTyxDQUFDLFlBQVksQ0FBQyw2QkFBcUIsQ0FBQyxDQUFDO0lBRTVDLGtCQUFlLGdCQUFPLENBQUMifQ==