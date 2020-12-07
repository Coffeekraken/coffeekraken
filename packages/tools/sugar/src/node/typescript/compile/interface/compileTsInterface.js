"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const TscInterface_1 = __importDefault(require("./TscInterface"));
// let defaultConfig;
// if (__fs.existsSync(`${__packageRoot()}/tsconfig.json`)) {
//   defaultConfig = `${__packageRoot()}/tsconfig.json`;
// } else if (__fs.exi)
class compileTsInterface extends SInterface_1.default {
}
compileTsInterface.definition = Object.assign(Object.assign({}, TscInterface_1.default.definition), { config: {
        type: 'Array<File>',
        alias: 'c'
    }, input: {
        type: 'String',
        alias: 'i'
    }, watch: {
        type: 'Boolean',
        alias: 'w'
    } });
module.exports = compileTsInterface;
//# sourceMappingURL=compileTsInterface.js.map