"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const STestInterface_1 = __importDefault(require("../../interface/STestInterface"));
const sugar_1 = __importDefault(require("../../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../../object/deepMerge"));
module.exports = (_a = class STestJestCliInterface extends SInterface_1.default {
    },
    _a.definition = deepMerge_1.default(STestInterface_1.default.definition, {
        input: {
            default: sugar_1.default('jest.cli.input')
        },
        watch: {
            default: sugar_1.default('jest.cli.watch')
        }
    }),
    _a);
//# sourceMappingURL=module.js.map