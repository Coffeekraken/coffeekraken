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
import { __deepMerge, __diff } from '@coffeekraken/sugar/object';
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
                        const packageRootDir = __packageRootDir();
                        return {
                            rootDir: `./${__path.relative(packageRootDir, api.config.faviconBuilder.outDir)}`,
                            fileName: api.config.faviconBuilder.outFileName,
                            filePath: `./${__path.relative(packageRootDir, api.config.faviconBuilder.outDir)}/${api.config.faviconBuilder.outFileName}`,
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
                                style: Object.assign(Object.assign({}, __STheme.current.resolveCssObjectPropertiesValues(finalStyle)), __STheme.current.resolveCssObjectPropertiesValues((_e = value.rhythmVertical) !== null && _e !== void 0 ? _e : {})),
                            };
                            if (value.default) {
                                typoObj[finalKey].default = value.default;
                            }
                            if (value.editorStyle) {
                                typoObj[finalKey].editorStyle =
                                    __STheme.current.resolveCssObjectPropertiesValues(value.editorStyle);
                            }
                            if (value.buttonStyle) {
                                typoObj[finalKey].buttonStyle =
                                    __STheme.current.resolveCssObjectPropertiesValues(value.buttonStyle);
                            }
                        }
                        const themes = [];
                        Object.keys(api.config.theme.themes).forEach((name) => {
                            var _a, _b;
                            themes.push({
                                theme: name.split('-')[0],
                                variant: name.split('-')[1],
                                metas: (_a = api.config.theme.themes[name].metas) !== null && _a !== void 0 ? _a : {},
                                config: __diff((_b = api.config.theme.themes[`${api.config.theme.theme}-${api.config.theme.variant}`]) !== null && _b !== void 0 ? _b : {}, api.config.theme.themes[name]),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRTFCLE1BQU0sVUFBZ0IsT0FBTyxDQUFDLE1BQU07O1FBQ2hDLE1BQU0sOEJBQThCLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQztRQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQztZQUFFLE9BQU8sTUFBTSxDQUFDO1FBQ3BFLE1BQU0sSUFBSSxHQUFHLE1BQU0sVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDOUQsT0FBTyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FBQTtBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQ3hDLE9BQU87UUFDSCxJQUFJLE9BQU87O1lBQ1AsT0FBTyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUNELElBQUksS0FBSzs7WUFDTCxPQUFPLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLEVBQUUsQ0FB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