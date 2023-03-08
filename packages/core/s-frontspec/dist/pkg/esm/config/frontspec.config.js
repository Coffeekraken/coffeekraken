var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __STheme from '@coffeekraken/s-theme';
import { __readJson } from '@coffeekraken/sugar/fs';
import { __ipAddress } from '@coffeekraken/sugar/network';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
export function prepare(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const potentialFrontspecJsonFilePath = `${__packageRootDir()}/frontspec.json`;
        if (!__fs.existsSync(potentialFrontspecJsonFilePath))
            return config;
        const json = yield __readJson(potentialFrontspecJsonFilePath);
        return __deepMerge(config, json);
    });
}
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        get storage() {
            var _a;
            return (_a = api.config.storage) !== null && _a !== void 0 ? _a : {};
        },
        get serve() {
            var _a;
            return (_a = api.config.serve) !== null && _a !== void 0 ? _a : {};
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
                    description: 'Specify some metas data like the title, description, opengraph, etc...',
                    type: 'config',
                    config: 'metas',
                },
                assets: {
                    title: 'Assets',
                    description: 'Specify the assets to load like the css, js, etc...',
                    type: 'config',
                    config: 'assets',
                },
                favicon: {
                    title: 'Favicon',
                    description: 'Specify where to find the favicon html file',
                    type: 'object',
                    get value() {
                        const packageRootDir = __packageRootDir();
                        return {
                            rootDir: `./${__path.relative(packageRootDir, api.config.faviconBuilder.outDir)}`,
                            filename: api.config.faviconBuilder.outFileName,
                            filePath: `./${__path.relative(packageRootDir, api.config.faviconBuilder.outDir)}/${api.config.faviconBuilder.outFileName}`,
                        };
                    },
                },
                theme: {
                    title: 'Theme',
                    description: 'Specify the theme used by default',
                    type: 'object',
                    get value() {
                        const themesObj = {};
                        Object.keys(api.config.theme.themes).forEach((name) => {
                            var _a, _b, _c, _d;
                            themesObj[name] = {
                                title: (_b = (_a = api.config.theme.themes[name].metas) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : name,
                                description: (_d = (_c = api.config.theme.themes[name].metas) === null || _c === void 0 ? void 0 : _c.description) !== null && _d !== void 0 ? _d : '',
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
                    description: 'Specify the responsive specifications like the queries (breakpoints), default action, etc...',
                    type: 'object',
                    get value() {
                        return __STheme.sortMedia(api.theme.media);
                    },
                },
                views: {
                    title: 'Views',
                    description: 'Specify the views specifications like where to find them, etc...',
                    type: 'config',
                    config: 'views',
                },
                specs: {
                    title: 'Specs',
                    description: 'Specify some specs related specifications like where to find them, etc...',
                    type: 'config',
                    config: 'specs',
                },
                google: {
                    title: 'Google',
                    description: 'Specify some google specifications like the GTM/GA to use, etc...',
                    type: 'config',
                    config: 'google',
                },
                margin: {
                    title: 'Margin',
                    description: 'Specify the margins available in the project.',
                    type: 'object',
                    get value() {
                        return api.theme.margin;
                    },
                },
                padding: {
                    title: 'Padding',
                    description: 'Specify the paddings available in the project.',
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
                    description: 'Specify if the project make uses of "partytown" and his settings',
                    type: 'object',
                    get value() {
                        const partytownConfig = Object.assign({}, api.theme.partytown);
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
                    description: 'Specify the fonts specifications like the font-faces available, sizes, etc...',
                    type: 'object',
                    get value() {
                        return api.theme.font;
                    },
                },
                typo: {
                    title: 'Typo',
                    description: 'Specify some typo specifications like which are the available typo classes/tags, etc...',
                    type: 'object',
                    get value() {
                        var _a, _b, _c, _d, _e;
                        const finalObj = {};
                        for (let [key, value] of Object.entries(api.theme.typo)) {
                            const finalStyle = Object.assign({}, (_a = value.style) !== null && _a !== void 0 ? _a : {});
                            for (let [media, mediaObj] of Object.entries(api.theme.media.queries)) {
                                delete finalStyle[media];
                            }
                            const finalKey = key.split(':')[0];
                            finalObj[finalKey] = {
                                label: (_b = value.label) !== null && _b !== void 0 ? _b : finalKey,
                                group: value.group,
                                type: value.type,
                                button: (_c = value.button) !== null && _c !== void 0 ? _c : {},
                                editor: (_d = value.editor) !== null && _d !== void 0 ? _d : {},
                                style: Object.assign(Object.assign({}, __STheme.resolveCssObjectPropertiesValues(finalStyle)), __STheme.resolveCssObjectPropertiesValues((_e = value.rhythmVertical) !== null && _e !== void 0 ? _e : {})),
                            };
                            if (value.default) {
                                finalObj[finalKey].default = value.default;
                            }
                            if (value.editorStyle) {
                                finalObj[finalKey].editorStyle =
                                    __STheme.resolveCssObjectPropertiesValues(value.editorStyle);
                            }
                            if (value.buttonStyle) {
                                finalObj[finalKey].buttonStyle =
                                    __STheme.resolveCssObjectPropertiesValues(value.buttonStyle);
                            }
                        }
                        return finalObj;
                    },
                },
                layout: {
                    title: 'Layout',
                    description: 'Specify some layout specifications like the available containers, layouts and grids.',
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
                $script.setAttribute("src", "${api.config.vite.server.hostname}/@vite/client");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsTUFBTSxVQUFnQixPQUFPLENBQUMsTUFBTTs7UUFDaEMsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDO1lBQUUsT0FBTyxNQUFNLENBQUM7UUFDcEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM5RCxPQUFPLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTztRQUNILElBQUksT0FBTzs7WUFDUCxPQUFPLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsSUFBSSxLQUFLOztZQUNMLE9BQU8sTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDO1FBQ2xDLENB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