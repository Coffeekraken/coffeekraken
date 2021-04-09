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
        return new s_promise_1.default(({ resolve, reject }) => {
            const receipesObj = sugar_1.default('frontstack.receipes');
            const availableReceipes = Object.keys(receipesObj);
            if (availableReceipes.indexOf(params.receipe) === -1) {
                throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the requested receipe "<yellow>${params.receipe}</yellow>" does not exists. Here's the list of available receipe(s):\n${availableReceipes
                    .map((r) => `- <yellow>${r}</yellow>`)
                    .join('\n')}`);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsNEZBQXNFO0FBQ3RFLG9GQUFvRTtBQUVwRSx3RUFBaUQ7QUFDakQscUVBS2lDO0FBaUNqQyxNQUFxQixXQUFZLFNBQVEsaUJBQVE7SUFDL0M7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxrQkFBa0I7UUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUM3QyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FBQyxNQUF3QztRQUM1QyxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3RCLE1BQU0sV0FBVyxHQUFHLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRXpELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVuRCxJQUFJLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BELE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQ25CLDBEQUNFLE1BQU0sQ0FBQyxPQUNULHlFQUF5RSxpQkFBaUI7cUJBQ3ZGLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztxQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ2hCLENBQUM7YUFDSDtZQUVELHNDQUFzQztZQUN0QyxNQUFNLFVBQVUsR0FDZCxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTlCLDBDQUEwQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDbEUsTUFBTSxJQUFJLEtBQUssQ0FDYixRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw0Q0FBNEMsTUFBTSxDQUFDLE9BQU8sMkhBQTJILENBQ25OLENBQUM7YUFDSDtZQUVELGtDQUFrQztZQUNsQyxNQUFNLGNBQWMsR0FBRyxJQUFJLDJCQUFpQixFQUFFLENBQUM7WUFFL0Msd0NBQXdDO1lBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFOztnQkFDckQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDakQsTUFBTSxRQUFRLEdBQUcsTUFBQSxTQUFTLENBQUMsRUFBRSxtQ0FBSSxVQUFVLENBQUM7Z0JBQzVDLDJDQUEyQztnQkFDM0MsTUFBTSxHQUFHLEdBQUcsbUJBQVUsQ0FBQyxJQUFJLENBQUMsTUFBQSxTQUFTLENBQUMsT0FBTyxtQ0FBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BFLHlDQUF5QztnQkFDekMsY0FBYyxDQUFDLGFBQWEsQ0FDMUIsUUFBUSxFQUNSLEdBQUcsRUFDSCxNQUFBLE1BQUEsU0FBUyxDQUFDLFFBQVEsMENBQUUsY0FBYyxtQ0FBSSxFQUFFLENBQ3pDLENBQUM7Z0JBQ0YsY0FBYyxDQUFDLEdBQUcsQ0FDaEIsUUFBUSxFQUNSLE1BQUEsU0FBUyxDQUFDLE1BQU0sbUNBQUksRUFBRSxFQUN0QixNQUFBLE1BQUEsU0FBUyxDQUFDLFFBQVEsMENBQUUsT0FBTyxtQ0FBSSxFQUFFLENBQ2xDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNFLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBekdELDhCQXlHQyJ9