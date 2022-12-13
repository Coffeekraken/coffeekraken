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
                        var _a, _b, _c;
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
                                style: Object.assign(Object.assign({}, __STheme.resolveCssObjectPropertiesValues(finalStyle)), __STheme.resolveCssObjectPropertiesValues((_c = value.rhythmVertical) !== null && _c !== void 0 ? _c : {})),
                            };
                            if (value.default) {
                                finalObj[finalKey].default = value.default;
                            }
                            if (value.editorStyle) {
                                finalObj[finalKey].editorStyle =
                                    __STheme.resolveCssObjectPropertiesValues(value.editorStyle);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixNQUFNLFVBQWdCLE9BQU8sQ0FBQyxNQUFNOztRQUNoQyxNQUFNLDhCQUE4QixHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUM7UUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNwRSxNQUFNLElBQUksR0FBRyxNQUFNLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzlELE9BQU8sV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0gsSUFBSSxPQUFPOztZQUNQLE9BQU8sTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7UUFDRCxJQUFJLEtBQUs7O1lBQ0wsT0FBTyxNQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUVELEtBQUssRUFBRTtZQUNILE9BQU8sRUFB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