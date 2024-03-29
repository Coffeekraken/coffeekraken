import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          input
 * @as          @s.ui.input
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        stable
 *
 * Apply the input style to any element
 *
 * @param       {'solid'|'underline'}                           [style='theme.ui.form.defaultLnf']         The lnf you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.input
 *
 * @example     css
 * .my-input {
 *    @s.ui.input;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiFormInputInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'underline'],
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.current.get('ui.form.outline'),
            },
        };
    }
}

export interface ISSugarcssPluginUiFormInputParams {
    lnf: 'solid' | 'underline';
    outline: boolean;
}

export { SSugarcssPluginUiFormInputInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiFormInputParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiFormInputParams = {
        lnf: 'solid',
        outline: true,
        ...params,
    };

    const vars: string[] = [];

    vars.push(`@s.scope 'lnf' {`);

    if (finalParams.outline) {
        vars.push(`
                &:focus:not(:hover) {
                    @s.outline;
                }
            `);
    }

    vars.push(`
            @s.ui.base(input);
            @s.shape();
  `);
    vars.push('}');

    vars.push(`
        @s.scope 'bare' {
            width: 100%;
        }
    `);

    vars.push(`@s.scope 'lnf' {`);
    switch (finalParams.lnf) {
        case 'underline':
            vars.push(`
                background-color: s.color(current, --alpha 0);
                border-top: none !important;
                border-left: none !important;
                border-right: none !important;
                border-bottom: s.color(current, --alpha 0.3) solid s.border.width(ui.form.borderWidth) !important;
                padding-inline: 1ch !important;

                &:hover, &:focus {
                    border-bottom: s.color(current, --alpha 1) solid s.border.width(ui.form.borderWidth) !important;
                    background-color: s.color(current, --alpha 0.1);
                }
                `);
            break;
        default:
            break;
    }

    vars.push('}');

    return vars;
}
