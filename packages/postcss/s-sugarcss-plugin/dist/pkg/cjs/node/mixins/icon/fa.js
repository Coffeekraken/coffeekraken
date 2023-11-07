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
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_request_1 = __importDefault(require("@coffeekraken/s-request"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const console_1 = require("@coffeekraken/sugar/console");
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const string_1 = require("@coffeekraken/sugar/string");
const fs_2 = __importDefault(require("fs"));
let _fontawesomeAvailableIcons;
class SSugarcssPluginIconFaInterface extends s_interface_1.default {
    static get _definition() {
        return {
            icon: {
                type: 'String',
                required: true,
            },
            style: {
                type: 'String',
                values: ['fa', 'fas', 'far', 'fab', 'fal', 'fad'],
                default: 'fas',
            },
        };
    }
}
exports.interface = SSugarcssPluginIconFaInterface;
function default_1({ params, atRule, replaceWith, postcssApi, sharedData, getRoot, }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const finalParams = Object.assign({ icon: '', style: 'fas' }, params);
        if (!sharedData.fontawesomeBaseRule) {
            sharedData.fontawesomeBaseRule = postcssApi.rule({
                selector: '.s-icon-s',
                nodes: postcssApi.parse(`
                -webkit-font-smoothing: antialiased;
                display: inline-block;
                font-style: normal;
                font-variant: normal;
                text-rendering: auto;
                line-height: 1;

                &:before {
                    display: inline-block;
                }
            `).nodes,
            });
        }
        getRoot(atRule).append(sharedData.fontawesomeBaseRule);
        if (finalParams.style === 'fa') {
            finalParams.style = 'fas';
        }
        // fetch the fontawesome css if needed
        if (!_fontawesomeAvailableIcons) {
            const fontawesomeUrl = s_sugar_config_1.default.get('icons.fontawesome.url'), cacheFilePath = `${(0, path_1.__packageCacheDir)()}/fontawesome/${fontawesomeUrl
                .replace(/\//gm, '-')
                .replace(/-{2,99}/gm, '-')}.json`;
            // check if we have it in cache
            if (!fs_2.default.existsSync(cacheFilePath)) {
                console.log(`<yellow>[fontawesome]</yellow> Fetching the fontawesome css from "<cyan>${fontawesomeUrl}</cyan>"...`);
                const req = new s_request_1.default({
                    url: fontawesomeUrl,
                });
                _fontawesomeAvailableIcons = {};
                const faCss = yield req.send();
                const fontawesomeCss = (_a = faCss.data) !== null && _a !== void 0 ? _a : '';
                const fontawesomeCssAst = postcssApi.parse(fontawesomeCss);
                fontawesomeCssAst.walkDecls((decl) => {
                    var _a;
                    if (decl.prop === 'content') {
                        const sels = ((_a = decl.parent.selector) !== null && _a !== void 0 ? _a : '').split(',');
                        sels.forEach((sel) => {
                            const name = sel
                                .replace(/^\.fa[a-z]?-/, '')
                                .replace(/:(before|after)$/, '');
                            _fontawesomeAvailableIcons[name] = decl.value;
                        });
                    }
                });
                console.log(`<green>[fontawesome]</green> Caching the fontawesome css available icons`);
                (0, fs_1.__writeFileSync)(cacheFilePath, JSON.stringify(_fontawesomeAvailableIcons, null, 4));
            }
            else {
                _fontawesomeAvailableIcons = (0, fs_1.__readJsonSync)(cacheFilePath);
            }
        }
        if (!_fontawesomeAvailableIcons[finalParams.icon]) {
            console.log((0, console_1.__parseHtml)(`<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`));
            return;
        }
        sharedData.isFontawesomeNeeded = true;
        const vars = [];
        const fontNames = {
            fas: 'Free',
            far: 'Free',
            fal: 'Free',
            fad: 'Free',
            fab: 'Brands',
        }, fontWeight = {
            fas: 900,
            far: 400,
            fal: 300,
            fad: 900,
            fab: 400,
        };
        const fontFamily = `Font Awesome 6 ${(0, string_1.__upperFirst)(fontNames[finalParams.style])}`;
        if (!sharedData.fontawesomeStyleRules) {
            sharedData.fontawesomeStyleRules = {};
        }
        if (!sharedData.fontawesomeStyleRules[finalParams.style]) {
            sharedData.fontawesomeStyleRules[finalParams.style] = postcssApi.rule({
                selector: '.s-icon-s',
                nodes: postcssApi.parse(`
                font-family: "${fontFamily}";
                font-weight: ${fontWeight[finalParams.style]};
            `).nodes,
            });
        }
        getRoot(atRule).nodes.push(sharedData.fontawesomeStyleRules[finalParams.style]);
        vars.push(`    
        &:before {
            content: ${_fontawesomeAvailableIcons[finalParams.icon]};
        }
    `);
        // add the parent selector to the sharedData.fontawesomeBaseRule
        (_b = atRule.parent) === null || _b === void 0 ? void 0 : _b.selectors.forEach((sel) => {
            if (!sharedData.fontawesomeBaseRule.selectors.includes(sel)) {
                sharedData.fontawesomeBaseRule.selector += `, ${sel}`;
            }
            if (!sharedData.fontawesomeStyleRules[finalParams.style].selectors.includes(sel)) {
                sharedData.fontawesomeStyleRules[finalParams.style].selector += `, ${sel}`;
            }
        });
        const ast = postcssApi.parse(vars.join('\n'));
        atRule.replaceWith(ast);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELHlEQUEwRDtBQUMxRCwrQ0FBeUU7QUFDekUsbURBQTZEO0FBQzdELHVEQUEwRDtBQUMxRCw0Q0FBc0I7QUFFdEIsSUFBSSwwQkFBMEIsQ0FBQztBQUUvQixNQUFNLDhCQUErQixTQUFRLHFCQUFZO0lBQ3JELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU8wQyxtREFBUztBQUVwRCxtQkFBK0IsRUFDM0IsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLFVBQVUsRUFDVixPQUFPLEdBUVY7OztRQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxLQUFLLElBQ1QsTUFBTSxDQUNaLENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFO1lBQ2pDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUM3QyxRQUFRLEVBQUUsV0FBVztnQkFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7Ozs7O2FBV3ZCLENBQUMsQ0FBQyxLQUFLO2FBQ1gsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRXZELElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDNUIsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDN0I7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFO1lBQzdCLE1BQU0sY0FBYyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQzlELGFBQWEsR0FBRyxHQUFHLElBQUEsd0JBQWlCLEdBQUUsZ0JBQWdCLGNBQWM7aUJBQy9ELE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2lCQUNwQixPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFFMUMsK0JBQStCO1lBQy9CLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUNQLDJFQUEyRSxjQUFjLGFBQWEsQ0FDekcsQ0FBQztnQkFDRixNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFVLENBQUM7b0JBQ3ZCLEdBQUcsRUFBRSxjQUFjO2lCQUN0QixDQUFDLENBQUM7Z0JBQ0gsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO2dCQUNoQyxNQUFNLEtBQUssR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxjQUFjLEdBQUcsTUFBQSxLQUFLLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUM7Z0JBQ3hDLE1BQU0saUJBQWlCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDM0QsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O29CQUNqQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO3dCQUN6QixNQUFNLElBQUksR0FBRyxDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUNqQixNQUFNLElBQUksR0FBRyxHQUFHO2lDQUNYLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDO2lDQUMzQixPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ3JDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7d0JBQ2xELENBQUMsQ0FBQyxDQUFDO3FCQUNOO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILE9BQU8sQ0FBQyxHQUFHLENBQ1AsMEVBQTBFLENBQzdFLENBQUM7Z0JBQ0YsSUFBQSxvQkFBZSxFQUNYLGFBQWEsRUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDdEQsQ0FBQzthQUNMO2lCQUFNO2dCQUNILDBCQUEwQixHQUFHLElBQUEsbUJBQWMsRUFBQyxhQUFhLENBQUMsQ0FBQzthQUM5RDtTQUNKO1FBRUQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQyxPQUFPLENBQUMsR0FBRyxDQUNQLElBQUEscUJBQVcsRUFDUCwyRUFBMkUsV0FBVyxDQUFDLElBQUksZ0JBQWdCLENBQzlHLENBQ0osQ0FBQztZQUNGLE9BQU87U0FDVjtRQUVELFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFFdEMsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1FBRTFCLE1BQU0sU0FBUyxHQUFHO1lBQ1YsR0FBRyxFQUFFLE1BQU07WUFDWCxHQUFHLEVBQUUsTUFBTTtZQUNYLEdBQUcsRUFBRSxNQUFNO1lBQ1gsR0FBRyxFQUFFLE1BQU07WUFDWCxHQUFHLEVBQUUsUUFBUTtTQUNoQixFQUNELFVBQVUsR0FBRztZQUNULEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7WUFDUixHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxHQUFHO1lBQ1IsR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFDO1FBRU4sTUFBTSxVQUFVLEdBQUcsa0JBQWtCLElBQUEscUJBQVksRUFDN0MsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FDL0IsRUFBRSxDQUFDO1FBRUosSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRTtZQUNuQyxVQUFVLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEQsVUFBVSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNsRSxRQUFRLEVBQUUsV0FBVztnQkFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUM7Z0NBQ0osVUFBVTsrQkFDWCxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzthQUMvQyxDQUFDLENBQUMsS0FBSzthQUNYLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ3RCLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQ3RELENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDOzt1QkFFUywwQkFBMEIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDOztLQUU5RCxDQUFDLENBQUM7UUFFSCxnRUFBZ0U7UUFDaEUsTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6RCxVQUFVLENBQUMsbUJBQW1CLENBQUMsUUFBUSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDekQ7WUFDRCxJQUNJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUM3QixXQUFXLENBQUMsS0FBSyxDQUNwQixDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQzNCO2dCQUNFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FDNUIsV0FBVyxDQUFDLEtBQUssQ0FDcEIsQ0FBQyxRQUFRLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzthQUM1QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFOUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Q0FDM0I7QUFoS0QsNEJBZ0tDIn0=