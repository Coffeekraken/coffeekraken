"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const TscInterface_1 = __importDefault(require("./TscInterface"));
class compileTsInterface extends SInterface_1.default {
}
compileTsInterface.definition = Object.assign(Object.assign({}, TscInterface_1.default.definition), { project: {
        type: 'Array<File>',
        alias: 'p'
    }, stacks: {
        type: 'Array<String>',
        alias: 's'
    }, input: {
        type: 'String',
        alias: 'i'
    }, watch: {
        type: 'Boolean',
        alias: 'w'
    }, transpileOnly: {
        type: 'Boolean'
    } });
module.exports = compileTsInterface;
//# sourceMappingURL=compileTsInterface.js.map