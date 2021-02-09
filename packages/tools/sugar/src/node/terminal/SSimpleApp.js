"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SApp_1 = __importDefault(require("./SApp"));
const SHeader_1 = __importDefault(require("./SHeader"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const blessed_1 = __importDefault(require("blessed"));
const sugar_1 = __importDefault(require("../config/sugar"));
/**
 * @name                    SSimpleApp
 * @namespace           sugar.node.terminal
 * @type                    Class
 * @status              wip
 *
 * This class define an application in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this application
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 *
 * @example         js
 * import SSimpleApp from '@coffeekraken/sugar/node/terminal/SSimpleApp';
 * const app = new SSimpleApp('My Cool Application', {
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSimpleApp extends SApp_1.default {
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
}
exports.default = SSimpleApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpbXBsZUFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTaW1wbGVBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0RBQTRCO0FBQzVCLHdEQUFrQztBQUNsQyxvRUFBOEM7QUFDOUMsc0RBQWdDO0FBS2hDLDREQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFxQixVQUFXLFNBQVEsY0FBTTtJQUM1Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzdCLDBCQUEwQjtRQUMxQixLQUFLLENBQUMsSUFBSSxFQUFFLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsT0FBTyxDQUFDLE9BQU87UUFDYix1QkFBdUI7UUFDdkIsTUFBTSxTQUFTLEdBQUcsaUJBQVMsQ0FBQyxHQUFHLENBQUM7WUFDOUIsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztRQUVILHFCQUFxQjtRQUNyQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxhQUFhLE9BQU8sQ0FBQyxLQUFLLGFBQWE7Z0JBQ3pDLENBQUMsQ0FBQyxXQUFXLE9BQU8sQ0FBQyxLQUFLLFdBQVcsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksYUFBYSxHQUNmLHFDQUFxQyxHQUFHLFVBQVUsVUFBVSxVQUFVLENBQUM7UUFFekUsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBUyxDQUFDLGFBQWEsRUFBRTtZQUMxQyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxlQUFhLENBQUMsc0JBQXNCLENBQUM7aUJBQzFDO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFFdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFCLHVCQUF1QjtRQUN2QixPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0Y7QUE3REQsNkJBNkRDIn0=