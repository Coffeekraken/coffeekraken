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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpbXBsZUFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTaW1wbGVBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCxrREFBNEI7QUFDNUIsd0RBQWtDO0FBQ2xDLG9FQUE4QztBQUM5QyxzREFBZ0M7QUFLaEMsNERBQTRDO0FBMEI1QyxpQkFBUyxNQUFNLFVBQVcsU0FBUSxjQUFNO0lBQ3RDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDN0IsMEJBQTBCO1FBQzFCLEtBQUssQ0FBQyxJQUFJLEVBQUUsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxPQUFPLENBQUMsT0FBTztRQUNiLHVCQUF1QjtRQUN2QixNQUFNLFNBQVMsR0FBRyxpQkFBUyxDQUFDLEdBQUcsQ0FBQztZQUM5QixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1NBQ2YsQ0FBQyxDQUFDO1FBRUgscUJBQXFCO1FBQ3JCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLGFBQWEsT0FBTyxDQUFDLEtBQUssYUFBYTtnQkFDekMsQ0FBQyxDQUFDLFdBQVcsT0FBTyxDQUFDLEtBQUssV0FBVyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxhQUFhLEdBQ2YscUNBQXFDLEdBQUcsVUFBVSxVQUFVLFVBQVUsQ0FBQztRQUV6RSxNQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFTLENBQUMsYUFBYSxFQUFFO1lBQzFDLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLGVBQWEsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDMUM7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM1QixPQUFPLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUV2QixTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUIsdUJBQXVCO1FBQ3ZCLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRixDQUFDIn0=