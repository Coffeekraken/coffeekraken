import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          classes
 * @as              @s.ui.gauge.classes
 * @namespace     node.mixin.ui.gauge
 * @type          PostcssMixin
 * @interface     ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the gauge classes
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare','lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.gauge.classes
 *
 * @example       css
 * \@s.ui.gauge.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiAvatarClassesInterface extends __SInterface {
    static get _definition() {
        return {
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

export interface ISSugarcssPluginUiAvatarClassesParams {
    scope: ('bare' | 'lnf')[];
}

export { SSugarcssPluginUiAvatarClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiAvatarClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiAvatarClassesParams = {
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Gauge
        * @namespace          sugar.style.ui.gauge
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/gauge
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some gauge style on the s-gauge component.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * \\@s.ui.gauge.classes;
        * 
        * .my-gauge {
        *   \@s.ui.gauge;
        * }
        * 
        * @cssClass             s-gauge                Apply the gauge style
        * 
        * @example        html         Default
        * <s-gauge min="0" max="0" start="45" end="315" value="67"></s-gauge>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
          * @name           s-gauge
          * @namespace          sugar.style.ui.gauge
          * @type           CssClass
          * 
          * This class represent a gauge
          * 
          * @example        html
          * <s-gauge min="0" max="0" start="45" end="315" value="67"></s-gauge>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
          .s-gauge {
            @s.ui.gauge($scope: 'bare');
          }
      `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        vars.comment(
            () => `/**
        * @name           s-gauge
        * @namespace          sugar.style.ui.gauge
        * @type           CssClass
        * 
        * This class represent a gauge
        * 
        * @example        html
        * <s-gauge min="0" max="0" start="45" end="315" value="67"></s-gauge>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        ).code(
            `
        .s-gauge:not(.s-bare) {
            @s.ui.gauge($scope: 'lnf');
        }
    `,
            { type: 'CssClass' },
        );
    }

    return vars;
}
