"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../../class/SInterface"));
const SDeamonInterface_1 = __importDefault(require("../../interface/SDeamonInterface"));
module.exports = (_a = class SFsDeamonInterface extends SInterface_1.default {
    },
    _a.implementsArray = [SDeamonInterface_1.default],
    _a.definition = {
        watch: {
            type: 'String',
            alias: 'i',
            description: 'Specify what to watch using a glob pattern',
            required: true,
            level: 1
        }
    },
    _a);
