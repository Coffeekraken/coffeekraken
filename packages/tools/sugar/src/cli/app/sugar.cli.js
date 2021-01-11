"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SSugarApp_1 = __importDefault(require("../../node/app/sugar/SSugarApp"));
function sugar(stringArgs = '') {
    new SSugarApp_1.default(stringArgs);
}
module.exports = sugar;
//# sourceMappingURL=sugar.cli.js.map