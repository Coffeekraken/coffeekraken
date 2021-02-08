// @ts-nocheck
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
        define(["require", "exports", "./get", "./set"], factory);
    }
})(function (require, exports) {
    "use strict";
    var get_1 = __importDefault(require("./get"));
    var set_1 = __importDefault(require("./set"));
    return function (obj, path, value) {
        if (value === void 0) { value = {}; }
        var v = get_1.default(obj, path);
        if (v === undefined) {
            set_1.default(obj, path, value);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5zdXJlRXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLDhDQUEwQjtJQUMxQiw4Q0FBMEI7SUEyQjFCLE9BQVMsVUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQVU7UUFBVixzQkFBQSxFQUFBLFVBQVU7UUFDN0IsSUFBTSxDQUFDLEdBQUcsYUFBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDbkIsYUFBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDLENBQUMifQ==