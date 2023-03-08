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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE2QztBQUM3QywrQ0FBb0Q7QUFDcEQseURBQTBEO0FBQzFELHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQixTQUFzQixPQUFPLENBQUMsTUFBTTs7UUFDaEMsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLElBQUEsdUJBQWdCLEdBQUUsaUJBQWlCLENBQUM7UUFDOUUsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNwRSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsZUFBVSxFQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFBLG9CQUFXLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FBQTtBQUxELDBCQUtDO0FBRUQsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0gsSUFBSSxPQUFPOztZQUNQLE9BQU8sTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFDRCxJQUFJLEtBQUs7O1lBQ0wsT0FBTyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILGlCQUFpQixFQUFFO1lBQ2YsV0FBVztZQUNYLFFBQVE7WUFDUixPQUFPO1lBQ1AsT0FBTztZQUNQLFFBQVE7WUFDUixTQUFTO1NBQ1o7UUFFRCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFO29CQUNILEtBQUssRUFB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