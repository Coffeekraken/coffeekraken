import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiBadgeInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['default', 'outline'],
            default: 'default',
        },
        shape: {
            type: 'String',
            values: ['default', 'square', 'pill'],
            default: 'default',
        },
        scope: {
            type: {
                type: 'Array<String>',
                splitChars: [',', ' '],
            },
            values: ['bare', 'lnf', 'shape'],
            default: ['bare', 'lnf', 'shape'],
        },
    };
}

export interface IPostcssSugarPluginUiBadgeParams {
    style: 'solid' | 'outline';
    shape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape')[];
}

export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiBadgeParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiBadgeParams = {
        style: __STheme.config('ui.button.defaultStyle') ?? 'solid',
        shape: 'default',
        scope: ['bare', 'lnf', 'shape'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`   
        display: inline-block;
        white-space: nowrap;
    `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            font-size: sugar.scalable(0.75em);
            padding-inline: sugar.theme(ui.badge.paddingInline);
            padding-block: sugar.theme(ui.badge.paddingBlock);
            vertical-align: baseline;

            & > * {
                @sugar.color(main);
            }

        `);

        switch (finalParams.style) {
            case 'outline':
                vars.push(`
                position: relative;
                color: sugar.color(current);
                background: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: sugar.color(current) solid sugar.theme(ui.badge.borderWidth);
                    pointer-events: none;
                }
            `);
            case 'solid':
            default:
                vars.push(`
                     color: sugar.color(current, foreground);
                     background-color: sugar.color(current);
                     text-shadow: 0 0 3px sugar.color(current, --darken 10);
                `);
                break;
        }
    }

    if (finalParams.scope.indexOf('shape') !== -1) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                    &:after {
                        border-radius: 0;
                    }
            `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 999999px;
                    &:after {
                        border-radius: 999999px;
                    }
                `);
                break;
            case 'default':
            default:
                vars.push(`
                    border-radius: 0.5em;
                    &:after {
                        border-radius: 0.5em;
                    }
                `);
                break;
        }
    }

    replaceWith(vars);
}
