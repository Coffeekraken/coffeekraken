"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugar_1 = __importDefault(require("../config/sugar"));
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
const fn = function (settings = {}) {
    settings = Object.assign({}, settings);
    const srcDir = sugar_1.default('storage.srcDir');
    if (srcDir !== undefined) {
        ensureDirSync_1.default(srcDir);
        return srcDir;
    }
    return undefined;
};
module.exports = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3JjRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsNERBQTRDO0FBQzVDLHdFQUFrRDtBQStCbEQsTUFBTSxFQUFFLEdBQVksVUFBVSxXQUE0QixFQUFFO0lBQzFELFFBQVEscUJBQ0gsUUFBUSxDQUNaLENBQUM7SUFDRixNQUFNLE1BQU0sR0FBRyxlQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMvQyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7UUFDeEIsdUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixPQUFPLE1BQU0sQ0FBQztLQUNmO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyxDQUFDO0FBQ0YsaUJBQVMsRUFBRSxDQUFDIn0=