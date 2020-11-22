"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name                SDescriptorRule
 * @namespace           sugar.js.descriptor
 * @type                Class
 *
 * This class is the main one that MUST be used as parent one
 * when creating any descriptor like object, string, etc...
 *
 * @param       {ISDescriptorRuleSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @example       js
 * import SDescriptorRule from '@coffeekraken/sugar/js/descriptor/SDescriptorRule';
 * class MyDescriptor extends SDescriptorRule {
 *    constructor(settings) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls = class SDescriptorRule {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        // save the settings
        this._settings = deepMerge_1.default({}, settings);
        // check that the descriptor class has a static "description" property
    }
};
exports.default = Cls;
