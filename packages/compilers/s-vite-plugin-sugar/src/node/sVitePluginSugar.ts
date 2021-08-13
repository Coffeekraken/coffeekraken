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
export default function sVitePluginSugar(settings: any = {}) {
    const jsReg = /\.(j|t)s(\?.*)?$/;
    let areEnvVarsInjected = false;
    let config;

    const packageRoot = __packageRootDir();

    async function _injectEnvVars(src, id) {
        if (areEnvVarsInjected) return src;
        areEnvVarsInjected = true;

        await __SSugarConfig.load('browser', {
            platform: 'browser',
            env: 'dev',
        });

        const browserConfig = __SSugarConfig.get('.', 'browser');

        const envJson = JSON.stringify({
            // @ts-ignore
            ...__SEnv.env,
            config: browserConfig,
            // ENVIRONMENT: config.isProduction ? 'production' : 'development',
        });
        // console.log(envJson);

        const code = [
            `// sugar variables`,
            `if (!window.env) window.env = {SUGAR:{}};`,
            `window.env.SUGAR = JSON.parse('${envJson}');`,
        ];

        return [code.join('\n'), src].join('\n');
    }

    return {
        name: 's-vite-plugin-sugar',
        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig;
        },
        async transform(src, id) {
            if (jsReg.test(id)) {
                if (id.includes(packageRoot) && id.match(/\/index\.(t|j)s/)) {
                    src = await _injectEnvVars(src, id);
                }

                return {
                    code: src,
                    map: null,
                };
            }
        },
    };
}
