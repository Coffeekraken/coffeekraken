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
                selector: '.s-icon--s',
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
                selector: '.s-icon--s',
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