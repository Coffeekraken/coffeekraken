"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SDocblockOutput_1 = __importDefault(require("../SDocblockOutput"));
module.exports = (_a = class SDocblockHtmlOutput extends SDocblockOutput_1.default {
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
                    default: '@coffeekraken/sugar/js/docblock/outputs/html/templates/default.js',
                    class: '@coffeekraken/sugar/js/docblock/outputs/html/templates/class.js',
                    function: '@coffeekraken/sugar/js/docblock/outputs/html/templates/function.js'
                },
                blocks: {
                    default: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/default.js',
                    class: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/class.js',
                    function: '@coffeekraken/sugar/js/docblock/outputs/html/blocks/function.js'
                },
                partials: {
                    author: '@coffeekraken/sugar/js/docblock/outputs/html/partials/author.js',
                    heading: '@coffeekraken/sugar/js/docblock/outputs/html/partials/heading.js',
                    example: '@coffeekraken/sugar/js/docblock/outputs/html/partials/example.js',
                    params: '@coffeekraken/sugar/js/docblock/outputs/html/partials/params.js',
                    sharings: '@coffeekraken/sugar/js/docblock/outputs/html/partials/sharings.js'
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
//# sourceMappingURL=module.js.map