"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
/**
 * @name                SSugarAppProcessModule
 * @namespace           sugar.node.app.sugar
 * @type                Class
 * @extends             SSugarAppModule
 * @status              wip
 *
 * This class represent the simple process module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SSugarAppProcessModule extends SSugarAppModule_1.default {
    // static interfaces = { this: __SFrontendServerInterface };
    /**
     * @name            constructor
     * @type             Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(moduleObj, settings = {}) {
        // check the settings interface
        super(deepMerge_1.default(moduleObj, {
            shortcuts: {
                'ctrl+r': {
                    id: 'run',
                    name: 'Run',
                    params: {},
                    settings: {}
                },
                'ctrl+e': {
                    id: 'exit',
                    name: 'Exit',
                    params: {},
                    settings: {}
                }
            }
        }), deepMerge_1.default(settings));
        const ProcessClass = require(moduleObj.processPath).default;
        const pro = new ProcessClass(Object.assign({}, moduleObj.params || {}), {
            process: Object.assign(Object.assign({}, (this._settings.processSettings || {})), { stdio: false, decorators: false })
        });
        // register process
        this.registerProcess(pro);
        // // set the module as ready
        this.ready();
    }
    handleShortcuts(shortcutObj, params, settings) {
        switch (shortcutObj.id) {
            case 'exit':
                if (!this.process.isRunning())
                    return;
                this.process.kill(`The process has been killed using the "<yellow>ctrl+e</yellow>" shortcut`);
                break;
            case 'run':
                if (this.process.isRunning())
                    return;
                this.process.run(params);
                break;
        }
    }
}
exports.default = SSugarAppProcessModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwUHJvY2Vzc01vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFByb2Nlc3NNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBSWQsd0VBQWtEO0FBQ2xELGlGQUEyRDtBQUUzRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBTSxzQkFBdUIsU0FBUSx5QkFBaUI7SUFDcEQsNERBQTREO0lBRTVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ2xDLCtCQUErQjtRQUMvQixLQUFLLENBQ0gsbUJBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDckIsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRTtvQkFDUixFQUFFLEVBQUUsS0FBSztvQkFDVCxJQUFJLEVBQUUsS0FBSztvQkFDWCxNQUFNLEVBQUUsRUFBRTtvQkFDVixRQUFRLEVBQUUsRUFBRTtpQkFDYjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsRUFBRSxFQUFFLE1BQU07b0JBQ1YsSUFBSSxFQUFFLE1BQU07b0JBQ1osTUFBTSxFQUFFLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7YUFDRjtTQUNGLENBQUMsRUFDRixtQkFBVyxDQUFDLFFBQVEsQ0FBQyxDQUN0QixDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDNUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsRUFBRTtZQUN0RSxPQUFPLGtDQUNGLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLEtBQ3pDLEtBQUssRUFBRSxLQUFLLEVBQ1osVUFBVSxFQUFFLEtBQUssR0FDbEI7U0FDRixDQUFDLENBQUM7UUFFSCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQiw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELGVBQWUsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLFFBQVE7UUFDM0MsUUFBUSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQ3RCLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7b0JBQUUsT0FBTztnQkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2YsMEVBQTBFLENBQzNFLENBQUM7Z0JBQ0YsTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO29CQUFFLE9BQU87Z0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QixNQUFNO1NBQ1Q7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9