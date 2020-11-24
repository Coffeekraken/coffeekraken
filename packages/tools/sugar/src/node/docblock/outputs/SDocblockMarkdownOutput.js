"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SDocblockOutput_1 = __importDefault(require("../SDocblockOutput"));
const default_1 = __importDefault(require("./markdown/templates/default"));
const class_1 = __importDefault(require("./markdown/templates/class"));
const function_1 = __importDefault(require("./markdown/templates/function"));
const default_2 = __importDefault(require("./markdown/blocks/default"));
const class_2 = __importDefault(require("./markdown/blocks/class"));
const function_2 = __importDefault(require("./markdown/blocks/function"));
module.exports = (_a = class SDocblockMarkdownOutput extends SDocblockOutput_1.default {
        /**
         * @name        constructor
         * @type        Function
         * @constructor
         *
         * Constructor
         *
         * @since     2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(docblockInstance, settings = {}) {
            super(docblockInstance, deepMerge_1.default({
                templates: {
                    default: default_1.default,
                    class: class_1.default,
                    function: function_1.default
                },
                blocks: {
                    default: default_2.default,
                    class: class_2.default,
                    function: function_2.default
                }
            }, settings));
        }
    },
    /**
     * @name        supportedTags
     * @type        Array<String>
     * @static
     *
     * Store the list of supported docblock tags
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.supportedTags = [
        '@type',
        '@namespace',
        '@name',
        '@static',
        '@get',
        '@set',
        '@since',
        '@description',
        '@param',
        '@example',
        '@author'
    ],
    _a);
