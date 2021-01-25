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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0hlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNIZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCxvRUFBOEM7QUFDOUMsc0RBQWdDO0FBQ2hDLDREQUFzQztBQTRCdEMsaUJBQVMsTUFBTSxPQUFRLFNBQVEsaUJBQVMsQ0FBQyxHQUFHO0lBdUIxQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksS0FBSyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzlCLG9CQUFvQjtRQUNwQixNQUFNLFNBQVMsR0FBRyxtQkFBVyxDQUMzQjtZQUNFLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsSUFBSTtnQkFDVixPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLENBQUM7b0JBQ04sTUFBTSxFQUFFLENBQUM7b0JBQ1QsSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRiwwQkFBMEI7UUFDMUIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQWpEM0I7Ozs7Ozs7O1dBUUc7UUFDSCxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWQ7Ozs7Ozs7O1dBUUc7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBOEJiLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUUzQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsZUFBZTtRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVwQyxvQkFBb0I7UUFDcEIsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDeEMsQ0FBQztDQUNGLENBQUMifQ==