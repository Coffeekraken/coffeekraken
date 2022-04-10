import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __SEnv from '@coffeekraken/s-env';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __copy from '@coffeekraken/sugar/node/clipboard/copy';
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
export default function sVitePluginSugar(settings: any = {}) {
    const jsReg = /\.(j|t)s(\?.*)?$/;
    let areEnvVarsInjected = false;
    let config;

    const packageRoot = __packageRootDir();

    async function _injectEnvVars(src, id) {
        // if (areEnvVarsInjected) return src;
        // areEnvVarsInjected = true;

        const c = await __SSugarConfig.load({
            platform: 'browser',
            env: 'development',
        });
        const browserConfig = await c.instance.toObject();

        let envJsonStr = JSON.stringify({
            // @ts-ignore
            ...{
                platform: 'browser',
                env: 'development',
            },
            config: browserConfig,
        });

        envJsonStr = __sanitizeJsonString(envJsonStr);

        const code = [
            `// sugar variables`,
            `if (!window.env) window.env = {SUGAR:{}};`,
            `window.env.SUGAR = JSON.parse(\`${envJsonStr}\`);`,
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
                if (
                    id.includes(packageRoot) &&
                    (id === config.build.rollupOptions?.input ||
                        id === config.build.lib?.entry)
                ) {
                    // build
                    if (config.build.rollupOptions?.input) {
                        if (!config.build.lib) {
                            src = await _injectEnvVars(src, id);
                        }
                    } else {
                        // live dev environment
                        src = await _injectEnvVars(src, id);
                    }
                }

                return {
                    code: src,
                    map: null,
                };
            }
        },
    };
}
