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
const fs_1 = require("@coffeekraken/sugar/fs");
const network_1 = require("@coffeekraken/sugar/network");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
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
                views: {
                    type: 'config',
                    config: 'views',
                },
                specs: {
                    type: 'config',
                    config: 'specs',
                    // get value() {
                    //     const specsConfig = Object.assign({}, api.config.specs);
                    //     for (let [namespace, paths] of Object.entries(
                    //         specsConfig.namespaces,
                    //     )) {
                    //         specsConfig.namespaces[namespace] = paths.map(
                    //             (path) => {
                    //                 return __path.relative(
                    //                     __packageRootDir(),
                    //                     path,
                    //                 );
                    //             },
                    //         );
                    //     }
                    //     return specsConfig;
                    // },
                },
                google: {
                    type: 'config',
                    config: 'google',
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
                        for (let [key, value] of Object.entries(api.theme.typo)) {
                            const finalKey = key.split(':')[0];
                            finalObj[finalKey] = {
                                class: `s-typo:${finalKey}`,
                            };
                        }
                        return finalObj;
                    },
                },
                layout: {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFvRDtBQUNwRCx5REFBMEQ7QUFDMUQsdURBQXlEO0FBQ3pELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFFdEIsU0FBc0IsT0FBTyxDQUFDLE1BQU07O1FBQ2hDLE1BQU0sOEJBQThCLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLGlCQUFpQixDQUFDO1FBQzlFLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDO1lBQUUsT0FBTyxNQUFNLENBQUM7UUFDcEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLGVBQVUsRUFBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzlELE9BQU8sSUFBQSxvQkFBVyxFQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQUE7QUFMRCwwQkFLQztBQUVELG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTztRQUNILElBQUksT0FBTzs7WUFDUCxPQUFPLE1BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsSUFBSSxLQUFLOztZQUNMLE9BQU8sTUFBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFFRCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFO29CQUNILElBQUksRUFBRSxRQUFRO29CQUNkLE1BQU0sRUFBRSxPQUFPO2lCQUNsQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsTUFBTSxFQUFFLFFBQVE7aUJBQ25CO2dCQUNELEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEtBQUs7d0JBQ0wsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDM0IsQ0FBQztpQkFDSjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsTUFBTSxFQUFFLE9BQU87aUJBQ2xCO2dCQUNELEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxNQUFNLEVBQUUsT0FBTztvQkFDZixnQkFBZ0I7b0JBQ2hCLCtEQUErRDtvQkFDL0QscURBQXFEO29CQUNyRCxrQ0FBa0M7b0JBQ2xDLFdBQVc7b0JBQ1gseURBQXlEO29CQUN6RCwwQkFBMEI7b0JBQzFCLDBDQUEwQztvQkFDMUMsMENBQTBDO29CQUMxQyw0QkFBNEI7b0JBQzVCLHFCQUFxQjtvQkFDckIsaUJBQWlCO29CQUNqQixhQUFhO29CQUNiLFFBQVE7b0JBQ1IsMEJBQTBCO29CQUMxQixLQUFLO2lCQUNSO2dCQUNELE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxNQUFNLEVBQUUsUUFBUTtpQkFDbkI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksS0FBSzt3QkFDTCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUM1QixDQUFDO2lCQUNKO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEtBQUs7d0JBQ0wsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDN0IsQ0FBQztpQkFDSjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxLQUFLO3dCQUNMLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQzFCLENBQUM7aUJBQ0o7Z0JBQ0QsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksS0FBSzt3QkFDTCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNuQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDakIsRUFBRTs0QkFDQyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNuQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUc7Z0NBQ2pCLEtBQUssRUFBRSxVQUFVLFFBQVEsRUFBRTs2QkFDOUIsQ0FBQzt5QkFDTDt3QkFDRCxPQUFPLFFBQVEsQ0FBQztvQkFDcEIsQ0FBQztpQkFDSjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxLQUFLO3dCQUNMLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQzVCLENBQUM7aUJBQ0o7YUFDSjtTQUNKO1FBRUQsT0FBTyxFQUFFO1lBQ0wsTUFBTSxFQUFFO2dCQUNKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFVBQVUsRUFBRTtvQkFDUixJQUFJLEdBQUc7d0JBQ0gsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxhQUFhOzRCQUNoQyxDQUFDLENBQUM7Ozs7NEJBSUYsSUFBQSxxQkFBVyxHQUFFOzsrQ0FHckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQzNCOzs7O1NBSVA7NEJBQ21CLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ2IsQ0FBQztpQkFDSjthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQW5JRCw0QkFtSUMifQ==