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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLGtGQUEwRDtBQUMxRCx5RkFBc0U7QUFDdEUsNEdBQXNGO0FBRXRGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxTQUF3QixnQkFBZ0IsQ0FBQyxXQUFnQixFQUFFO0lBQ3ZELE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDO0lBQ2pDLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQy9CLElBQUksTUFBTSxDQUFDO0lBRVgsU0FBZSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUU7O1lBQ2pDLHNDQUFzQztZQUN0Qyw2QkFBNkI7WUFFN0IsTUFBTSxDQUFDLEdBQUcsTUFBTSx3QkFBYyxDQUFDLElBQUksQ0FBQztnQkFDaEMsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxlQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFbEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDNUIsYUFBYTtnQkFDYixRQUFRLEVBQUUsU0FBUztnQkFDbkIsR0FBRyxFQUFFLGVBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUN0QixXQUFXLEVBQUUsZUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQzlCLEtBQUssRUFBRTtvQkFDSCxNQUFNLEVBQUUsYUFBYTtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFLElBQUEsa0JBQWEsR0FBRTthQUMzQixDQUFDLENBQUM7WUFFSCxVQUFVLEdBQUcsSUFBQSw0QkFBb0IsRUFBQyxVQUFVLENBQUMsQ0FBQztZQUU5QyxNQUFNLElBQUksR0FBRztnQkFDVCxzQkFBc0I7Z0JBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBbUJDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ25CLDRDQUE0QyxVQUFVOztlQUVuRDthQUNOLENBQUM7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNILElBQUksRUFBRSxxQkFBcUI7UUFDM0IsY0FBYyxDQUFDLGNBQWM7WUFDekIsNEJBQTRCO1lBQzVCLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDNUIsQ0FBQztRQUNLLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7O2dCQUNuQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ2hCLE9BQU87b0JBQ1AsK0JBQStCO29CQUMvQixzREFBc0Q7b0JBQ3RELDZDQUE2QztvQkFDN0MsTUFBTTtvQkFDTixJQUNJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7d0JBQ3hCLEVBQUUsQ0FBQyxVQUFVLENBQUMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUMzRDt3QkFDRSxPQUFPOzRCQUNILElBQUksRUFBRSxHQUFHOzRCQUNULEdBQUcsRUFBRSxJQUFJO3lCQUNaLENBQUM7cUJBQ0w7b0JBRUQsSUFBSSxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSwwQ0FBRSxLQUFLLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTs0QkFDbkIsR0FBRyxHQUFHLE1BQU0sY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFDdkM7cUJBQ0o7eUJBQU07d0JBQ0gsdUJBQXVCO3dCQUN2QixHQUFHLEdBQUcsTUFBTSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUN2QztvQkFDRCxJQUFJO29CQUVKLE9BQU87d0JBQ0gsSUFBSSxFQUFFLEdBQUc7d0JBQ1QsR0FBRyxFQUFFLElBQUk7cUJBQ1osQ0FBQztpQkFDTDs7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBbkdELG1DQW1HQyJ9