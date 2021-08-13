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
import __SEnv from '@coffeekraken/s-env';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
            yield __SSugarConfig.load('browser', {
                platform: 'browser',
                env: 'dev',
            });
            const browserConfig = __SSugarConfig.get('.', 'browser');
            const envJson = JSON.stringify(Object.assign(Object.assign({}, __SEnv.env), { config: browserConfig }));
            // console.log(envJson);
            const code = [
                `// sugar variables`,
                `if (!window.env) window.env = {SUGAR:{}};`,
                `window.env.SUGAR = JSON.parse('${envJson}');`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5TdWdhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNWaXRlUGx1Z2luU3VnYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FBQyxXQUFnQixFQUFFO0lBQ3ZELE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDO0lBQ2pDLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQy9CLElBQUksTUFBTSxDQUFDO0lBRVgsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztJQUV2QyxTQUFlLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7WUFDakMsSUFBSSxrQkFBa0I7Z0JBQUUsT0FBTyxHQUFHLENBQUM7WUFDbkMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1lBRTFCLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2pDLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixHQUFHLEVBQUUsS0FBSzthQUNiLENBQUMsQ0FBQztZQUVILE1BQU0sYUFBYSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXpELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLGlDQUV2QixNQUFNLENBQUMsR0FBRyxLQUNiLE1BQU0sRUFBRSxhQUFhLElBRXZCLENBQUM7WUFDSCx3QkFBd0I7WUFFeEIsTUFBTSxJQUFJLEdBQUc7Z0JBQ1Qsb0JBQW9CO2dCQUNwQiwyQ0FBMkM7Z0JBQzNDLGtDQUFrQyxPQUFPLEtBQUs7YUFDakQsQ0FBQztZQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixjQUFjLENBQUMsY0FBYztZQUN6Qiw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLGNBQWMsQ0FBQztRQUM1QixDQUFDO1FBQ0ssU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFOztnQkFDbkIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNoQixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO3dCQUN6RCxHQUFHLEdBQUcsTUFBTSxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUN2QztvQkFFRCxPQUFPO3dCQUNILElBQUksRUFBRSxHQUFHO3dCQUNULEdBQUcsRUFBRSxJQUFJO3FCQUNaLENBQUM7aUJBQ0w7WUFDTCxDQUFDO1NBQUE7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9