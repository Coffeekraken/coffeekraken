"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SApp_1 = __importDefault(require("./SApp"));
const SHeader_1 = __importDefault(require("./SHeader"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const blessed_1 = __importDefault(require("blessed"));
const sugar_1 = __importDefault(require("../config/sugar"));
module.exports = class SSimpleApp extends SApp_1.default {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(name, settings = {}) {
        // extend from blessed.box
        super(name, deepMerge_1.default({}, settings));
        this._settings.layout = this._layout.bind(this);
    }
    /**
     * @name              _layout
     * @type              Function
     * @private
     *
     * Render the layout of the app
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _layout(content) {
        // make a container box
        const container = blessed_1.default.box({
            width: '100%',
            height: '100%'
        });
        // preparing the menu
        let menuString = '';
        Object.keys(this._settings.menu).forEach((url, i) => {
            const menuObj = this._settings.menu[url];
            menuString += this.isActive(url)
                ? `<bgBlack> ${menuObj.title} </bgBlack>`
                : `<black> ${menuObj.title} </black>`;
        });
        let headerContent = `<black>Coffeekraken Sugar</black>\n` + `{right}${menuString}{/right}`;
        const header = new SHeader_1.default(headerContent, {
            blessed: {
                style: {
                    bg: sugar_1.default('colors.primary.color')
                }
            }
        });
        content.top = header.height;
        content.width = '100%';
        container.append(header);
        container.append(content);
        // return the container
        return container;
    }
};
//# sourceMappingURL=SSimpleApp.js.map