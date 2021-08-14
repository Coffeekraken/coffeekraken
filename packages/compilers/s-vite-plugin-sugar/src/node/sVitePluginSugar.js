var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function sVitePluginSugar(settings = {}) {
    const jsReg = /\.(j|t)s(\?.*)?$/;
    let areEnvVarsInjected = false;
    let config;
    const packageRoot = __packageRootDir();
    function _injectEnvVars(src, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (areEnvVarsInjected)
                return src;
            areEnvVarsInjected = true;
            yield __SSugarConfig.load({
                platform: 'browser',
                env: 'dev',
            }, 'browser');
            const browserConfig = __SSugarConfig.get('.', 'browser');
            let envJsonStr = JSON.stringify(Object.assign({
                platform: 'browser',
                env: 'dev',
            }, { config: browserConfig }));
            envJsonStr = __sanitizeJsonString(envJsonStr);
            const code = [
                `// sugar variables`,
                `if (!window.env) window.env = {SUGAR:{}};`,
                `window.env.SUGAR = JSON.parse(\`${envJsonStr}\`);`,
            ];
            return [code.join('\n'), src].join('\n');
        });
    }
    return {
        name: 's-vite-plugin-sugar',
        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig;
        },
        transform(src, id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (jsReg.test(id)) {
                    if (id.includes(packageRoot) && id.match(/\/index\.(t|j)s/)) {
                        src = yield _injectEnvVars(src, id);
                    }
                    return {
                        code: src,
                        map: null,
                    };
                }
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5TdWdhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNWaXRlUGx1Z2luU3VnYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUU1RSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLG9CQUFvQixNQUFNLG9EQUFvRCxDQUFDO0FBRXRGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUFDLFdBQWdCLEVBQUU7SUFDdkQsTUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUM7SUFDakMsSUFBSSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDL0IsSUFBSSxNQUFNLENBQUM7SUFFWCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO0lBRXZDLFNBQWUsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFOztZQUNqQyxJQUFJLGtCQUFrQjtnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUNuQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFFMUIsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUNyQjtnQkFDSSxRQUFRLEVBQUUsU0FBUztnQkFDbkIsR0FBRyxFQUFFLEtBQUs7YUFDYixFQUNELFNBQVMsQ0FDWixDQUFDO1lBRUYsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFekQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsZUFFeEI7Z0JBQ0MsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLEdBQUcsRUFBRSxLQUFLO2FBQ2IsSUFDRCxNQUFNLEVBQUUsYUFBYSxJQUV2QixDQUFDO1lBRUgsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlDLE1BQU0sSUFBSSxHQUFHO2dCQUNULG9CQUFvQjtnQkFDcEIsMkNBQTJDO2dCQUMzQyxtQ0FBbUMsVUFBVSxNQUFNO2FBQ3RELENBQUM7WUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBRUQsT0FBTztRQUNILElBQUksRUFBRSxxQkFBcUI7UUFDM0IsY0FBYyxDQUFDLGNBQWM7WUFDekIsNEJBQTRCO1lBQzVCLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDNUIsQ0FBQztRQUNLLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7Z0JBQ25CLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsRUFBRTt3QkFDekQsR0FBRyxHQUFHLE1BQU0sY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDdkM7b0JBRUQsT0FBTzt3QkFDSCxJQUFJLEVBQUUsR0FBRzt3QkFDVCxHQUFHLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMO1lBQ0wsQ0FBQztTQUFBO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==