"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
module.exports = class SSugarAppProcessModule extends SSugarAppModule_1.default {
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
        const ProcessClass = require(moduleObj.processPath);
        const pro = new ProcessClass(Object.assign(Object.assign({}, (this._settings.processSettings || {})), { metas: false, stdio: false, initialParams: Object.assign({}, moduleObj.params || {}) }));
        // register process
        this.registerProcess(pro);
        // set the module as ready
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FyQXBwUHJvY2Vzc01vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckFwcFByb2Nlc3NNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFJZCx3RUFBa0Q7QUFDbEQsdUVBQWlEO0FBZ0JqRCxpQkFBUyxNQUFNLHNCQUF1QixTQUFRLHlCQUFpQjtJQUM3RCw0REFBNEQ7SUFFNUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxTQUFTLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDbEMsK0JBQStCO1FBQy9CLEtBQUssQ0FDSCxtQkFBVyxDQUFDLFNBQVMsRUFBRTtZQUNyQixTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFO29CQUNSLEVBQUUsRUFBRSxLQUFLO29CQUNULElBQUksRUFBRSxLQUFLO29CQUNYLE1BQU0sRUFBRSxFQUFFO29CQUNWLFFBQVEsRUFBRSxFQUFFO2lCQUNiO2dCQUNELFFBQVEsRUFBRTtvQkFDUixFQUFFLEVBQUUsTUFBTTtvQkFDVixJQUFJLEVBQUUsTUFBTTtvQkFDWixNQUFNLEVBQUUsRUFBRTtvQkFDVixRQUFRLEVBQUUsRUFBRTtpQkFDYjthQUNGO1NBQ0YsQ0FBQyxFQUNGLG1CQUFXLENBQUMsUUFBUSxDQUFDLENBQ3RCLENBQUM7UUFFRixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksWUFBWSxpQ0FDdkIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUMsS0FDekMsS0FBSyxFQUFFLEtBQUssRUFDWixLQUFLLEVBQUUsS0FBSyxFQUNaLGFBQWEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxJQUN4RCxDQUFDO1FBRUgsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFMUIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFRCxlQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRO1FBQzNDLFFBQVEsV0FBVyxDQUFDLEVBQUUsRUFBRTtZQUN0QixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO29CQUFFLE9BQU87Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNmLDBFQUEwRSxDQUMzRSxDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtvQkFBRSxPQUFPO2dCQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsTUFBTTtTQUNUO0lBQ0gsQ0FBQztDQUNGLENBQUMifQ==