"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const neo_blessed_1 = __importDefault(require("neo-blessed"));
const SBlessedComponent_1 = __importDefault(require("../../blessed/SBlessedComponent"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBlessedOutput_1 = __importDefault(require("../../blessed/SBlessedOutput"));
const parseHtml_1 = __importDefault(require("../../console/parseHtml"));
/**
 * @name            SSugarAppModuleTerminalUi
 * @namespace       sugar.node.app.sugar
 * @type            Class
 * @extends         SBlessedComponent
 * @status              wip
 *
 * This class represent the main one to create some UI that fit in the SSugarAppTerminalUi
 * based terminal interface
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your terminal interface
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SSugarAppModuleTerminalUi from '@coffeekraken/sugar/node/app/sugar/SSugarAppModuleTerminalUi';
 * class MyUi extends SSugarAppModuleTerminalUi {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 * }
 *
 * @since           2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSugarAppModuleTerminalUi extends SBlessedComponent_1.default {
    /**
     * @name        constructor
     * @type         Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(sources, settings = {}) {
        super(deepMerge_1.default({
            filter: null,
            blessed: {
                width: '100%',
                height: '100%',
                style: {
                    bg: 'yellow'
                }
            }
        }, settings));
        // init the log component
        this.$log = new SBlessedOutput_1.default(sources, {
            filter: this._settings.filter,
            width: '100%',
            height: '100%'
        });
        this.append(this.$log);
        // shortcuts
        if (settings.shortcuts) {
            let shortcutsArray = [];
            Object.keys(settings.shortcuts).forEach((shortcut) => {
                const shortcutObj = settings.shortcuts[shortcut];
                shortcutsArray.push(` ${shortcutObj.name} <yellow>${shortcut}</yellow> `);
            });
            this.$log.height = '100%-1';
            this.$shortcuts = neo_blessed_1.default.box({
                width: '100%',
                height: 1,
                top: '100%-1',
                style: {
                    bg: 'black',
                    fg: 'white'
                },
                content: parseHtml_1.default(shortcutsArray.join('|'))
            });
            this.append(this.$shortcuts);
        }
    }
    /**
     * @name          log
     * @type          Function
     *
     * This is an alias of the this.$log.log SBlessedOutput method
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(...args) {
        this.$log.log(...args);
    }
}
exports.default = SSugarAppModuleTerminalUi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlVGVybWluYWxVaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2FwcC9zdWdhci9TU3VnYXJBcHBNb2R1bGVUZXJtaW5hbFVpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUFvQztBQUNwQyx3RkFBa0U7QUFDbEUsdUVBQWlEO0FBQ2pELGtGQUE0RDtBQUM1RCx3RUFBa0Q7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBcUIseUJBQTBCLFNBQVEsMkJBQW1CO0lBQ3hFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2hDLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxRQUFRO2lCQUNiO2FBQ0Y7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUN4QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1lBQzdCLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QixZQUFZO1FBQ1osSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3RCLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDbkQsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakQsY0FBYyxDQUFDLElBQUksQ0FDakIsSUFBSSxXQUFXLENBQUMsSUFBSSxZQUFZLFFBQVEsWUFBWSxDQUNyRCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxxQkFBUyxDQUFDLEdBQUcsQ0FBQztnQkFDOUIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxPQUFPO29CQUNYLEVBQUUsRUFBRSxPQUFPO2lCQUNaO2dCQUNELE9BQU8sRUFBRSxtQkFBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0MsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsR0FBRyxJQUFJO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0NBQ0Y7QUF4RUQsNENBd0VDIn0=