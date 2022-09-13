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
import { __sanitizeJsonString } from '@coffeekraken/sugar/json';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
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
                env: __SEnv.get('env'),
                clean: true,
            });
            const browserConfig = yield c.instance.toObject();
            let envJsonStr = JSON.stringify({
                // @ts-ignore
                PLATFORM: 'browser',
                ENV: __SEnv.get('env'),
                ENVIRONMENT: __SEnv.get('env'),
                SUGAR: {
                    config: browserConfig,
                },
                PACKAGE: __packageJsonSync(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWhFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUFDLFdBQWdCLEVBQUU7SUFDdkQsTUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUM7SUFDakMsSUFBSSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDL0IsSUFBSSxNQUFNLENBQUM7SUFFWCxTQUFlLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7WUFDakMsc0NBQXNDO1lBQ3RDLDZCQUE2QjtZQUU3QixNQUFNLENBQUMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLEVBQUUsRUFBRSxTQUFTO2dCQUNiLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLEtBQUssRUFBRSxJQUFJO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWxELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLGFBQWE7Z0JBQ2IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUM5QixLQUFLLEVBQUU7b0JBQ0gsTUFBTSxFQUFFLGFBQWE7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRTthQUMvQixDQUFDLENBQUM7WUFFSCxVQUFVLEdBQUcsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUMsTUFBTSxJQUFJLEdBQUc7Z0JBQ1Qsc0JBQXNCO2dCQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQW1CQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUNuQiw0Q0FBNEMsVUFBVTs7ZUFFbkQ7YUFDTixDQUFDO1lBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtJQUVELE9BQU87UUFDSCxJQUFJLEVBQUUscUJBQXFCO1FBQzNCLGNBQWMsQ0FBQyxjQUFjO1lBQ3pCLDRCQUE0QjtZQUM1QixNQUFNLEdBQUcsY0FBYyxDQUFDO1FBQzVCLENBQUM7UUFDSyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUU7OztnQkFDbkIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNoQixPQUFPO29CQUNQLCtCQUErQjtvQkFDL0Isc0RBQXNEO29CQUN0RCw2Q0FBNkM7b0JBQzdDLE1BQU07b0JBQ04sSUFDSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO3dCQUN4QixFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUMzRDt3QkFDRSxPQUFPOzRCQUNILElBQUksRUFBRSxHQUFHOzRCQUNULEdBQUcsRUFBRSxJQUFJO3lCQUNaLENBQUM7cUJBQ0w7b0JBRUQsSUFBSSxNQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSwwQ0FBRSxLQUFLLEVBQUU7d0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTs0QkFDbkIsR0FBRyxHQUFHLE1BQU0sY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFDdkM7cUJBQ0o7eUJBQU07d0JBQ0gsdUJBQXVCO3dCQUN2QixHQUFHLEdBQUcsTUFBTSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUN2QztvQkFDRCxJQUFJO29CQUVKLE9BQU87d0JBQ0gsSUFBSSxFQUFFLEdBQUc7d0JBQ1QsR0FBRyxFQUFFLElBQUk7cUJBQ1osQ0FBQztpQkFDTDs7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=