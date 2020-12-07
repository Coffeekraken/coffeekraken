"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const color_1 = __importDefault(require("../../color/color"));
module.exports = class SBlessedWindowBox extends SBlessedComponent_1.default {
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
};
//# sourceMappingURL=SWindowBox.js.map