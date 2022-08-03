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
const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
const sanitizeJsonString_1 = __importDefault(require("@coffeekraken/sugar/shared/json/sanitizeJsonString"));
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
                env: s_env_1.default.env.env,
                clean: true,
            });
            const browserConfig = yield c.instance.toObject();
            let envJsonStr = JSON.stringify({
                // @ts-ignore
                PLATFORM: 'browser',
                ENV: 'development',
                ENVIRONMENT: 'development',
                SUGAR: {
                    config: browserConfig,
                },
                PACKAGE: (0, jsonSync_1.default)(),
            });
            envJsonStr = (0, sanitizeJsonString_1.default)(envJsonStr);
            const code = [
                `// sugar environment`,
                `
                function ___isObject(item) {
                    return (item && typeof item === 'object' && !Array.isArray(item));
                }
                function ___deepMerge(target, ...sources) {
                    if (!sources.length) return target;
                    var source = sources.shift();
                    if (___isObject(target) && ___isObject(source)) {
                        for (const key in source) {
                        if (___isObject(source[key])) {
                            if (!target[key]) Object.assign(target, { [key]: {} });
                            ___deepMerge(target[key], source[key]);
                        } else {
                            Object.assign(target, { [key]: source[key] });
                        }
                        }
                    }
                    return ___deepMerge(target, ...sources);
                }
            `.replace('\n', ''),
                `document.env = ___deepMerge(JSON.parse(\`${envJsonStr}\`), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLGtGQUEwRDtBQUMxRCx5RkFBc0U7QUFDdEUsNEdBQXNGO0FBRXRGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUF3QixnQkFBZ0IsQ0FBQyxXQUFnQixFQUFFO0lBQ3ZELE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDO0lBQ2pDLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQy9CLElBQUksTUFBTSxDQUFDO0lBRVgsU0FBZSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUU7O1lBQ2pDLHNDQUFzQztZQUN0Qyw2QkFBNkI7WUFFN0IsTUFBTSxDQUFDLEdBQUcsTUFBTSx3QkFBYyxDQUFDLElBQUksQ0FBQztnQkFDaEMsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxlQUFNLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0JBQ25CLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWxELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLGFBQWE7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxhQUFhO2dCQUNsQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsS0FBSyxFQUFFO29CQUNILE1BQU0sRUFBRSxhQUFhO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUUsSUFBQSxrQkFBYSxHQUFFO2FBQzNCLENBQUMsQ0FBQztZQUVILFVBQVUsR0FBRyxJQUFBLDRCQUFvQixFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlDLE1BQU0sSUFBSSxHQUFHO2dCQUNULHNCQUFzQjtnQkFDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUFtQkMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDbkIsNENBQTRDLFVBQVU7O2VBRW5EO2FBQ04sQ0FBQztZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixjQUFjLENBQUMsY0FBYztZQUN6Qiw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLGNBQWMsQ0FBQztRQUM1QixDQUFDO1FBQ0ssU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFOzs7Z0JBQ25CLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDaEIsT0FBTztvQkFDUCwrQkFBK0I7b0JBQy9CLHNEQUFzRDtvQkFDdEQsNkNBQTZDO29CQUM3QyxNQUFNO29CQUNOLElBQ0ksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQzt3QkFDeEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQzNEO3dCQUNFLE9BQU87NEJBQ0gsSUFBSSxFQUFFLEdBQUc7NEJBQ1QsR0FBRyxFQUFFLElBQUk7eUJBQ1osQ0FBQztxQkFDTDtvQkFFRCxJQUFJLE1BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLDBDQUFFLEtBQUssRUFBRTt3QkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFOzRCQUNuQixHQUFHLEdBQUcsTUFBTSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3lCQUN2QztxQkFDSjt5QkFBTTt3QkFDSCx1QkFBdUI7d0JBQ3ZCLEdBQUcsR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ3ZDO29CQUNELElBQUk7b0JBRUosT0FBTzt3QkFDSCxJQUFJLEVBQUUsR0FBRzt3QkFDVCxHQUFHLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMOztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFuR0QsbUNBbUdDIn0=