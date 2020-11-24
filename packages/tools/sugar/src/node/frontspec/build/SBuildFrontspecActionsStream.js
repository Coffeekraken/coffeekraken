"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SActionsStream_1 = __importDefault(require("../../stream/SActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFsOutputStreamAction_1 = __importDefault(require("../../stream/actions/SFsOutputStreamAction"));
const SBuildFrontspecInterface_1 = __importDefault(require("./interface/SBuildFrontspecInterface"));
const SBuildFrontspecStreamAction_1 = __importDefault(require("./actions/SBuildFrontspecStreamAction"));
module.exports = (_a = class SBuildFrontspecActionsStream extends SActionsStream_1.default {
        /**
         * @name        constructor
         * @type        Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            // init actions stream
            super({
                buildFrontspec: SBuildFrontspecStreamAction_1.default,
                fsOutput: SFsOutputStreamAction_1.default
            }, deepMerge_1.default({
                id: 'SBuildFrontspecActionsStream',
                name: 'Build Frontspec.json Actions Stream',
                afterActions: {},
                beforeActions: {}
            }, settings));
        }
    },
    _a.interface = SBuildFrontspecInterface_1.default,
    _a);
