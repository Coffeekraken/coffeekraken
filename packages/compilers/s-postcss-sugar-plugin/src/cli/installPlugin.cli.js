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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./interface/SCliSugarPostcssPluginInstallParamsInterface", "@coffeekraken/s-promise", "fs", "@coffeekraken/sugar/node/path/packageRoot", "@coffeekraken/sugar/node/fs/readJsonSync", "@coffeekraken/sugar/node/fs/writeJsonSync", "@coffeekraken/s-sugar-config", "@coffeekraken/sugar/shared/array/unique", "@coffeekraken/sugar/node/npm/install"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    // @ts-nocheck
    const SCliSugarPostcssPluginInstallParamsInterface_1 = __importDefault(require("./interface/SCliSugarPostcssPluginInstallParamsInterface"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const fs_1 = __importDefault(require("fs"));
    const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
    const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
    const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
    const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
    const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
    const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
    exports.default = (stringArgs = '') => {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const finalParams = SCliSugarPostcssPluginInstallParamsInterface_1.default.apply(stringArgs);
            const rootPath = (0, packageRoot_1.default)(process.cwd());
            let currentConfig = {};
            // check for existing configurations
            if (fs_1.default.existsSync(`${rootPath}/.postcssrc.json`)) {
                currentConfig = (0, readJsonSync_1.default)(`${rootPath}/.postcssrc.json`);
            }
            else if (fs_1.default.existsSync(`${rootPath}/postcss.config.js`)) {
                currentConfig = yield (_a = `${rootPath}/postcss.config.js`, __syncRequire ? Promise.resolve().then(() => __importStar(require(_a))) : new Promise((resolve_1, reject_1) => { require([_a], resolve_1, reject_1); }).then(__importStar));
                fs_1.default.renameSync(`${rootPath}/postcss.config.js`, `${rootPath}/postcss.config.old.js`);
            }
            // init plugins stack if needed
            if (!currentConfig.plugins)
                currentConfig.plugins = [];
            // adding plugins
            const plugins = s_sugar_config_1.default.get('postcss.plugins');
            currentConfig.plugins = (0, unique_1.default)([
                ...plugins,
                ...currentConfig.plugins,
            ]);
            // installing plugins
            if (finalParams.install) {
                emit('log', {
                    value: `Installing <cyan>${currentConfig.plugins.length}</cyan> plugins...`,
                });
                currentConfig.plugins.forEach((plugin) => {
                    emit('log', {
                        value: `- <yellow>${plugin}</yellow>`,
                    });
                });
                yield pipe((0, install_1.default)(currentConfig.plugins.join(' ')));
            }
            // saving new config
            emit('log', {
                value: `Saving new configuration file under <cyan>.postcssrc.json</cyan>.`,
            });
            (0, writeJsonSync_1.default)(`${rootPath}/.postcssrc.json`, currentConfig);
            resolve();
        }));
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbFBsdWdpbi5jbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnN0YWxsUGx1Z2luLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsY0FBYztJQUNkLDRJQUFzSDtJQUN0SCx3RUFBaUQ7SUFFakQsNENBQXNCO0lBQ3RCLDRGQUFzRTtJQUN0RSw0RkFBc0U7SUFDdEUsOEZBQXdFO0lBQ3hFLGtGQUEwRDtJQUMxRCxxRkFBK0Q7SUFDL0QsbUZBQWdFO0lBRWhFLGtCQUFlLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQy9CLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUM1RCxNQUFNLFdBQVcsR0FBRyxzREFBOEMsQ0FBQyxLQUFLLENBQ3BFLFVBQVUsQ0FDYixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsSUFBQSxxQkFBYSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBRTlDLElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUV2QixvQ0FBb0M7WUFDcEMsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxrQkFBa0IsQ0FBQyxFQUFFO2dCQUNoRCxhQUFhLEdBQUcsSUFBQSxzQkFBYyxFQUFDLEdBQUcsUUFBUSxrQkFBa0IsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsb0JBQW9CLENBQUMsRUFBRTtnQkFDekQsYUFBYSxHQUFHLFlBQWEsR0FBRyxRQUFRLG9CQUFvQiw2S0FBQyxDQUFDO2dCQUM5RCxZQUFJLENBQUMsVUFBVSxDQUNYLEdBQUcsUUFBUSxvQkFBb0IsRUFDL0IsR0FBRyxRQUFRLHdCQUF3QixDQUN0QyxDQUFDO2FBQ0w7WUFFRCwrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPO2dCQUFFLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRXZELGlCQUFpQjtZQUNqQixNQUFNLE9BQU8sR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3RELGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBQSxnQkFBUSxFQUFDO2dCQUM3QixHQUFHLE9BQU87Z0JBQ1YsR0FBRyxhQUFhLENBQUMsT0FBTzthQUMzQixDQUFDLENBQUM7WUFFSCxxQkFBcUI7WUFDckIsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxvQkFBb0IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLG9CQUFvQjtpQkFDOUUsQ0FBQyxDQUFDO2dCQUNILGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLGFBQWEsTUFBTSxXQUFXO3FCQUN4QyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxJQUFJLENBQUMsSUFBQSxpQkFBWSxFQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3RDtZQUVELG9CQUFvQjtZQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxtRUFBbUU7YUFDN0UsQ0FBQyxDQUFDO1lBQ0gsSUFBQSx1QkFBZSxFQUFDLEdBQUcsUUFBUSxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUU5RCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMifQ==