import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                style: {
                    type: 'String',
                    values: ['solid'],
                    default: __STheme.config('ui.blockquote.defaultStyle'),
                },
                scope: {
                    type: {
                        type: 'Array<String>',
                        splitChars: [',', ' '],
                    },
                    values: ['bare', 'lnf', 'vr'],
                    default: ['bare', 'lnf', 'vr'],
                },
            })
        );
    }
}

export interface IPostcssSugarPluginUiBlockquoteParams {
    style: 'solid';
    scope: ('bare' | 'lnf' | 'vr')[];
}

export { postcssSugarPluginUiBlockquoteInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBlockquoteParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBlockquoteParams = {
        style: 'solid',
        scope: ['bare', 'lnf', 'vr'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
        `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                if (finalParams.scope.indexOf('bare') !== -1) {
                    vars.push(`
                            display: block;
                            padding-inline: sugar.theme(ui.blockquote.paddingInline);
                            padding-block: sugar.theme(ui.blockquote.paddingBlock);
                    `);
                }
                if (finalParams.scope.indexOf('lnf') !== -1) {
                    vars.push(`
                            border-inline-start: sugar.theme(ui.blockquote.borderWidth) solid sugar.color(current);
                            color: sugar.color(current, surfaceForeground);
                            background-color: sugar.color(current, surface);
                            border-radius: sugar.theme(ui.blockquote.borderRadius);
                            @sugar.depth(sugar.theme(ui.blockquote.depth));
                            font-size: sugar.scalable(1rem);

                            @sugar.font.family(quote);
                    `);
                }
                break;
        }
    }

    return vars;
}
