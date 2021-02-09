"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1R5cGVSZWdpc3RlckRlZmF1bHREZXNjcmlwdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNUeXBlUmVnaXN0ZXJEZWZhdWx0RGVzY3JpcHRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7O0FBRVYsc0RBQStCO0FBQy9CLDhGQUF3RTtBQUN4RSx3RkFBa0U7QUFDbEUsOEZBQXdFO0FBQ3hFLDRGQUFzRTtBQUN0RSxnR0FBMEU7QUFDMUUsOEZBQXdFO0FBQ3hFLGdHQUEwRTtBQUMxRSxvR0FBOEU7QUFDOUUsMEZBQW9FO0FBQ3BFLDhGQUF3RTtBQUN4RSw4RkFBd0U7QUFDeEUsMEZBQW9FO0FBQ3BFLGtHQUE0RTtBQUM1RSxnR0FBMEU7QUFDMUUsZ0dBQTBFO0FBQzFFLHdGQUFrRTtBQUNsRSw0RkFBc0U7QUFFdEUsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsOEJBQXNCLENBQUMsQ0FBQztBQUM3QyxnQkFBTyxDQUFDLFlBQVksQ0FBQywyQkFBbUIsQ0FBQyxDQUFDO0FBQzFDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDhCQUFzQixDQUFDLENBQUM7QUFDN0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsNkJBQXFCLENBQUMsQ0FBQztBQUM1QyxnQkFBTyxDQUFDLFlBQVksQ0FBQywrQkFBdUIsQ0FBQyxDQUFDO0FBQzlDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDhCQUFzQixDQUFDLENBQUM7QUFDN0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsK0JBQXVCLENBQUMsQ0FBQztBQUM5QyxnQkFBTyxDQUFDLFlBQVksQ0FBQyxpQ0FBeUIsQ0FBQyxDQUFDO0FBQ2hELGdCQUFPLENBQUMsWUFBWSxDQUFDLDRCQUFvQixDQUFDLENBQUM7QUFDM0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsOEJBQXNCLENBQUMsQ0FBQztBQUM3QyxnQkFBTyxDQUFDLFlBQVksQ0FBQyw4QkFBc0IsQ0FBQyxDQUFDO0FBQzdDLGdCQUFPLENBQUMsWUFBWSxDQUFDLDRCQUFvQixDQUFDLENBQUM7QUFDM0MsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsZ0NBQXdCLENBQUMsQ0FBQztBQUMvQyxnQkFBTyxDQUFDLFlBQVksQ0FBQywrQkFBdUIsQ0FBQyxDQUFDO0FBQzlDLGdCQUFPLENBQUMsWUFBWSxDQUFDLCtCQUF1QixDQUFDLENBQUM7QUFDOUMsZ0JBQU8sQ0FBQyxZQUFZLENBQUMsMkJBQW1CLENBQUMsQ0FBQztBQUMxQyxnQkFBTyxDQUFDLFlBQVksQ0FBQyw2QkFBcUIsQ0FBQyxDQUFDO0FBRTVDLGtCQUFlLGdCQUFPLENBQUMifQ==