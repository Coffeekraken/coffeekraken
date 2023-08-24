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
class postcssSugarPluginIconFaInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginIconFaInterface;
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
            getRoot(atRule).nodes.push(sharedData.fontawesomeBaseRule);
        }
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
            getRoot(atRule).nodes.push(sharedData.fontawesomeStyleRules[finalParams.style]);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELHlEQUEwRDtBQUMxRCwrQ0FBeUU7QUFDekUsbURBQTZEO0FBQzdELHVEQUEwRDtBQUMxRCw0Q0FBc0I7QUFFdEIsSUFBSSwwQkFBMEIsQ0FBQztBQUUvQixNQUFNLGlDQUFrQyxTQUFRLHFCQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU82QyxzREFBUztBQUV2RCxtQkFBK0IsRUFDM0IsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLFVBQVUsRUFDVixPQUFPLEdBUVY7OztRQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxLQUFLLElBQ1QsTUFBTSxDQUNaLENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFO1lBQ2pDLFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUM3QyxRQUFRLEVBQUUsV0FBVztnQkFDckIsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7Ozs7O2FBV3ZCLENBQUMsQ0FBQyxLQUFLO2FBQ1gsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxD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