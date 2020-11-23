"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SDocblockOutput_1 = __importDefault(require("../SDocblockOutput"));
const default_1 = __importDefault(require("./markdown/templates/default"));
const class_1 = __importDefault(require("./markdown/templates/class"));
const function_1 = __importDefault(require("./markdown/templates/function"));
const default_2 = __importDefault(require("./markdown/blocks/default"));
const class_2 = __importDefault(require("./markdown/blocks/class"));
const function_2 = __importDefault(require("./markdown/blocks/function"));
/**
 * @name            SDocblockMarkdownOutput
 * @namespace       sugar.js.docblock.outputs
 * @type            Class
 *
 * This class represent an SDocblock output like "markdown", "html", etc...
 * Supported docblock tags:
 * - @type
 * - @namespace
 * - @name
 * - @static
 * - @get
 * - @set
 * - @since
 * - @description
 * - @param
 * - @example
 * - @author
 *
 * @param       {SDocblock}         docblockInstance        The docblock instance you want to output using this class
 * @param       {Object}            [settings={}]           Some settings to configure your output class:
 * - ...
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SDocblock';
 * import SDocblockMarkdownOutput from '@coffeekraken/sugar/js/docblock/SDocblockMarkdownOutput';
 * const docblock = new SDocblock('my/cool/file.js');
 * const docblockOutput = new SDocblockMarkdownOutput(docblock);
 * docblockOutput.render();
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocblockMarkdownOutput extends SDocblockOutput_1.default {
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
}
exports.default = SDocblockMarkdownOutput;
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
SDocblockMarkdownOutput.supportedTags = [
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
];
