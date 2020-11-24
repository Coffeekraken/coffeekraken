"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("./parseHtml"));
module.exports = class SHeader extends blessed_1.default.box {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(title, settings = {}) {
        // save the settings
        const _settings = deepMerge_1.default({
            blessed: {
                tags: true,
                padding: {
                    top: 1,
                    bottom: 0,
                    left: 2,
                    right: 1
                }
            }
        }, settings);
        // extend from blessed.box
        super(_settings.blessed);
        /**
         * @name              _title
         * @type              String
         * @private
         *
         * Store the header title
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._title = null;
        /**
         * @name              _settings
         * @type              Object
         * @private
         *
         * Store the header settings
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        // save settings
        this._settings = _settings;
        // save the title
        this._title = title;
        // set the size
        this.height = 3;
        // set the header content
        this.setContent(parseHtml_1.default(title));
        // render the screen
        if (this.screen)
            this.screen.render();
    }
};
