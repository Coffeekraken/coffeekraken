"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blessed_1 = __importDefault(require("blessed"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const color_1 = __importDefault(require("../../../shared/color/color"));
/**
 * @name                  SBlessedWindowBox
 * @namespace           sugar.node.blessed.box
 * @type                  Class
 * @status              wip
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
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedWindowBox from '@coffeekraken/sugar/node/blessed/box/SBlessedWindowBox';
 * const box = new SBlessedWindowBox(myCoolContent, {});
 *
 * @since       2.0.0
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
            blessed: {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dpbmRvd0JveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNXaW5kb3dCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsc0RBQWdDO0FBQ2hDLDZFQUF1RDtBQUN2RCxpRkFBMkQ7QUFJM0Qsd0VBQWtEO0FBTWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILE1BQXFCLGlCQUFrQixTQUFRLDJCQUFtQjtJQUNoRTs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBUSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2pDLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsT0FBTztvQkFDWCxFQUFFLEVBQUUsZUFBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsUUFBUSxFQUFFO2lCQUMzQztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLENBQUM7b0JBQ04sSUFBSSxFQUFFLENBQUM7b0JBQ1AsS0FBSyxFQUFFLENBQUM7b0JBQ1IsTUFBTSxFQUFFLENBQUM7aUJBQ1Y7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQVMsQ0FBQyxHQUFHLENBQUM7WUFDMUIsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRTtnQkFDUixHQUFHLEVBQUUsQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQzthQUNSO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxPQUFPO2dCQUNYLEVBQUUsRUFBRSxPQUFPO2FBQ1o7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELE1BQU07UUFDSixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdERELG9DQXNEQyJ9