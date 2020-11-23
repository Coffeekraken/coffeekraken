"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugarHeading_1 = __importDefault(require("../../node/ascii/sugarHeading"));
const json_1 = __importDefault(require("../../node/package/json"));
function default_1(stringArgs = '') {
    console.log(sugarHeading_1.default({
        version: json_1.default(__dirname).version
    }));
}
exports.default = default_1;
