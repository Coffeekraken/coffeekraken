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
const s_classmap_1 = __importDefault(require("@coffeekraken/s-classmap"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const json_1 = require("@coffeekraken/sugar/json");
const package_1 = require("@coffeekraken/sugar/package");
/**
 * @name            sVitePluginSugar
 * @namespace       node
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This plugin allows you to automate some things like injecting
 * environment variables in the js, etc...
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sVitePluginSugar(settings = {}) {
    const jsReg = /\.(j|t)s(\?.*)?$/;
    let config;
    function _injectEnvVars(src, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield s_sugar_config_1.default.load({
                id: 'browser',
                platform: 'browser',
                env: s_env_1.default.get('env'),
                clean: true,
            });
            const browserConfig = yield c.instance.toObject();
            // filtering out all the "theme..." properties cause they are already
            // in the "theme" one...
            for (let [configId, value] of Object.entries(browserConfig)) {
                if (configId !== 'theme' && configId.startsWith('theme')) {
                    delete browserConfig[configId];
                }
            }
            // frontspec
            const frontspec = new s_frontspec_1.default(), frontspecJson = yield frontspec.read();
            // classmap
            const classmap = new s_classmap_1.default(), classmapJson = s_sugar_config_1.default.get('themeClassmap.enabled')
                ? classmap.readSync()
                : null;
            // removing some data for the frontend
            for (let key of s_sugar_config_1.default.get('frontspec.removeForFrontend')) {
                delete frontspecJson[key];
            }
            let envJsonStr = JSON.stringify({
                // @ts-ignore
                PLATFORM: 'browser',
                ENV: s_env_1.default.get('env'),
                SUGAR: {
                    config: browserConfig,
                },
                FRONTSPEC: frontspecJson,
                CLASSMAP: classmapJson,
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
                `document.env = window.___deepMerge(
                JSON.parse(\`${envJsonStr}\`),
                document.env || {}
            )`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEVBQW1EO0FBQ25ELGdFQUF5QztBQUN6Qyw0RUFBcUQ7QUFDckQsa0ZBQTBEO0FBQzFELG1EQUFnRTtBQUNoRSx5REFBZ0U7QUFFaEU7Ozs7Ozs7Ozs7OztHQVlHO0FBQ0gsU0FBd0IsZ0JBQWdCLENBQUMsV0FBZ0IsRUFBRTtJQUN2RCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztJQUNqQyxJQUFJLE1BQU0sQ0FBQztJQUVYLFNBQWUsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFOztZQUNqQyxNQUFNLENBQUMsR0FBRyxNQUFNLHdCQUFjLENBQUMsSUFBSSxDQUFDO2dCQUNoQyxFQUFFLEVBQUUsU0FBUztnQkFDYixRQUFRLEVBQUUsU0FBUztnQkFDbkIsR0FBRyxFQUFFLGVBQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUN0QixLQUFLLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztZQUNILE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVsRCxxRUFBcUU7WUFDckUsd0JBQXdCO1lBQ3hCLEtBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUN6RCxJQUFJLFFBQVEsS0FBSyxPQUFPLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDdEQsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ2xDO2FBQ0o7WUFFRCxZQUFZO1lBQ1osTUFBTSxTQUFTLEdBQUcsSUFBSSxxQkFBWSxFQUFFLEVBQ2hDLGFBQWEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUzQyxXQUFXO1lBQ1gsTUFB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