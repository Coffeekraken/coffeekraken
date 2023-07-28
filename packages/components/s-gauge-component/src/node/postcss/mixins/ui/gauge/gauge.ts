import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          gauge
 * @as          @sugar.ui.gauge
 * @namespace     node.mixin.ui.gauge
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply the gauge style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.gauge.defaultLnf']         The lnf you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.gauge
 *
 * @example     css
 * .my-gauge {
 *    @sugar.ui.gauge;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiGaugeInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['default', 'underline'],
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

export interface IPostcssSugarPluginUiGaugeParams {
    lnf: 'solid';
    scope: string[];
}

export { postcssSugarPluginUiGaugeInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiGaugeParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiGaugeParams = {
        lnf: 'solid',
        scope: [],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            width: 100%;
        `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(``);

        switch (finalParams.lnf) {
            default:
                break;
        }
    }

    return vars;
}
