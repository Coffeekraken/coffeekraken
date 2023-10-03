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
                package: {
                    title: 'Package',
                    description: 'Specify some info about the package from the package.json',
                    type: 'object',
                    get value() {
                        return {
                            name: api.config.package.json.name,
                            description: api.config.package.json.description,
                            version: api.config.package.json.version,
                            author: api.config.package.json.author,
                            license: api.config.package.json.license,
                        };
                    },
                },
                favicon: {
                    title: 'Favicon',
                    description: 'Specify where to find the favicon html file',
                    type: 'object',
                    get value() {
                        const packageRootDir = (0, path_1.__packageRootDir)();
                        return {
                            rootDir: `./${path_2.default.relative(packageRootDir, api.config.faviconBuilder.outDir)}`,
                            fileName: api.config.faviconBuilder.outFileName,
                            filePath: `./${path_2.default.relative(packageRootDir, api.config.faviconBuilder.outDir)}/${api.config.faviconBuilder.outFileName}`,
                        };
                    },
                },
                theme: {
                    title: 'Theme',
                    description: 'Specify the theme used by default',
                    type: 'object',
                    get value() {
                        var _a, _b, _c, _d, _e;
                        const typoObj = {};
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
                            typoObj[finalKey] = {
                                label: (_b = value.label) !== null && _b !== void 0 ? _b : finalKey,
                                group: value.group,
                                type: value.type,
                                button: (_c = value.button) !== null && _c !== void 0 ? _c : {},
                                editor: (_d = value.editor) !== null && _d !== void 0 ? _d : {},
                                style: Object.assign(Object.assign({}, s_theme_1.default.resolveCssObjectPropertiesValues(finalStyle)), s_theme_1.default.resolveCssObjectPropertiesValues((_e = value.rhythmVertical) !== null && _e !== void 0 ? _e : {})),
                            };
                            if (value.default) {
                                typoObj[finalKey].default = value.default;
                            }
                            if (value.editorStyle) {
                                typoObj[finalKey].editorStyle =
                                    s_theme_1.default.resolveCssObjectPropertiesValues(value.editorStyle);
                            }
                            if (value.buttonStyle) {
                                typoObj[finalKey].buttonStyle =
                                    s_theme_1.default.resolveCssObjectPropertiesValues(value.buttonStyle);
                            }
                        }
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