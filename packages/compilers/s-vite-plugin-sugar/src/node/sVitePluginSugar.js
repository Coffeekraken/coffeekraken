import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __SEnv from '@coffeekraken/s-env';
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
        if (areEnvVarsInjected)
            return src;
        areEnvVarsInjected = true;
        const envJson = JSON.stringify(Object.assign(Object.assign({}, __SEnv.env), { ENVIRONMENT: config.isProduction ? 'production' : 'development' }));
        const code = [
            `// sugar variables`,
            `if (!window.env) window.env = {SUGAR:{}};`,
            `window.env.SUGAR = JSON.parse('${envJson}');`
        ];
        return [code.join('\n'), src].join('\n');
    }
    return {
        name: 's-vite-plugin-sugar',
        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig;
        },
        transform(src, id) {
            if (jsReg.test(id)) {
                if (id.includes(packageRoot) && id.match(/\/index\.(t|j)s/)) {
                    src = _injectEnvVars(src, id);
                }
                return {
                    code: src,
                    map: null
                };
            }
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5TdWdhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNWaXRlUGx1Z2luU3VnYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUV6Qzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FBQyxXQUFnQixFQUFFO0lBQ3pELE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDO0lBQ2pDLElBQUksa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQy9CLElBQUksTUFBTSxDQUFDO0lBRVgsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztJQUV2QyxTQUFTLGNBQWMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMzQixJQUFJLGtCQUFrQjtZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQ25DLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUUxQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxpQ0FFekIsTUFBTSxDQUFDLEdBQUcsS0FDYixXQUFXLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxhQUFhLElBQy9ELENBQUM7UUFFSCxNQUFNLElBQUksR0FBRztZQUNYLG9CQUFvQjtZQUNwQiwyQ0FBMkM7WUFDM0Msa0NBQWtDLE9BQU8sS0FBSztTQUMvQyxDQUFDO1FBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFSCxPQUFPO1FBQ0wsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixjQUFjLENBQUMsY0FBYztZQUMzQiw0QkFBNEI7WUFDNUIsTUFBTSxHQUFHLGNBQWMsQ0FBQTtRQUN6QixDQUFDO1FBQ0QsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUVsQixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO29CQUMzRCxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDL0I7Z0JBRUQsT0FBTztvQkFDTCxJQUFJLEVBQUUsR0FBRztvQkFDVCxHQUFHLEVBQUUsSUFBSTtpQkFDVixDQUFDO2FBQ0g7UUFDSCxDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==