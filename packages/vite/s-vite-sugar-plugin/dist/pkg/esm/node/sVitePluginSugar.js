var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SEnv from '@coffeekraken/s-env';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __sanitizeJsonString from '@coffeekraken/sugar/shared/json/sanitizeJsonString';
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
                env: __SEnv.env.env,
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
                PACKAGE: __packageJson(),
            });
            envJsonStr = __sanitizeJsonString(envJsonStr);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sb0JBQW9CLE1BQU0sb0RBQW9ELENBQUM7QUFFdEY7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsV0FBZ0IsRUFBRTtJQUN2RCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztJQUNqQyxJQUFJLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUMvQixJQUFJLE1BQU0sQ0FBQztJQUVYLFNBQWUsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFOztZQUNqQyxzQ0FBc0M7WUFDdEMsNkJBQTZCO1lBRTdCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDaEMsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUc7Z0JBQ25CLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWxELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLGFBQWE7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxhQUFhO2dCQUNsQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsS0FBSyxFQUFFO29CQUNILE1BQU0sRUFBRSxhQUFhO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUUsYUFBYSxFQUFFO2FBQzNCLENBQUMsQ0FBQztZQUVILFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5QyxNQUFNLElBQUksR0FBRztnQkFDVCxzQkFBc0I7Z0JBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBbUJDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ25CLDRDQUE0QyxVQUFVOztlQUVuRDthQUNOLENBQUM7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNILElBQUksRUFBRSxxQkFBcUI7UUFDM0IsY0FBYyxDQUFDLGNBQWM7WUFDekIsNEJBQTRCO1lBQzVCLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDNUIsQ0FBQztRQUNLLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7O2dCQUNuQixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ2hCLE9BQU87b0JBQ1AsK0JBQStCO29CQUMvQixzREFBc0Q7b0JBQ3RELDZDQUE2QztvQkFDN0MsTUFBTTtvQkFDTixJQUNJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7d0JBQ3hCLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEVBQzNEO3dCQUNFLE9BQU87NEJBQ0gsSUFBSSxFQUFFLEdBQUc7NEJBQ1QsR0FBRyxFQUFFLElBQUk7eUJBQ1osQ0FBQztxQkFDTDtvQkFFRCxJQUFJLE1BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLDBDQUFFLEtBQUssRUFBRTt3QkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFOzRCQUNuQixHQUFHLEdBQUcsTUFBTSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3lCQUN2QztxQkFDSjt5QkFBTTt3QkFDSCx1QkFBdUI7d0JBQ3ZCLEdBQUcsR0FBRyxNQUFNLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ3ZDO29CQUNELElBQUk7b0JBRUosT0FBTzt3QkFDSCxJQUFJLEVBQUUsR0FBRzt3QkFDVCxHQUFHLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMOztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==