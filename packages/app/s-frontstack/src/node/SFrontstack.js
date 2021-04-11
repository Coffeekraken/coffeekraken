"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const sugarBanner_1 = __importDefault(require("@coffeekraken/sugar/shared/ascii/sugarBanner"));
const s_process_1 = __importStar(require("@coffeekraken/s-process"));
class SFrontstack extends s_class_1.default {
    /**
     * @name            frontstackSettings
     * @type            ISFrontstackSettings
     * @get
     *
     * Access the frontstack settings
     *
     * @since           2.0.09
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get frontstackSettings() {
        return this._settings.frontstack;
    }
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(deepMerge_1.default({
            frontstack: {}
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name        start
     * @type        Function
     * @async
     *
     * This method allows you to start a frontstack process
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(params) {
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            const receipesObj = sugar_1.default('frontstack.receipes');
            const availableReceipes = Object.keys(receipesObj);
            if (availableReceipes.indexOf(params.receipe) === -1) {
                throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the requested receipe "<yellow>${params.receipe}</yellow>" does not exists. Here's the list of available receipe(s):\n${availableReceipes
                    .map((r) => `- <yellow>${r}</yellow>`)
                    .join('\n')}`);
            }
            emit('log', {
                nude: true,
                marginTop: 2,
                marginBottom: 2,
                value: sugarBanner_1.default()
            });
            // get the receipe object and treat it
            const receipeObj = receipesObj[params.receipe];
            // make sure this receipe has some actions
            if (!receipeObj.actions || !Object.keys(receipeObj.actions).length) {
                throw new Error(`<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${params.receipe}</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`);
            }
            // instanciate the process manager
            const processManager = new s_process_1.SProcessManager();
            // loop on each actions for this receipe
            Object.keys(receipeObj.actions).forEach((actionName) => {
                var _a, _b, _c, _d, _e, _f, _g;
                const actionObj = receipeObj.actions[actionName];
                const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : actionName;
                // create a process from the receipe object
                const pro = s_process_1.default.from((_b = actionObj.command) !== null && _b !== void 0 ? _b : actionObj.process);
                // add the process to the process manager
                processManager.attachProcess(actionId, pro, (_d = (_c = actionObj.settings) === null || _c === void 0 ? void 0 : _c.processManager) !== null && _d !== void 0 ? _d : {});
                processManager.run(actionId, (_e = actionObj.params) !== null && _e !== void 0 ? _e : {}, (_g = (_f = actionObj.settings) === null || _f === void 0 ? void 0 : _f.process) !== null && _g !== void 0 ? _g : {});
            });
        }, {
            eventEmitter: {
                bind: this
            }
        });
    }
}
exports.default = SFrontstack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsNEZBQXNFO0FBQ3RFLG9GQUFvRTtBQUVwRSx3RUFBaUQ7QUFDakQsK0ZBQXlFO0FBQ3pFLHFFQUtpQztBQWlDakMsTUFBcUIsV0FBWSxTQUFRLGlCQUFRO0lBQy9DOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDN0MsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxLQUFLLENBQUMsTUFBd0M7UUFDNUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUIsTUFBTSxXQUFXLEdBQUcsZUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFekQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRW5ELElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDcEQsTUFBTSxJQUFJLEtBQUssQ0FDYixTQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFDbkIsMERBQ0UsTUFBTSxDQUFDLE9BQ1QseUVBQXlFLGlCQUFpQjtxQkFDdkYsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO3FCQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDaEIsQ0FBQzthQUNIO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTtnQkFDVixTQUFTLEVBQUUsQ0FBQztnQkFDWixZQUFZLEVBQUUsQ0FBQztnQkFDZixLQUFLLEVBQUUscUJBQWEsRUFBRTthQUN2QixDQUFDLENBQUM7WUFFSCxzQ0FBc0M7WUFDdEMsTUFBTSxVQUFVLEdBQ2QsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU5QiwwQ0FBMEM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQ2IsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksNENBQTRDLE1BQU0sQ0FBQyxPQUFPLDJIQUEySCxDQUNuTixDQUFDO2FBQ0g7WUFFRCxrQ0FBa0M7WUFDbEMsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBaUIsRUFBRSxDQUFDO1lBRS9DLHdDQUF3QztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTs7Z0JBQ3JELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2pELE1BQU0sUUFBUSxHQUFHLE1BQUEsU0FBUyxDQUFDLEVBQUUsbUNBQUksVUFBVSxDQUFDO2dCQUM1QywyQ0FBMkM7Z0JBQzNDLE1BQU0sR0FBRyxHQUFHLG1CQUFVLENBQUMsSUFBSSxDQUFDLE1BQUEsU0FBUyxDQUFDLE9BQU8sbUNBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwRSx5Q0FBeUM7Z0JBQ3pDLGNBQWMsQ0FBQyxhQUFhLENBQzFCLFFBQVEsRUFDUixHQUFHLEVBQ0gsTUFBQSxNQUFBLFNBQVMsQ0FBQyxRQUFRLDBDQUFFLGNBQWMsbUNBQUksRUFBRSxDQUN6QyxDQUFDO2dCQUNGLGNBQWMsQ0FBQyxHQUFHLENBQ2hCLFFBQVEsRUFDUixNQUFBLFNBQVMsQ0FBQyxNQUFNLG1DQUFJLEVBQUUsRUFDdEIsTUFBQSxNQUFBLFNBQVMsQ0FBQyxRQUFRLDBDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUNsQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQ0Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWhIRCw4QkFnSEMifQ==