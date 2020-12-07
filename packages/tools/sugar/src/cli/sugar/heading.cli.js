"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const sugarHeading_1 = __importDefault(require("../../node/ascii/sugarHeading"));
const json_1 = __importDefault(require("../../node/package/json"));
function heading(stringArgs = '') {
    console.log(sugarHeading_1.default({
        version: json_1.default(__dirname).version
    }));
}
module.exports = heading;
//# sourceMappingURL=heading.cli.js.map