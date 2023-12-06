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
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                        return {
                            name: (_b = (_a = api.config.package) === null || _a === void 0 ? void 0 : _a.json) === null || _b === void 0 ? void 0 : _b.name,
                            description: (_d = (_c = api.config.package) === null || _c === void 0 ? void 0 : _c.json) === null || _d === void 0 ? void 0 : _d.description,
                            version: (_f = (_e = api.config.package) === null || _e === void 0 ? void 0 : _e.json) === null || _f === void 0 ? void 0 : _f.version,
                            author: (_h = (_g = api.config.package) === null || _g === void 0 ? void 0 : _g.json) === null || _h === void 0 ? void 0 : _h.author,
                            license: (_k = (_j = api.config.package) === null || _j === void 0 ? void 0 : _j.json) === null || _k === void 0 ? void 0 : _k.license,
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
                                style: Object.assign(Object.assign({}, s_theme_1.default.current.resolveCssObjectPropertiesValues(finalStyle)), s_theme_1.default.current.resolveCssObjectPropertiesValues((_e = value.rhythmVertical) !== null && _e !== void 0 ? _e : {})),
                            };
                            if (value.default) {
                                typoObj[finalKey].default = value.default;
                            }
                            if (value.editorStyle) {
                                typoObj[finalKey].editorStyle =
                                    s_theme_1.default.current.resolveCssObjectPropertiesValues(value.editorStyle);
                            }
                            if (value.buttonStyle) {
                                typoObj[finalKey].buttonStyle =
                                    s_theme_1.default.current.resolveCssObjectPropertiesValues(value.buttonStyle);
                            }
                        }
                        const themes = [];
                        Object.keys(api.config.theme.themes).forEach((name) => {
                            var _a, _b;
                            themes.push({
                                theme: name.split('-')[0],
                                variant: name.split('-')[1],
                                metas: (_a = api.config.theme.themes[name].metas) !== null && _a !== void 0 ? _a : {},
                                config: (0, object_1.__diff)((_b = api.config.theme.themes[`${api.config.theme.theme}-${api.config.theme.variant}`]) !== null && _b !== void 0 ? _b : {}, api.config.theme.themes[name]),
                            });
                            delete themes.at(-1).config.metas;
                        });
                        return {
                            theme: api.config.theme.theme,
                            variant: api.config.theme.variant,
                            config: api.config.theme.themes[`${api.config.theme.theme}-${api.config.theme.variant}`],
                            themes,
                        };
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
                partytown: {
                    title: 'Partytown',
                    description: 'Specify if the project make uses of "partytown" and his settings',
                    type: 'object',
                    get value() {
                        const partytownConfig = Object.assign({}, api.config.partytown);
                        delete partytownConfig.cssProperties;
                        return partytownConfig;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9FQUE2QztBQUM3QywrQ0FBb0Q7QUFDcEQseURBQTBEO0FBQzFELHVEQUFpRTtBQUNqRSxtREFBNEQ7QUFDNUQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQixTQUFzQixPQUFPLENBQUMsTUFBTTs7UUFDaEMsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLElBQUEsdUJBQWdCLEdBQUUsaUJBQWlCLENBQUM7UUFDOUUsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNwRSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsZUFBVSxFQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDOUQsT0FBTyxJQUFBLG9CQUFXLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FBQTtBQUxELDBCQUtDO0FBRUQsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0gsSUFBSSxPQUFPOztZQUNQLE9BQU8sTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFDRCxJQUFJLEtBQUs7O1lBQ0wsT0FBTyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILGlCQUFpQixFQUFFLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO1FBRTVELEtBQUssRUFBRTtZQUNILE9BQU8sRUFBRTtnQkFDTCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLE9BQU87b0JBQ2QsV0FBVyxF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