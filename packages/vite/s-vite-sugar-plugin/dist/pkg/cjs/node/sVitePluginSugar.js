"use strict";
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
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const json_1 = require("@coffeekraken/sugar/json");
const package_1 = require("@coffeekraken/sugar/package");
/**
 * @name            sVitePluginSugar
 * @namespace       node
 * @type            Function
 *
 * This plugin allows you to automate some things like injecting
 * environment variables in the js, etc...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sVitePluginSugar(settings = {}) {
    const jsReg = /\.(j|t)s(\?.*)?$/;
    let areEnvVarsInjected = false;
    let config;
    function _injectEnvVars(src, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (areEnvVarsInjected) return src;
            // areEnvVarsInjected = true;
            const c = yield s_sugar_config_1.default.load({
                id: 'browser',
                platform: 'browser',
                env: s_env_1.default.get('env'),
                clean: true,
            });
            const browserConfig = yield c.instance.toObject();
            let envJsonStr = JSON.stringify({
                // @ts-ignore
                PLATFORM: 'browser',
                ENV: s_env_1.default.get('env'),
                ENVIRONMENT: s_env_1.default.get('env'),
                SUGAR: {
                    config: browserConfig,
                },
                PACKAGE: (0, package_1.__packageJsonSync)(),
            });
            envJsonStr = (0, json_1.__sanitizeJsonString)(envJsonStr);
            const code = [
                `// sugar environment`,
                `
                if (!window.___isObject) {
                    window.___isObject = function (item) {
                        return (item && typeof item === 'object' && !Array.isArray(item));
                    }
                }
                if (!window.___deepMerge) {
                    window.___deepMerge = function (target, ...sources) {
                        if (!sources.length) return target;
                        var source = sources.shift();
                        if (window.___isObject(target) && window.___isObject(source)) {
                            for (const key in source) {
                            if (window.___isObject(source[key])) {
                                if (!target[key]) Object.assign(target, { [key]: {} });
                               window.___deepMerge(target[key], source[key]);
                            } else {
                                Object.assign(target, { [key]: source[key] });
                            }
                            }
                        }
                        return window.___deepMerge(target, ...sources);
                    }
                }
            `.replace('\n', ''),
                `document.env = window.___deepMerge(JSON.parse(\`${envJsonStr}\`), {
                SUGAR: document.SUGAR ?? {}
            })`,
            ];
            return [code.join('\n'), src].join('\n');
        });
    }
    return {
        name: 's-vite-sugar-plugin',
        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig;
        },
        transform(src, id) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (jsReg.test(id)) {
                    // if (
                    //     id.includes(packageRoot)
                    //     // (id === config.build.rollupOptions?.input ||
                    //     //     id === config.build.lib?.entry)
                    // ) {
                    if (!id.includes('index.ts') ||
                        id.startsWith(s_sugar_config_1.default.get('storage.src.viewsDir'))) {
                        return {
                            code: src,
                            map: null,
                        };
                    }
                    if ((_a = config.build.rollupOptions) === null || _a === void 0 ? void 0 : _a.input) {
                        if (!config.build.lib) {
                            src = yield _injectEnvVars(src, id);
                        }
                    }
                    else {
                        // live dev environment
                        src = yield _injectEnvVars(src, id);
                    }
                    // }
                    return {
                        code: src,
                        map: null,
                    };
                }
            });
        },
    };
}
exports.default = sVitePluginSugar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLGtGQUEwRDtBQUMxRCxtREFBZ0U7QUFDaEUseURBQWdFO0FBRWhFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUF3QixnQkFBZ0IsQ0FBQyxXQUFnQixFQUFFO0lBQ3ZELE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDO0lBQ2pDLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQy9CLElBQUksTUFBTSxDQUFDO0lBRVgsU0FBZSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUU7O1lBQ2pDLHNDQUFzQztZQUN0Qyw2QkFBNkI7WUFFN0IsTUFBTSxDQUFDLEdBQUcsTUFBTSx3QkFBYyxDQUFDLElBQUksQ0FBQztnQkFDaEMsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxlQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFbEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDNUIsYUFBYTtnQkFDYixRQUFRLEVBQUUsU0FBUztnQkFDbkIsR0FBRyxFQUFFLGVBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUN0QixXQUFXLEVBQUUsZUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQzlCLEtBQUssRUFBRTtvQkFDSCxNQUFNLEVBQUUsYUFBYTtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFLElBQUEsMkJBQWlCLEdBQUU7YUFDL0IsQ0FBQyxDQUFDO1lBRUgsVUFBVSxHQUFHLElBQUEsMkJBQW9CLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUMsTUFBTSxJQUFJLEdBQUc7Z0JBQ1Qsc0JBQXNCO2dCQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUF1QkMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDbkIsbURBQW1ELFVBQVU7O2VBRTFEO2FBQ04sQ0FBQztZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixjQUFjLENBQUMsY0FBYztZQUN6Qiw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLGNBQWMsQ0FBQztRQUM1QixDQUFDO1FBQ0ssU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFOzs7Z0JBQ25CLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDaEIsT0FBTztvQkFDUCwrQkFBK0I7b0JBQy9CLHNEQUFzRDtvQkFDdEQsNkNBQTZDO29CQUM3QyxNQUFNO29CQUNOLElBQ0ksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQzt3QkFDeEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQzNEO3dCQUNFLE9BQU87NEJBQ0gsSUFBSSxFQUFFLEdBQUc7NEJBQ1QsR0FBRyxFQUFFLElBQUk7eUJBQ1osQ0FBQztxQkFDTDtvQkFFRCxJQUFJLE1BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLDBDQUFFLEtBQUssRUFBRTt3QkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFOzRCQUNuQixHQUFHLEdBQUcsTUFBTSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3lCQUN2QztxQkFDSjt5QkFBTTt3QkFDSCx1QkFBdUI7d0JBQ3ZCLEdBQUcsR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ3ZDO29CQUNELElBQUk7b0JBRUosT0FBTzt3QkFDSCxJQUFJLEVBQUUsR0FBRzt3QkFDVCxHQUFHLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMOztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUF2R0QsbUNBdUdDIn0=