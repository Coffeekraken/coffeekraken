import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiRadioInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.range.defaultStyle'),
        },
        scope: {
            type: 'Array<String>',
            values: ['bare', 'lnf'],
            default: ['bare', 'lnf'],
        },
    };
}

export interface IPostcssSugarPluginUiRadioParams {
    style: 'solid';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiRadioInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiRadioParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiRadioParams = {
        style: 'solid',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [
        `
        
`,
    ];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

            @sugar.visually.hidden;

            font-size: sugar.scalable(1rem);

            &:disabled + * {
                user-select: none;
                cursor: not-allowed;
                pointer-events: none;
                opacity: sugar.theme(ui.radio.disabledOpacity) !important;
            }

            & + *:after {
                content: "";
                opacity: 0;
                display: block;
                position: absolute;
                --borderWidth: sugar.theme(ui.radio.borderWidth);
                top: calc(var(--borderWidth) + 0.3em);
                left: 0.3em;
                width: 0.4em;
                height: 0.4em;
                border-radius: sugar.theme(ui.radio.borderRadius);
                background: sugar.color(ui);
                transition: sugar.theme(ui.radio.transition);
            }
            label:hover > &:not(:disabled) + *:after,
            &:hover:not(:disabled) + *:after {
                opacity: 0.5;
            }
            &:checked:not(:disabled) + *:after {
                opacity: 1 !important;
            }

            & + * {
                display: inline-block;
                cursor: pointer;
                position: relative;
                --fs: sugar.scalable(1rem);
                padding-inline-start: calc(var(--fs) * 1.6);
                font-size: sugar.scalable(1rem);
                
                &:before {
                    content: "";  
                    display: block;
                    width: 1em;
                    height: 1em;
                    position: absolute;
                    top: sugar.theme(ui.radio.borderWidth);
                    left: 0;
                    opacity: 0.5;
                    border: sugar.theme(ui.radio.borderWidth) solid sugar.color(ui);
                    background-color: transparent;
                    border-radius: sugar.theme(ui.radio.borderRadius);
                    transition: sugar.theme(ui.radio.transition);
                    box-shadow: 0 0 0 0 sugar.color(ui, --alpha 0.2);
                }
            }

            &:focus:not(:hover):not(:active):not(:disabled) + *:before {
                box-shadow: 0 0 0 sugar.theme(ui.focusOutline.borderWidth) sugar.color(ui, --alpha 0.3);
            }

            [dir="rtl"] & {
                & + *:before {
                    left: auto;
                    right: 0;
                }
                & + *:after {
                    left: auto;
                    right: 0.3em;
                }
            }

        `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            
    `);
    }

    // style
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                `);
                break;
        }
    }

    replaceWith(vars);
}
