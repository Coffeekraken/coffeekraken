import { __readJson } from '@coffeekraken/sugar/fs';
import { __ipAddress } from '@coffeekraken/sugar/network';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';

export async function prepare(config) {
    const potentialFrontspecJsonFilePath = `${__packageRootDir()}/frontspec.json`;
    if (!__fs.existsSync(potentialFrontspecJsonFilePath)) return config;
    const json = await __readJson(potentialFrontspecJsonFilePath);
    return __deepMerge(config, json);
}

export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        get storage() {
            return api.config.storage ?? {};
        },
        get serve() {
            return api.config.serve ?? {};
        },

        build: {
            sources: {
                metas: {
                    type: 'config',
                    config: 'metas',
                },
                assets: {
                    type: 'config',
                    config: 'assets',
                },
                media: {
                    type: 'object',
                    get value() {
                        return api.theme.media;
                    },
                },
                margin: {
                    type: 'object',
                    get value() {
                        return api.theme.margin;
                    },
                },
                padding: {
                    type: 'object',
                    get value() {
                        return api.theme.padding;
                    },
                },
                font: {
                    type: 'object',
                    get value() {
                        return api.theme.font;
                    },
                },
                typo: {
                    type: 'object',
                    get value() {
                        const finalObj = {};
                        for (let [key, value] of Object.entries(
                            api.theme.typo,
                        )) {
                            const finalKey = key.split(':')[0];
                            finalObj[finalKey] = {
                                class: `s-typo:${finalKey}`,
                            };
                        }
                        return finalObj;
                    },
                },
            },
        },

        default: {
            assets: {
                /**
                 * @name      viteClient
                 * @namespace     config.frontspec.default.assets
                 * @type      Object
                 * @default     vite client script
                 *
                 * Specify some items you want to integrate to the head tag. It can be everything you want
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                viteClient: {
                    get src() {
                        return api.env.env === 'development'
                            ? `
            <script>
            document.addEventListener("DOMContentLoaded", function() {
                var $script = document.createElement("script");
                var ip = "${__ipAddress()}";
                $script.setAttribute("type", "module");
                $script.setAttribute("src", "${
                    api.config.vite.server.hostname
                }/@vite/client");
                document.body.appendChild($script);
            });
            </script>
        `
                            : '';
                    },
                },
            },
        },
    };
}
