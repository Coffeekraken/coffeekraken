"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SFsFileSettingsInterface extends SInterface_1.default {
    },
    _a.definition = {
        checkExistence: {
            type: 'Boolean',
            description: 'Specify if you want to check or not the file existence on the filesystem',
            required: true
        },
        rootDir: {
            type: 'String',
            description: 'Specify a root directory that you want to considere as the root folder where the file live. This will gives you access to properties like ```rootDir``` and ```relPath```',
            required: false
        }
    },
    _a);
//# sourceMappingURL=SFileSettingsInterface.js.map