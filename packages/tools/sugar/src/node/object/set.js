"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const get_1 = __importDefault(require("./get"));
module.exports = (obj, path, value) => {
    if (!path || path === '' || path === '.') {
        obj = value;
        return;
    }
    const a = path.split('.');
    let o = obj;
    while (a.length - 1) {
        const n = a.shift();
        if (!(n in o))
            o[n] = {};
        o = o[n];
    }
    o[a[0]] = value;
    return get_1.default(obj, path);
};
