"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwUHJvY2Vzc01vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ub2RlL2FwcC9zdWdhci9TU3VnYXJBcHBQcm9jZXNzTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUlkLHdFQUFrRDtBQUNsRCx1RUFBaUQ7QUFFakQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQU0sc0JBQXVCLFNBQVEseUJBQWlCO0lBQ3BELDREQUE0RDtJQUU1RDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNsQywrQkFBK0I7UUFDL0IsS0FBSyxDQUNILG1CQUFXLENBQUMsU0FBUyxFQUFFO1lBQ3JCLFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUU7b0JBQ1IsRUFBRSxFQUFFLEtBQUs7b0JBQ1QsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLEVBQUUsRUFBRSxNQUFNO29CQUNWLElBQUksRUFBRSxNQUFNO29CQUNaLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRSxFQUFFO2lCQUNiO2FBQ0Y7U0FDRixDQUFDLEVBQ0YsbUJBQVcsQ0FBQyxRQUFRLENBQUMsQ0FDdEIsQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDdEUsT0FBTyxrQ0FDRixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyxLQUN6QyxLQUFLLEVBQUUsS0FBSyxFQUNaLFVBQVUsRUFBRSxLQUFLLEdBQ2xCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUIsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRO1FBQzNDLFFBQVEsV0FBVyxDQUFDLEVBQUUsRUFBRTtZQUN0QixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO29CQUFFLE9BQU87Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNmLDBFQUEwRSxDQUMzRSxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtvQkFBRSxPQUFPO2dCQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsTUFBTTtTQUNUO0lBQ0gsQ0FBQztDQUNGO0FBRUQsa0JBQWUsc0JBQXNCLENBQUMifQ==