"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
// let defaultConfig;
// if (__fs.existsSync(`${__packageRoot()}/tsconfig.json`)) {
//   defaultConfig = `${__packageRoot()}/tsconfig.json`;
// } else if (__fs.exi)
class compileTsInterface extends SInterface_1.default {
}
compileTsInterface.definition = {
    config: {
        type: 'File|Array<File>',
        alias: 'c'
    },
    input: {
        type: 'String',
        alias: 'i'
    }
};
module.exports = compileTsInterface;
