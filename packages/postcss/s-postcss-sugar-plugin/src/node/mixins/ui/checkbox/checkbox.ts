import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          checkbox
 * @namespace     node.mixin.ui.form
 * @type               PostcssMixin
 * @interface     ./checkbox          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the checkbox style to any element
 *
 * @param       {'defaut'}                           [lnf='theme.ui.form.defaultLnf']         The style(s) you want to generate
 * @param       {'bare'|'lnf'}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.checkbox
 *
 * @example     css
 * .my-checkbox {
 *    @sugar.ui.form;
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
                width: 1.2em;
                height: 1.2em;
                font-size: sugar.scalable(1rem);

                &:disabled {
                    @sugar.disabled;
                }
            `);
            }

            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                    transition: sugar.theme(ui.form.transition);
                    border: sugar.theme(ui.form.borderWidth) solid sugar.color(current);
                    background-color: transparent;
                    transition: sugar.theme(ui.form.transition);
                    box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);
                    @sugar.shape();

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.6em; height: 0.6em;
                        transform: translate(-50%, -50%);
                        background: sugar.color(current);
                        opacity: 0;
                        transition: sugar.theme(ui.form.transition);
                        @sugar.shape();
                    }
                    label:hover > &:not(:disabled):after,
                    &:hover:not(:disabled):after {
                        opacity: 0.2;
                    }
                    &:checked:not(:disabled):after {
                        opacity: 1 !important;
                    }

                    &:focus:not(:hover):not(:active):not(:disabled) {
                        box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                    }
 
        `);
            }
    }

    return vars;
}
