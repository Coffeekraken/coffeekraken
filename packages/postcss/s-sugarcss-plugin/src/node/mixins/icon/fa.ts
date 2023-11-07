import __SInterface from '@coffeekraken/s-interface';
import __SRequest from '@coffeekraken/s-request';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __readJsonSync, __writeFileSync } from '@coffeekraken/sugar/fs';
import { __packageCacheDir } from '@coffeekraken/sugar/path';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __fs from 'fs';

let _fontawesomeAvailableIcons;

class SSugarcssPluginIconFaInterface extends __SInterface {
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

export interface ISSugarcssPluginIconFaParams {
    icon: string;
    style: string;
}

export { SSugarcssPluginIconFaInterface as interface };

export default async function ({
    params,
    atRule,
    replaceWith,
    postcssApi,
    sharedData,
    getRoot,
}: {
    params: Partial<ISSugarcssPluginIconFaParams>;
    atRule: any;
    replaceWith: Function;
    postcssApi: any;
    sharedData: any;
    getRoot: Function;
}) {
    const finalParams: ISSugarcssPluginIconFaParams = {
        icon: '',
        style: 'fas',
        ...params,
    };

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
        const fontawesomeUrl = __SSugarConfig.get('icons.fontawesome.url'),
            cacheFilePath = `${__packageCacheDir()}/fontawesome/${fontawesomeUrl
                .replace(/\//gm, '-')
                .replace(/-{2,99}/gm, '-')}.json`;

        // check if we have it in cache
        if (!__fs.existsSync(cacheFilePath)) {
            console.log(
                `<yellow>[fontawesome]</yellow> Fetching the fontawesome css from "<cyan>${fontawesomeUrl}</cyan>"...`,
            );
            const req = new __SRequest({
                url: fontawesomeUrl,
            });
            _fontawesomeAvailableIcons = {};
            const faCss = await req.send();
            const fontawesomeCss = faCss.data ?? '';
            const fontawesomeCssAst = postcssApi.parse(fontawesomeCss);
            fontawesomeCssAst.walkDecls((decl) => {
                if (decl.prop === 'content') {
                    const sels = (decl.parent.selector ?? '').split(',');
                    sels.forEach((sel) => {
                        const name = sel
                            .replace(/^\.fa[a-z]?-/, '')
                            .replace(/:(before|after)$/, '');
                        _fontawesomeAvailableIcons[name] = decl.value;
                    });
                }
            });

            console.log(
                `<green>[fontawesome]</green> Caching the fontawesome css available icons`,
            );
            __writeFileSync(
                cacheFilePath,
                JSON.stringify(_fontawesomeAvailableIcons, null, 4),
            );
        } else {
            _fontawesomeAvailableIcons = __readJsonSync(cacheFilePath);
        }
    }

    if (!_fontawesomeAvailableIcons[finalParams.icon]) {
        console.log(
            __parseHtml(
                `<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`,
            ),
        );
        return;
    }

    sharedData.isFontawesomeNeeded = true;

    const vars: string[] = [];

    const fontNames = {
            fas: 'Free',
            far: 'Free',
            fal: 'Free',
            fad: 'Free',
            fab: 'Brands',
        },
        fontWeight = {
            fas: 900,
            far: 400,
            fal: 300,
            fad: 900,
            fab: 400,
        };

    const fontFamily = `Font Awesome 6 ${__upperFirst(
        fontNames[finalParams.style],
    )}`;

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
    getRoot(atRule).nodes.push(
        sharedData.fontawesomeStyleRules[finalParams.style],
    );

    vars.push(`    
        &:before {
            content: ${_fontawesomeAvailableIcons[finalParams.icon]};
        }
    `);

    // add the parent selector to the sharedData.fontawesomeBaseRule
    atRule.parent?.selectors.forEach((sel) => {
        if (!sharedData.fontawesomeBaseRule.selectors.includes(sel)) {
            sharedData.fontawesomeBaseRule.selector += `, ${sel}`;
        }
        if (
            !sharedData.fontawesomeStyleRules[
                finalParams.style
            ].selectors.includes(sel)
        ) {
            sharedData.fontawesomeStyleRules[
                finalParams.style
            ].selector += `, ${sel}`;
        }
    });

    const ast = postcssApi.parse(vars.join('\n'));

    atRule.replaceWith(ast);
}
