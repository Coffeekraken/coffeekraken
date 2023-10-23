import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          checkbox
 * @as              @s.ui.checkbox
 * @namespace     node.mixin.ui.form
 * @type               PostcssMixin
 * @interface     ./checkbox          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the checkbox style to any element
 *
 * @param       {'solid'}                           [lnf='theme.ui.form.defaultLnf']         The lnf(s) you want to generate
 * @param       {'bare'|'lnf'}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.checkbox
 *
 * @example     css
 * .my-checkbox {
 *    @s.ui.form;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiCheckboxInterface extends __SInterface {
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

export interface IPostcssSugarPluginUiCheckboxParams {
    lnf: 'solid';
    scope: ('bare' | 'lnf')[];
}

export { postcssSugarPluginUiCheckboxInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiCheckboxParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiCheckboxParams = {
        lnf: 'solid',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [``];

    switch (finalParams.lnf) {
        default:
            // bare
            if (finalParams.scope.indexOf('bare') !== -1) {
                vars.push(`
                    appearance: none !important;
                    -moz-appearance: none !important;
                    -webkit-appearance: none !important;
                    position: relative;
                    width: 1em; height: 1em;
                    font-size: clamp(s.scalable(24px), s.scalable(1rem), 999rem);

                    &:disabled {
                        @s.disabled;
                    }
            `);
            }

            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`

                    transition: s.theme(ui.form.transition);
                    border: s.theme(ui.form.borderWidth) solid s.color(current);
                    background-color: transparent;
                    transition: s.theme(ui.form.transition);
                    box-shadow: 0 0 0 0 s.color(current, --alpha 0.2);
                    cursor: pointer;
                    @s.shape();

                    
                    &:before {
                        content: '';
                        position: absolute;
                        top: 0; left: 0;
                        width: 100%; height: 100%;
                        background: s.color(current);
                        opacity: 0;
                        transition: s.theme(ui.form.transition);
                        @s.shape();
                    }
                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 100%; height: 100%;
                        transform: translate(-50%, -50%) scale(0.6);
                        background: s.color(current, background);
                        opacity: 0;
                        clip-path: polygon(38% 65%, 78% 0, 100% 13%, 46% 100%, 0 73%, 15% 51%);
                        transition: s.theme(ui.form.transition);
                        @s.shape();
                    }
                    label:hover > &:not(:disabled):before,
                    &:hover:not(:disabled):before,
                    label:hover > &:not(:disabled):after,
                    &:hover:not(:disabled):after {
                        opacity: 0.2;
                    }
                    &:checked:not(:disabled):before,
                    &:checked:not(:disabled):after {
                        opacity: 1 !important;
                    }

                    &:focus:not(:hover):not(:active):not(:disabled) {
                        box-shadow: 0 0 0 s.theme(ui.outline.borderWidth) s.color(current, --alpha 0.3);
                    }
 
        `);
            }
    }

    return vars;
}
