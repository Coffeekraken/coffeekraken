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
function default_1({ params, atRule, replaceWith, postcssApi, sharedData, }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const finalParams = Object.assign({ icon: '', style: 'fas' }, params);
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
        vars.push(`
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    font-family: "Font Awesome 6 ${(0, string_1.__upperFirst)(fontNames[finalParams.style])}";
    font-weight: ${fontWeight[finalParams.style]};
    
    &:before {
      content: ${_fontawesomeAvailableIcons[finalParams.icon]};
      display: inline-block;
    }
  `);
        const ast = postcssApi.parse(vars.join('\n'));
        ast.walkRules((rule) => {
            rule._preventLod = true;
        });
        atRule.replaceWith(ast);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELHlEQUEwRDtBQUMxRCwrQ0FBeUU7QUFDekUsbURBQTZEO0FBQzdELHVEQUEwRDtBQUMxRCw0Q0FBc0I7QUFFdEIsSUFBSSwwQkFBMEIsQ0FBQztBQUUvQixNQUFNLGlDQUFrQyxTQUFRLHFCQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU82QyxzREFBUztBQUV2RCxtQkFBK0IsRUFDM0IsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxFQUNWLFVBQVUsR0FPYjs7O1FBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsS0FBSyxFQUFFLEtBQUssSUFDVCxNQUFNLENBQ1osQ0FBQztRQUVGLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDNUIsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDN0I7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFO1lBQzdCLE1BQU0sY0FBYyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLEVBQzlELGFBQWEsR0FBRyxHQUFHLElBQUEsd0JBQWlCLEdB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