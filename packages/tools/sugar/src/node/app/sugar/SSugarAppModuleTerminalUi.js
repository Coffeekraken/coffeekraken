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
 * @wip
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwTW9kdWxlVGVybWluYWxVaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcE1vZHVsZVRlcm1pbmFsVWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsOERBQW9DO0FBQ3BDLHdGQUFrRTtBQUNsRSx1RUFBaUQ7QUFDakQsa0ZBQTREO0FBQzVELHdFQUFrRDtBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFxQix5QkFBMEIsU0FBUSwyQkFBbUI7SUFDeEU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDaEMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsTUFBTTtnQkFDZCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLFFBQVE7aUJBQ2I7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksd0JBQWdCLENBQUMsT0FBTyxFQUFFO1lBQ3hDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07WUFDN0IsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLFlBQVk7UUFDWixJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDdEIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNuRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRCxjQUFjLENBQUMsSUFBSSxDQUNqQixJQUFJLFdBQVcsQ0FBQyxJQUFJLFlBQVksUUFBUSxZQUFZLENBQ3JELENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFTLENBQUMsR0FBRyxDQUFDO2dCQUM5QixLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsQ0FBQztnQkFDVCxHQUFHLEVBQUUsUUFBUTtnQkFDYixLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLE9BQU87b0JBQ1gsRUFBRSxFQUFFLE9BQU87aUJBQ1o7Z0JBQ0QsT0FBTyxFQUFFLG1CQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMvQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEdBQUcsQ0FBQyxHQUFHLElBQUk7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRjtBQXhFRCw0Q0F3RUMifQ==