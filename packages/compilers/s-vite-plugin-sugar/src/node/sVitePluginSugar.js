import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
    const packageRoot = __packageRoot();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic1ZpdGVQbHVnaW5TdWdhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNWaXRlUGx1Z2luU3VnYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFFekM7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsV0FBZ0IsRUFBRTtJQUN6RCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQztJQUNqQyxJQUFJLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUMvQixJQUFJLE1BQU0sQ0FBQztJQUVYLE1BQU0sV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO0lBRXBDLFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzNCLElBQUksa0JBQWtCO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDbkMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBRTFCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLGlDQUV6QixNQUFNLENBQUMsR0FBRyxLQUNiLFdBQVcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFDL0QsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHO1lBQ1gsb0JBQW9CO1lBQ3BCLDJDQUEyQztZQUMzQyxrQ0FBa0MsT0FBTyxLQUFLO1NBQy9DLENBQUM7UUFFRixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVILE9BQU87UUFDTCxJQUFJLEVBQUUscUJBQXFCO1FBQzNCLGNBQWMsQ0FBQyxjQUFjO1lBQzNCLDRCQUE0QjtZQUM1QixNQUFNLEdBQUcsY0FBYyxDQUFBO1FBQ3pCLENBQUM7UUFDRCxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBRWxCLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7b0JBQzNELEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUMvQjtnQkFFRCxPQUFPO29CQUNMLElBQUksRUFBRSxHQUFHO29CQUNULEdBQUcsRUFBRSxJQUFJO2lCQUNWLENBQUM7YUFDSDtRQUNILENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyJ9