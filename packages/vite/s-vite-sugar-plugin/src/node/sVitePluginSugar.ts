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
export default function sVitePluginSugar(settings: any = {}) {
    const jsReg = /\.(j|t)s(\?.*)?$/;
    let areEnvVarsInjected = false;
    let config;

    async function _injectEnvVars(src, id) {
        // if (areEnvVarsInjected) return src;
        // areEnvVarsInjected = true;

        const c = await __SSugarConfig.load({
            id: 'browser',
            platform: 'browser',
            env: __SEnv.get('env'),
            clean: true,
        });
        const browserConfig = await c.instance.toObject();

        let envJsonStr = JSON.stringify({
            // @ts-ignore
            PLATFORM: 'browser',
            ENV: __SEnv.get('env'),
            ENVIRONMENT: __SEnv.get('env'),
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
                if (
                    !id.includes('index.ts') ||
                    id.startsWith(__SSugarConfig.get('storage.src.viewsDir'))
                ) {
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
