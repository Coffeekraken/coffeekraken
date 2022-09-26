"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const chokidar_1 = __importDefault(require("chokidar"));
const SMitosisBuildParamsInterface_1 = __importDefault(require("./interface/SMitosisBuildParamsInterface"));
class SMitosis extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({
            metas: {
                id: 'SMitosis',
            },
        }, settings || {}));
        // watch file
        // @ts-ignore
        if (!this.constructor.watcher) {
            // @ts-ignore
            this.constructor.watcher = chokidar_1.default.watch(s_sugar_config_1.default.get('docmap.read.input'));
            // @ts-ignore
            this.constructor.watcher.on('change', () => {
                // @ts-ignore
                delete this.constructor._cachedDocmapJson.current;
            });
        }
    }
    /**
     * @name          build
     * @type          Function
     *
     * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
     * and extract all the necessary informations to build the docmap.json file
     *
     * @param         {Partial<ISMitosisBuildParams>}          params        The params to use to build your docmap
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params) {
        const finalParams = ((0, object_1.__deepMerge)(SMitosisBuildParamsInterface_1.default.defaults(), params));
        return new s_promise_1.default(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            this._mitosisConfig = (yield Promise.resolve().then(() => __importStar(require(`${(0, path_1.__packageRootDir)()}/mitosis.config.js`)))).default;
            // build first
            yield pipe(this._build(finalParams));
            // watch
            if (finalParams.watch) {
                const watcher = chokidar_1.default.watch(this._mitosisConfig.files, {
                    cwd: (0, path_1.__packageRootDir)(),
                    ignoreInitial: true,
                });
                watcher.on('add', () => {
                    pipe(this._build(finalParams));
                });
                watcher.on('change', () => {
                    pipe(this._build(finalParams));
                });
                (0, process_1.__onProcessExit)(() => __awaiter(this, void 0, void 0, function* () {
                    yield watcher.close();
                }));
                on('cancel', () => {
                    watcher.close();
                });
            }
            if (!finalParams.watch) {
                resolve();
            }
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    _build(params) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start building your component(s)`,
            });
            const pro = (0, process_1.__spawn)('npm exec mitosis build');
            // pro.on('log', (data) => {
            //     console.log('data', data._logObj.value);
            // });
            yield pro;
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[build]</green> Component(s) builded <green>successfully</green>!`,
            });
            if (params.watch) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[watch]</yellow> Watching for files changes...`,
                });
            }
            resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
exports.default = SMitosis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsdURBQXlEO0FBQ3pELG1EQUE0RDtBQUM1RCx5REFBdUU7QUFDdkUsd0RBQWtDO0FBQ2xDLDRHQUFzRjtBQW1DdEYsTUFBTSxRQUFTLFNBQVEsaUJBQVE7SUFhM0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFxQztRQUM3QyxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxVQUFVO2FBQ2pCO1NBQ0osRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixhQUFhO1FBQ2IsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUMzQixhQUFhO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQ3ZDLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQzFDLENBQUM7WUFDRixhQUFhO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ3ZDLGFBQWE7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FBQyxNQUFxQztRQUN2QyxNQUFNLFdBQVcsR0FBeUIsQ0FDdEMsSUFBQSxvQkFBVyxFQUFDLHNDQUE4QixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FB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