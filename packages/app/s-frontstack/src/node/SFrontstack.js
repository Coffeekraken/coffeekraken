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
const SFrontstackStartInterface_1 = __importDefault(require("./start/interface/SFrontstackStartInterface"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const sugarBanner_1 = __importDefault(require("@coffeekraken/sugar/shared/ascii/sugarBanner"));
const s_process_1 = __importStar(require("@coffeekraken/s-process"));
class SFrontstack extends s_class_1.default {
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
            const finalParams = this.applyInterface('startParams', params);
            const availableReceipes = Object.keys(receipesObj);
            if (availableReceipes.indexOf(finalParams.receipe) === -1) {
                throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the requested receipe "<yellow>${finalParams.receipe}</yellow>" does not exists. Here's the list of available receipe(s):\n${availableReceipes
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
            const receipeObj = 
            // @ts-ignore
            receipesObj[finalParams.receipe];
            if (!receipeObj) {
                throw new Error(`<red>${this.constructor.name}.start</red> Sorry the the requested "<yellow>${finalParams.receipe}</yellow>" does not exists. Here's the available receipe(s): ${Object.keys(receipesObj)
                    .map((l) => `<green>${l}</green>`)
                    .join(',')}`);
            }
            // make sure this receipe has some actions
            if (!receipeObj.actions || !Object.keys(receipeObj.actions).length) {
                throw new Error(`<red>${this.constructor.name}.start] Sorry but the requested "<yellow>${finalParams.receipe}</yellow>" configuration object missed the requested "<yellow>actions</yellow>" property that list the actions to execute`);
            }
            // instanciate the process manager
            const processManager = new s_process_1.SProcessManager();
            // loop on each actions for this receipe
            if (receipeObj.actions) {
                Object.keys(receipeObj.actions).forEach((actionName) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    // @ts-ignore
                    const actionObj = receipeObj.actions[actionName];
                    const actionId = (_a = actionObj.id) !== null && _a !== void 0 ? _a : actionName;
                    // create a process from the receipe object
                    const pro = s_process_1.default.from((_b = actionObj.command) !== null && _b !== void 0 ? _b : actionObj.process);
                    // add the process to the process manager
                    processManager.attachProcess(actionId, pro, (_d = (_c = actionObj.settings) === null || _c === void 0 ? void 0 : _c.processManager) !== null && _d !== void 0 ? _d : {});
                    processManager.run(actionId, (_e = actionObj.params) !== null && _e !== void 0 ? _e : {}, (_g = (_f = actionObj.settings) === null || _f === void 0 ? void 0 : _f.process) !== null && _g !== void 0 ? _g : {});
                });
            }
        }, {
            eventEmitter: {
                bind: this
            }
        });
    }
}
exports.default = SFrontstack;
SFrontstack.interfaces = {
    startParams: SFrontstackStartInterface_1.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsNEZBQXNFO0FBQ3RFLG9GQUFvRTtBQUNwRSw0R0FBc0Y7QUFDdEYsd0VBQWlEO0FBQ2pELCtGQUF5RTtBQUN6RSxxRUFJaUM7QUFpQ2pDLE1BQXFCLFdBQVksU0FBUSxpQkFBUTtJQW1CL0M7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUM3QyxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQWpDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGtCQUFrQjtRQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO0lBQzFDLENBQUM7SUF1QkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsS0FBSyxDQUFDLE1BQXdDO1FBQzVDLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVCLE1BQU0sV0FBVyxHQUFHLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRXpELE1BQU0sV0FBVyxHQUE0QixJQUFJLENBQUMsY0FBYyxDQUM5RCxhQUFhLEVBQ2IsTUFBTSxDQUNQLENBQUM7WUFFRixNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFbkQsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6RCxNQUFNLElBQUksS0FBSyxDQUNiLFNBQ0UsSUFBSSxDQUFDLFdBQVcs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