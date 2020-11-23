"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const color_1 = __importDefault(require("../../color/color"));
/**
 * @name                  SBlessedWindowBox
 * @namespace           sugar.node.blessed.box
 * @type                  Class
 *
 * This class gives you the ability to display windowed style boxes with a header, a body and a footer
 *
 * @param         {Array}          $content               A content to display inside the window. Must be a child of blessed.node class
 * @param        {Object}         [settings = {}]         A settings object to configure your this. Here's the available settings:
 * - title (null) {String|blessed.node}: The box title to display
 * - titleRight (null) {String|blessed.node}: The box title displayed to the right
 * - footer (null) {String|blessed.node}: The box footer to display
 * - footerRight (null) {String|blessed.node}: The box footer displayed to the right
 * - colors ({}) {Object}: The colors to use for the window
 *    - fg (black) {Color}: The foreground color to use
 *    - bg (__color('terminal.primary').toString()) {Color}: The background color to use
 * - ...blessed.box settings
 * @example       js
 * import SBlessedWindowBox from '@coffeekraken/sugar/node/blessed/box/SBlessedWindowBox';
 * const box = new SBlessedWindowBox(myCoolContent, {});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBlessedWindowBox extends SBlessedComponent_1.default {
    /**
     * @name                  constructor
     * @type                  Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor($content, settings = {}) {
        super(deepMerge_1.default({
            style: {
                fg: 'black',
                bg: color_1.default('terminal.primary').toString()
            },
            padding: {
                top: 1,
                left: 2,
                right: 2,
                bottom: 1
            }
        }, settings));
        this._$body = blessed_1.default.box({
            width: '100%',
            height: '100%',
            position: {
                top: 0,
                left: 0
            },
            style: {
                fg: 'white',
                bg: 'black'
            }
        });
        this.append(this._$body);
        this.update();
    }
    update() {
        setTimeout(() => {
            super.update();
        });
    }
}
exports.default = SBlessedWindowBox;
;
