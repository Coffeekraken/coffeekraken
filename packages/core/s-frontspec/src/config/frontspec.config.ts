import __STheme from '@coffeekraken/s-theme';
import { __readJson } from '@coffeekraken/sugar/fs';
import { __ipAddress } from '@coffeekraken/sugar/network';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';

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
        removeForFrontend: ['frontspec', 'assets', 'views', 'specs'],

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
                package: {
                    title: 'Package',
                    description:
                        'Specify some info about the package from the package.json',
                    type: 'object',
                    get value() {
                        return {
                            name: api.config.package?.json?.name,
                            description: api.config.package?.json?.description,
                            version: api.config.package?.json?.version,
                            author: api.config.package?.json?.author,
                            license: api.config.package?.json?.license,
                        };
                    },
                },
                favicon: {
                    title: 'Favicon',
                    description: 'Specify where to find the favicon html file',
                    type: 'object',
                    get value() {
                        const packageRootDir = __packageRootDir();

                        return {
                            rootDir: `./${__path.relative(
                                packageRootDir,
                                api.config.faviconBuilder.outDir,
                            )}`,
                            fileName: api.config.faviconBuilder.outFileName,
                            filePath: `./${__path.relative(
                                packageRootDir,
                                api.config.faviconBuilder.outDir,
                            )}/${api.config.faviconBuilder.outFileName}`,
                        };
                    },
                },
                theme: {
                    title: 'Theme',
                    description: 'Specify the theme used by default',
                    type: 'object',
                    get value() {
                        const typoObj = {};
                        for (let [key, value] of Object.entries(
                            api.theme.typo,
                        )) {
                            // exclude "gradient" for now...
                            // @TODO        check to add theme back
                            if (key.toLowerCase().includes('gradient')) {
                                continue;
                            }

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
                            typoObj[finalKey] = {
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
                                typoObj[finalKey].default = value.default;
                            }

                            if (value.editorStyle) {
                                typoObj[finalKey].editorStyle =
                                    __STheme.resolveCssObjectPropertiesValues(
                                        value.editorStyle,
                                    );
                            }

                            if (value.buttonStyle) {
                                typoObj[finalKey].buttonStyle =
                                    __STheme.resolveCssObjectPropertiesValues(
                                        value.buttonStyle,
                                    );
                            }
                        }

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
                            lnf: {
                                margin: api.theme.margin,
                                padding: api.theme.padding,
                                font: api.theme.font,
                                layout: api.theme.layout,
                                typo: typoObj,
                            },
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
                // lod: {
                //     title: 'Lod',
                //     description: 'Specify the lod (level of details) settings',
                //     type: 'object',
                //     get value() {
                //         const lodConfig = Object.assign({}, api.theme.lod);
                //         delete lodConfig.cssProperties;
                //         return lodConfig;
                //     },
                // },
                // partytown: {
                //     title: 'Partytown',
                //     description:
                //         'Specify if the project make uses of "partytown" and his settings',
                //     type: 'object',
                //     get value() {
                //         const partytownConfig = Object.assign(
                //             {},
                //             api.theme.partytown,
                //         );
                //         delete partytownConfig.cssProperties;
                //         return partytownConfig;
                //     },
                // },
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
