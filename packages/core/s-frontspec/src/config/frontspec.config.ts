import __STheme from '@coffeekraken/s-theme';
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

        /**
         * @name        removeForFrontend
         * @type        String[]
         * @default     ['frontspec', 'assets', 'views', 'specs', 'margin', 'padding']
         *
         * Specify some sources you want to remove from the frontend js file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        removeForFrontend: [
            'frontspec',
            'assets',
            'views',
            'specs',
            'margin',
            'padding',
        ],

        build: {
            sources: {
                metas: {
                    title: 'Metas',
                    description:
                        'Specify some metas data like the title, description, opengraph, etc...',
                    type: 'config',
                    config: 'metas',
                },
                assets: {
                    title: 'Assets',
                    description:
                        'Specify the assets to load like the css, js, etc...',
                    type: 'config',
                    config: 'assets',
                },
                theme: {
                    title: 'Theme',
                    description: 'Specify the theme used by default',
                    type: 'object',
                    get value() {
                        const themesObj = {};
                        Object.keys(api.config.theme.themes).forEach((name) => {
                            themesObj[name] = {
                                title:
                                    api.config.theme.themes[name].metas
                                        ?.title ?? name,
                                description:
                                    api.config.theme.themes[name].metas
                                        ?.description ?? '',
                            };
                        });

                        return {
                            theme: api.config.theme.theme,
                            variant: api.config.theme.variant,
                            themes: themesObj,
                        };
                    },
                },
                media: {
                    title: 'Media',
                    description:
                        'Specify the responsive specifications like the queries (breakpoints), default action, etc...',
                    type: 'object',
                    get value() {
                        return __STheme.sortMedia(api.theme.media);
                    },
                },
                views: {
                    title: 'Views',
                    description:
                        'Specify the views specifications like where to find them, etc...',
                    type: 'config',
                    config: 'views',
                },
                specs: {
                    title: 'Specs',
                    description:
                        'Specify some specs related specifications like where to find them, etc...',
                    type: 'config',
                    config: 'specs',
                },
                google: {
                    title: 'Google',
                    description:
                        'Specify some google specifications like the GTM/GA to use, etc...',
                    type: 'config',
                    config: 'google',
                },
                margin: {
                    title: 'Margin',
                    description:
                        'Specify the margins available in the project.',
                    type: 'object',
                    get value() {
                        return api.theme.margin;
                    },
                },
                padding: {
                    title: 'Padding',
                    description:
                        'Specify the paddings available in the project.',
                    type: 'object',
                    get value() {
                        return api.theme.padding;
                    },
                },
                lod: {
                    title: 'Lod',
                    description: 'Specify the lod (level of details) settings',
                    type: 'object',
                    get value() {
                        const lodConfig = Object.assign({}, api.theme.lod);
                        delete lodConfig.cssProperties;
                        return lodConfig;
                    },
                },
                partytown: {
                    title: 'Partytown',
                    description:
                        'Specify if the project make uses of "partytown" and his settings',
                    type: 'object',
                    get value() {
                        const partytownConfig = Object.assign(
                            {},
                            api.theme.partytown,
                        );
                        delete partytownConfig.cssProperties;
                        return partytownConfig;
                    },
                },
                // classmap: {
                //     title: 'Classmap',
                //     description: 'Specify the classmap settings',
                //     type: 'object',
                //     get value() {
                //         return {
                //             ...Object.assign({}, api.theme.classmap),
                //             path: `./${__path.relative(
                //                 __packageRootDir(),
                //                 api.config.classmap.path,
                //             )}`,
                //         };
                //     },
                // },
                font: {
                    title: 'Font',
                    description:
                        'Specify the fonts specifications like the font-faces available, sizes, etc...',
                    type: 'object',
                    get value() {
                        return api.theme.font;
                    },
                },
                typo: {
                    title: 'Typo',
                    description:
                        'Specify some typo specifications like which are the available typo classes/tags, etc...',
                    type: 'object',
                    get value() {
                        const finalObj = {};
                        for (let [key, value] of Object.entries(
                            api.theme.typo,
                        )) {
                            const finalStyle = Object.assign(
                                {},
                                value.style ?? {},
                            );
                            for (let [media, mediaObj] of Object.entries(
                                api.theme.media.queries,
                            )) {
                                delete finalStyle[media];
                            }

                            const finalKey = key.split(':')[0];
                            finalObj[finalKey] = {
                                label: value.label ?? finalKey,
                                group: value.group,
                                type: value.type,
                                button: value.button ?? {},
                                editor: value.editor ?? {},
                                style: {
                                    ...__STheme.resolveCssObjectPropertiesValues(
                                        finalStyle,
                                    ),
                                    ...__STheme.resolveCssObjectPropertiesValues(
                                        value.rhythmVertical ?? {},
                                    ),
                                },
                            };

                            if (value.default) {
                                finalObj[finalKey].default = value.default;
                            }

                            if (value.editorStyle) {
                                finalObj[finalKey].editorStyle =
                                    __STheme.resolveCssObjectPropertiesValues(
                                        value.editorStyle,
                                    );
                            }

                            if (value.buttonStyle) {
                                finalObj[finalKey].buttonStyle =
                                    __STheme.resolveCssObjectPropertiesValues(
                                        value.buttonStyle,
                                    );
                            }
                        }
                        return finalObj;
                    },
                },
                layout: {
                    title: 'Layout',
                    description:
                        'Specify some layout specifications like the available containers, layouts and grids.',
                    type: 'object',
                    get value() {
                        return api.theme.layout;
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
