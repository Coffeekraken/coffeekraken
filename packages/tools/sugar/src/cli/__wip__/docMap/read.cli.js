"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDocMap_1 = __importDefault(require("../../node/doc/SDocMap"));
async function docMapRead(stringArgs = '') {
    const docMapJson = await SDocMap_1.default.read();
    console.log(docMapJson);
    process.exit();
}
exports.default = docMapRead;
;
