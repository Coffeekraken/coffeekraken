var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SInterface from '@coffeekraken/s-interface';
import __SRequest from '@coffeekraken/s-request';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __readJsonSync, __writeFileSync } from '@coffeekraken/sugar/fs';
import { __packageCacheDir } from '@coffeekraken/sugar/path';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __fs from 'fs';
let _fontawesomeAvailableIcons;
class postcssSugarPluginIconFaInterface extends __SInterface {
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
export { postcssSugarPluginIconFaInterface as interface };
export default function ({ params, atRule, replaceWith, postcssApi, sharedData, getRoot, }) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const finalParams = Object.assign({ icon: '', style: 'fas' }, params);
        if (!sharedData.fontawesomeBaseRule) {
            sharedData.fontawesomeBaseRule = postcssApi.rule({
                selector: '',
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
            const fontawesomeUrl = __SSugarConfig.get('icons.fontawesome.url'), cacheFilePath = `${__packageCacheDir()}/fontawesome/${fontawesomeUrl
                .replace(/\//gm, '-')
                .replace(/-{2,99}/gm, '-')}.json`;
            // check if we have it in cache
            if (!__fs.existsSync(cacheFilePath)) {
                console.log(`<yellow>[fontawesome]</yellow> Fetching the fontawesome css from "<cyan>${fontawesomeUrl}</cyan>"...`);
                const req = new __SRequest({
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
                __writeFileSync(cacheFilePath, JSON.stringify(_fontawesomeAvailableIcons, null, 4));
            }
            else {
                _fontawesomeAvailableIcons = __readJsonSync(cacheFilePath);
            }
        }
        if (!_fontawesomeAvailableIcons[finalParams.icon]) {
            console.log(__parseHtml(`<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`));
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
        const fontFamily = `Font Awesome 6 ${__upperFirst(fontNames[finalParams.style])}`;
        if (!sharedData.fontawesomeStyleRules) {
            sharedData.fontawesomeStyleRules = {};
        }
        if (!sharedData.fontawesomeStyleRules[finalParams.style]) {
            sharedData.fontawesomeStyleRules[finalParams.style] = postcssApi.rule({
                selector: '',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsSUFBSSwwQkFBMEIsQ0FBQztBQUUvQixNQUFNLGlDQUFrQyxTQUFRLFlBQVk7SUFDeEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztnQkFDakQsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQWlCLEVBQzNCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixVQUFVLEVBQ1YsT0FBTyxHQVFWOzs7UUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFF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