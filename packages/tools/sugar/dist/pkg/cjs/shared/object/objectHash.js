"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import __objectHash from 'object-hash';
// import __objectHash from 'hash-obj';
const hash_sum_1 = __importDefault(require("hash-sum"));
function objectHash(obj, settings = {}) {
    settings = Object.assign({}, settings);
    return (0, hash_sum_1.default)(obj);
}
exports.default = objectHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMENBQTBDO0FBQzFDLHVDQUF1QztBQUN2Qyx3REFBaUM7QUE0QmpDLFNBQXdCLFVBQVUsQ0FDOUIsR0FBUSxFQUNSLFdBQXlDLEVBQUU7SUFFM0MsUUFBUSxHQUFHLGtCQUNKLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsT0FBTyxJQUFBLGtCQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQVJELDZCQVFDIn0=