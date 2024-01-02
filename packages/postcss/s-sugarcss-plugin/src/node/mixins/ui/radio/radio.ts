import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          radio
 * @as              @s.ui.radio
 * @namespace     node.mixin.ui.radio
 * @type               PostcssMixin
 * @interface     ./radio          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the radio style to any element
 *
 * @param       {'solid'}                           [lnf='theme.ui.form.defaultLnf']         The lnf you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.radio
 *
 * @example     css
 * .my-radio {
 *    @s.ui.radio;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiRadioInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
        };
    }
}

export interface ISSugarcssPluginUiRadioParams {
    lnf: 'solid';
}

export { SSugarcssPluginUiRadioInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiRadioParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiRadioParams = {
        lnf: 'solid',
        ...params,
    };

    const vars: string[] = [
        `
        
`,
    ];

    // bare
    vars.push(`@s.scope 'bare' {`);
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
    vars.push('}');

    vars.push(`@s.scope 'lnf' {`);
    switch (finalParams.lnf) {
        default:
            // lnf
            vars.push(`
                
                    transition: s.theme(ui.form.transition);
                    border: s.border.width(ui.form.borderWidth) solid s.color(current);
                    background-color: transparent;
                    transition: s.theme(ui.form.transition);
                    box-shadow: 0 0 0 0 s.color(current, --alpha 0.2);
                    @s.shape();
                    
                    &:not(.s-shape), 
                    &:not(.s-shape):after {
                        border-radius: 999px;
                    }

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.6em; height: 0.6em;
                        transform: translate(-50%, -50%);
                        background: s.color(current);
                        opacity: 0;
                        transition: s.theme(ui.form.transition);
                        @s.shape();
                    }
                    label:hover > &:not(:disabled):after,
                    &:hover:not(:disabled):after {
                        opacity: 0.2;
                    }
                    &:checked:not(:disabled):after {
                        opacity: 1 !important;
                    }

                    &:focus:not(:hover):not(:active):not(:disabled) {
                        box-shadow: 0 0 0 s.theme(ui.outline.borderWidth) s.color(current, --alpha 0.3);
                    }
 
        `);
    }
    vars.push('}');

    return vars;
}
