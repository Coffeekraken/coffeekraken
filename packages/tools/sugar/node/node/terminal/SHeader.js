"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const blessed_1 = __importDefault(require("blessed"));
const parseHtml_1 = __importDefault(require("./parseHtml"));
/**
 * @name                    SHeader
 * @namespace           sugar.node.terminal
 * @type                    Class
 * @status              wip
 *
 * This class define a "header" in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          title            Specify a title for this header.
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 * - screen (true) {Boolean}: Specify if you want your header wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your header in the terminal. If you have your own screen object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SHeader from '@coffeekraken/sugar/node/terminal/SHeader';
 * const header = new SHeader('Hello world', {});
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SHeader extends blessed_1.default.box {
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
}
exports.default = SHeader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0hlYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ub2RlL3Rlcm1pbmFsL1NIZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsb0VBQThDO0FBQzlDLHNEQUFnQztBQUNoQyw0REFBc0M7QUFJdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBcUIsT0FBUSxTQUFRLGlCQUFTLENBQUMsR0FBRztJQXVCaEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLEtBQUssRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUM5QixvQkFBb0I7UUFDcEIsTUFBTSxTQUFTLEdBQUcsbUJBQVcsQ0FDM0I7WUFDRSxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsT0FBTyxFQUFFO29CQUNQLEdBQUcsRUFBRSxDQUFDO29CQUNOLE1BQU0sRUFBRSxDQUFDO29CQUNULElBQUksRUFBRSxDQUFDO29CQUNQLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0Y7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsMEJBQTBCO1FBQzFCLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFqRDNCOzs7Ozs7OztXQVFHO1FBQ0gsV0FBTSxHQUFHLElBQUksQ0FBQztRQUVkOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQThCYixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLGVBQWU7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVoQix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFcEMsb0JBQW9CO1FBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hDLENBQUM7Q0FDRjtBQWxFRCwwQkFrRUMifQ==