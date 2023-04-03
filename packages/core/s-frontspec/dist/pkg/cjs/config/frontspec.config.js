"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const fs_1 = require("@coffeekraken/sugar/fs");
const network_1 = require("@coffeekraken/sugar/network");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
function prepare(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const potentialFrontspecJsonFilePath = `${(0, path_1.__packageRootDir)()}/frontspec.json`;
        if (!fs_2.default.existsSync(potentialFrontspecJsonFilePath))
            return config;
        const json = yield (0, fs_1.__readJson)(potentialFrontspecJsonFilePath);
        return (0, object_1.__deepMerge)(config, json);
    });
}
exports.prepare = prepare;
function default_1(api) {
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
        removeForFrontend: ['frontspec', 'assets', 'views', 'specs'],
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
                        const packageRootDir = (0, path_1.__packageRootDir)();
                        return {
                            rootDir: `./${path_2.default.relative(packageRootDir, api.config.faviconBuilder.outDir)}`,
                            filename: api.config.faviconBuilder.outFileName,
                            filePath: `./${path_2.default.relative(packageRootDir, api.config.faviconBuilder.outDir)}/${api.config.faviconBuilder.outFileName}`,
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
                        return s_theme_1.default.sortMedia(api.theme.media);
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
                // spaces: {
                //     title: 'Spaces',
                //     description:
                //         'Specify the spaces (margin, padding) available in the project.',
                //     type: 'object',
                //     get value() {
                //         const result = {},
                //             padding = api.theme.padding,
                //             margin = api.theme.margin;
                //         [
                //             'paddingTop',
                //             'paddingRight',
                //             'paddingBottom',
                //             'paddingLeft',
                //         ].forEach((side) => {
                //             result[side] = {};
                //             Object.keys(padding).forEach((paddingName) => {
                //                 result[side][paddingName] =
                //                     padding[paddingName];
                //             });
                //         });
                //         [
                //             'marginTop',
                //             'marginRight',
                //             'marginBottom',
                //             'marginLeft',
                //         ].forEach((side) => {
                //             result[side] = {};
                //             Object.keys(margin).forEach((marginName) => {
                //                 result[side][marginName] = margin[marginName];
                //             });
                //         });
                //         return result;
                //     },
                // },
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
                            // exclude "gradient" for now...
                            // @TODO        check to add theme back
                            if (key.toLowerCase().includes('gradient')) {
                                continue;
                            }
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
                                style: Object.assign(Object.assign({}, s_theme_1.default.resolveCssObjectPropertiesValues(finalStyle)), s_theme_1.default.resolveCssObjectPropertiesValues((_e = value.rhythmVertical) !== null && _e !== void 0 ? _e : {})),
                            };
                            if (value.default) {
                                finalObj[finalKey].default = value.default;
                            }
                            if (value.editorStyle) {
                                finalObj[finalKey].editorStyle =
                                    s_theme_1.default.resolveCssObjectPropertiesValues(value.editorStyle);
                            }
                            if (value.buttonStyle) {
                                finalObj[finalKey].buttonStyle =
                                    s_theme_1.default.resolveCssObjectPropertiesValues(value.buttonStyle);
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
                var ip = "${(0, network_1.__ipAddress)()}";
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE2QztBQUM3QywrQ0FBb0Q7QUFDcEQseURBQTBEO0FBQzFELHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQixTQUFzQixPQUFPLENBQUMsTUFBTTs7UUFDaEMsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLElBQUEsdUJBQWdCLEdBQUUsaUJBQWlCLENBQUM7UUFDOUUsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNwRSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsZUFBVSxFQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFBLG9CQUFXLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FBQTtBQUxELDBCQUtDO0FBRUQsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0gsSUFBSSxPQUFPOztZQUNQLE9BQU8sTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFDRCxJQUFJLEtBQUs7O1lBQ0wsT0FBTyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILGlCQUFpQixFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO1FBRTVELEtBQUssRUFBRTtZQUNILE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLE9BQU87b0JBQ2QsV0FBVyxF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