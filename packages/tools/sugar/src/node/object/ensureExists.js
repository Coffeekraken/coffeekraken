"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const get_1 = __importDefault(require("./get"));
const set_1 = __importDefault(require("./set"));
module.exports = (obj, path, value = {}) => {
    const v = get_1.default(obj, path);
    if (v === undefined) {
        set_1.default(obj, path, value);
    }
};
//# sourceMappingURL=ensureExists.js.map