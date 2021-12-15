import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          switch
 * @namespace     ui.switch
 * @type          CssMixin
 * @interface     ./switch          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the switch style to any element
 *
 * @param       {'solid'}           [style='theme.ui.switch.defaultStyle']        The style you want for your switch
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.switch.defaultShape]      The shape you want for your switch
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-switch {
 *    @sugar.ui.switch;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginUiSwitchMixinInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.switch.defaultShape'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.switch.defaultShape'),
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
}

export interface IPostcssSugarPluginUiSwitchMixinParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape')[];
}

export { postcssSugarPluginUiSwitchMixinInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiSwitchMixinParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiSwitchMixinParams = {
        style: 'solid',
        shape: 'default',
        scope: ['bare', 'lnf', 'shape'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        
        font-size: sugar.scalable(0.8rem);

        --thumb-size: 1em;
        --thumb-color-active: sugar.color(main, surface);
        --thumb-color-inactive: sugar.color(current);
        --thumb-color-highlight: sugar.color(current, --alpha 0.2);

        --track-size: calc(var(--thumb-size) * 2);
        --track-padding: 0.2em;
        --track-color-active: sugar.color(current);
        --track-color-inactive: sugar.color(current, --alpha 0.1);

        --isLTR: 1;

        @sugar.direction.rtl {
            --isLTR: -1;
        }

        --thumb-position: 0%;
        --thumb-transition-duration: .25s;
        
        padding: var(--track-padding);
        inline-size: var(--track-size);
        block-size: var(--thumb-size);
        
        appearance: none;
        pointer-events: all;
        cursor: pointer;
        touch-action: pan-y;
        outline-offset: 5px;
        box-sizing: content-box;

        flex-shrink: 0;
        display: grid;
        align-items: center;
        grid: [track] 1fr / [track] 1fr;

        &:checked {
            &::before {
            }
            &::after {
            }
        }

        &::before {
            --highlight-size: 0;

            content: "";
            cursor: pointer;
            pointer-events: none;
            grid-area: track;
            inline-size: var(--thumb-size);
            block-size: var(--thumb-size);
        }

        &::after {
            content: "";
            cursor: pointer;
            pointer-events: none;
            grid-area: track;
            inline-size: var(--thumb-size);
            block-size: var(--thumb-size);
        }

        &:not(:disabled):hover::before {
        }
        &:not(:disabled):focus::before {
        }

        &:checked {
            --thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));
        }

        &:indeterminate {
            --thumb-position: calc(
                calc(calc(var(--track-size) / 2) - calc(var(--thumb-size) / 2))
                * var(--isLTR)
            );
        }

        @sugar.state.disabled {
            --thumb-color: transparent;
            @sugar.disabled;
        }

    `);
    }

    switch (finalParams.style) {
        case 'solid':
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
        
                    font-size: sugar.scalable(0.8rem);        
                    background: var(--track-color-inactive);

                    border: sugar.color(current, border) solid sugar.theme(ui.switch.borderWidth);
                    outline-offset: 5px;
                    
                    transition: sugar.theme(ui.switch.transition);

                    &:checked {
                        &::before {
                            background: var(--thumb-color-active) !important;
                        }
                        &::after {
                        }
                    }

                    &::before {
                        --highlight-size: 0;

                        background: var(--thumb-color-inactive);
                        box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
                        transform: translateX(var(--thumb-position));
                        transition: sugar.theme(ui.switch.transition);
                    }

                    &::after {
                        background: rgba(255,255,25,0);
                        box-shadow: 0;
                        transition: sugar.theme(ui.switch.transition);
                    }

                    &:not(:disabled):hover::before {
                        --highlight-size: .5rem;
                    }
                    &:not(:disabled):focus::before {
                        --highlight-size: .25rem;
                    }

                    &:checked {
                        background: var(--track-color-active);
                    }

                `);
            }

            break;
    }

    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;

                    &:after,
                    &:before {
                        border-radius: 0;
                    }
                `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 9999px;

                    &:after,
                    &:before {
                        border-radius: 9999px;
                    }
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.theme(ui.switch.borderRadius);

                    &:after,
                    &:before {
                        border-radius: sugar.theme(ui.switch.borderRadius);
                    }
                `);
                break;
        }
    }

    return vars;
}
