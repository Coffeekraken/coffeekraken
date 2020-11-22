"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../node/class/SInterface"));
module.exports = (_a = class SNpmBinInterface extends SInterface_1.default {
    },
    _a.definitionObj = {
        action: {
            type: 'String',
            required: true,
            alias: 'a',
            values: ['install', 'i', 'uninstall', 'u', 'un'],
            description: 'Specify which action you want to execute in the "bin" module'
        },
        global: {
            type: 'Boolean',
            required: true,
            alias: 'g',
            description: 'Specify if you want to symlink the passed bin in the global scope or in local one',
            default: false
        },
        package: {
            type: 'String',
            alias: 'p',
            description: "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
            default: null
        },
        bin: {
            type: 'String',
            alias: 'b',
            description: 'Specify the bin you want to symlink',
            default: null
        }
    },
    _a);
