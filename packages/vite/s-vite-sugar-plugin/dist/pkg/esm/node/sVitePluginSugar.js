var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClassmap from '@coffeekraken/s-classmap';
import __SEnv from '@coffeekraken/s-env';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __sanitizeJsonString } from '@coffeekraken/sugar/json';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
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
export default function sVitePluginSugar(settings = {}) {
    const jsReg = /\.(j|t)s(\?.*)?$/;
    let areEnvVarsInjected = false;
    let config;
    function _injectEnvVars(src, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (areEnvVarsInjected) return src;
            // areEnvVarsInjected = true;
            const c = yield __SSugarConfig.load({
                id: 'browser',
                platform: 'browser',
                env: __SEnv.get('env'),
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
            const frontspec = new __SFrontspec(), frontspecJson = frontspec.read();
            // classmap
            const classmap = new __SClassmap(), classmapJson = classmap.readSync();
            // removing some data for the frontend
            for (let key of __SSugarConfig.get('frontspec.removeForFrontend')) {
                delete frontspecJson[key];
            }
            let envJsonStr = JSON.stringify({
                // @ts-ignore
                PLATFORM: 'browser',
                ENV: __SEnv.get('env'),
                SUGAR: {
                    config: browserConfig,
                },
                FRONTSPEC: frontspecJson,
                CLASSMAP: classmapJson,
                PACKAGE: __packageJsonSync(),
            });
            envJsonStr = __sanitizeJsonString(envJsonStr);
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
                        id.startsWith(__SSugarConfig.get('storage.src.viewsDir'))) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7R0FZRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsV0FBZ0IsRUFBRTtJQUN2RCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztJQUNqQyxJQUFJLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUMvQixJQUFJLE1BQU0sQ0FBQztJQUVYLFNBQWUsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFOztZQUNqQyxzQ0FBc0M7WUFDdEMsNkJBQTZCO1lBRTdCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDaEMsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsS0FBSyxFQUFFLElBQUk7YUFDZCxDQUFDLENBQUM7WUFDSCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFbEQscUVBQXFFO1lBQ3JFLHdCQUF3QjtZQUN4QixLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDekQsSUFBSSxRQUFR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