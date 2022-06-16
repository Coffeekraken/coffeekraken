import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
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
            platform: 'browser',
            env: 'development',
            config: browserConfig,
        });

        envJsonStr = __sanitizeJsonString(envJsonStr);

        const code = [
            `// sugar variables`,
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
            `if (!document.env) document.env = {SUGAR:{}};`,
            `document.env.SUGAR = ___deepMerge(JSON.parse(\`${envJsonStr}\`), document.SUGAR ?? {});`,
        ];
        return [code.join('\n'), src].join('\n');
    }

    return {
        name: 's-vite-sugar-plugin',
        configResolved(resolvedConfig) {
            // store the resolved config
            config = resolvedConfig;
        },
        async transform(src, id) {
            if (jsReg.test(id)) {
                // if (
                //     id.includes(packageRoot)
                //     // (id === config.build.rollupOptions?.input ||
                //     //     id === config.build.lib?.entry)
                // ) {
                if (!id.includes('index.ts')) {
                    return {
                        code: src,
                        map: null,
                    };
                }
                if (config.build.rollupOptions?.input) {
                    if (!config.build.lib) {
                        src = await _injectEnvVars(src, id);
                    }
                } else {
                    // live dev environment
                    src = await _injectEnvVars(src, id);
                }
                // }

                return {
                    code: src,
                    map: null,
                };
            }
        },
    };
}
