import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          switch
 * @as              @s.ui.switch
 * @namespace     node.mixin.ui.form
 * @type               PostcssMixin
 * @interface     ./switch          interface
 * @platform      postcss
 * @status        stable
 *
 * Apply the switch style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.form.defaultLnf']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.switch
 *
 * @example     css
 * .my-switch {
 *    @s.ui.switch;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiSwitchMixinInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.form.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiSwitchMixinParams {
    lnf: 'solid';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiSwitchMixinInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiSwitchMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiSwitchMixinParams = {
        lnf: 'solid',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        
        font-size: clamp(s.scalable(20px), s.scalable(1rem), 999rem);

        --thumb-size: 1em;
        --thumb-color-active: s.color(current);
        --thumb-color-inactive: s.color(current, --desaturate 80);
        --thumb-border-width: s.theme(ui.form.borderWidth);
        --thumb-border-color: s.color(current, border);

        --track-size: 0.5em;
        --track-color-active: s.color(current, --alpha 0.3);
        --track-color-inactive: s.color(main, ui, --alpha 0.2 --desaturate 80);
        --track-border-width: s.theme(ui.form.borderWidth);
        --track-border-color: s.color(current, border);

        --thumb-position: 0%;

        --thumb-transition-duration: s.theme(ui.form.transition);
        
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        width: calc(var(--thumb-size) * 2);
        height: var(--thumb-size);
        position: relative;
        pointer-events: all;
        cursor: pointer;
        touch-action: pan-y;
        /* outline-offset: 5px; */
        box-sizing: content-box;
        flex-shrink: 0;

        &::before {
            content: "";
            cursor: pointer;
            pointer-events: none;
            width: calc(var(--thumb-size) * 2 - 20%);
            height: var(--track-size);
            position: absolute;
            top: 50%; left: 10%;
            transform: translateY(-50%);
        }
        &::after {
            content: "";
            cursor: pointer;
            pointer-events: none;
            width: var(--thumb-size);
            height: var(--thumb-size);
            position: absolute;
            top: 50%; left: 0;
        }


        --thumb-position: calc(--thumb-size) / 2);
        @s.direction.rtl {
            --thumb-position: calc(100% - var(--thumb-size) / 2);
        }

        &:indeterminate {
            --thumb-position: 50%;
        }

        &:checked {
            --thumb-position: calc(100% - var(--thumb-size) / 2);

            @s.direction.rtl {
                --thumb-position: calc(var(--thumb-size) / 2);
            }
        }

        @s.state.disabled {
            --thumb-color: transparent;
            @s.disabled;
        }

        &:after {
            left: var(--thumb-position);
            transform: translate(-50%, -50%);
        }

    `);
    }

    switch (finalParams.lnf) {
        default:
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
             
                    &:before {
                        background: var(--track-color-inactive);
                        transition: var(--thumb-transition-duration);
                    }

                    &::after {
                        background: var(--thumb-color-inactive);
                        transition: var(--thumb-transition-duration);
                    }

                    &:checked {
                        &:before {
                            background: var(--track-color-active) !important;
                        }
                        &::after {
                            background: var(--thumb-color-active) !important;
                        }
                    }

                `);
            }

            break;
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
                    @s.shape();
                    &:after,
                    &:before {
                        @s.shape();
                    }
                `);
    }

    // wireframe
    vars.push(`
        @s.wireframe {
            @s.wireframe.background;
            @s.wireframe.border;

            &::before {
                @s.wireframe.background;
                @s.wireframe.border;
            }
        }
    `);

    return vars;
}
