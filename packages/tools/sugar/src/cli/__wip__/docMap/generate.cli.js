"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDocMap_1 = __importDefault(require("../../node/doc/SDocMap"));
async function docMapGenerate(stringArgs = '') {
    const pathes = await SDocMap_1.default.find();
    console.log(pathes);
    process.exit();
}
exports.default = docMapGenerate;
;
