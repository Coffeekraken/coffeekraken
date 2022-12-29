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

export interface IPostcssSugarPluginIconFaParams {
    icon: string;
    style: string;
}

export { postcssSugarPluginIconFaInterface as interface };

export default async function ({
    params,
    atRule,
    replaceWith,
    postcssApi,
    sharedData,
}: {
    params: Partial<IPostcssSugarPluginIconFaParams>;
    atRule: any;
    replaceWith: Function;
    postcssApi: any;
    sharedData: any;
}) {
    const finalParams: IPostcssSugarPluginIconFaParams = {
        icon: '',
        style: 'fas',
        ...params,
    };

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

    vars.push(`
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    font-family: "Font Awesome 6 ${__upperFirst(fontNames[finalParams.style])}";
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
}
