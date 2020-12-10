"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("./SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../terminal/parseHtml"));
const color_1 = __importDefault(require("../color/color"));
module.exports = class SHeader extends SBlessedComponent_1.default {
    /**
     * @name                  constructor
     * @type                  Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        super(deepMerge_1.default({
            title: 'Coffeekraken <bgBlack><yellow>Sugar</yellow></bgBlack> based application',
            width: '100%',
            height: 3,
            style: {
                bg: color_1.default('terminal.primary').toString(),
                fg: color_1.default('terminal.black').toString()
            },
            padding: {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1
            }
        }, settings));
        this._titleBox = blessed_1.default.box({
            style: {
                bg: this._settings.style.bg,
                fg: this._settings.style.fg
            },
            content: parseHtml_1.default(this._settings.title)
        });
        this.append(this._titleBox);
    }
    /**
     * @name            update
     * @type            Function
     * @override
     *
     * This method simply draw the header
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    update() {
        super.update();
    }
};
//# sourceMappingURL=module.js.map