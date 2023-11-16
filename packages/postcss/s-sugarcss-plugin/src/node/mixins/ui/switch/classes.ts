import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @as              @s.ui.switch.classes
 * @namespace     node.mixin.ui.switch
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the switch classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The style(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.form.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.switch.classes
 *
 * @example     css
 * @s.ui.switch.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiSwitchClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultLnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.current.get('ui.form.defaultLnf') ?? 'solid',
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

export interface ISSugarcssPluginUiSwitchClassesMixinParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
    scope: ('bare' | 'lnf')[];
}

export { SSugarcssPluginUiSwitchClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiSwitchClassesMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiSwitchClassesMixinParams = {
        lnfs: [],
        defaultLnf: 'solid',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Switch
        * @namespace          sugar.style.ui.switch
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/form/switch
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to style checkbox HTMLElement as switches
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.switch.classes;
        * 
        * .my-switch {
        *   @s.ui.switch;
        * }
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-switch${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} switch lnf`;
            })
            .join('\n')}
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf} lnf
            *   <label class="s-mbe:30 s-label">
            *     <span>John Doe</span>
            *     <input type="checkbox" class="s-switch${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }" />
            *   </label>
                <label class="s-mbe:30 s-label">
            *     <span>I'm disabled</span>
            *     <input type="checkbox" disabled class="s-switch${
                lnf === finalParams.defaultLnf ? '' : `:${lnf}`
            }" />
            *   </label>
            * `;
            })
            .join('\n')}
        *
        * @example      html            Shapes
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch s-shape:default" checked />
        *   </label>
        * <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch s-shape:square" checked />
        *   </label>
        * <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch s-shape:pill" checked />
        *   </label>
        *
        * @example      html            RTL Support
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        * </div>
        * 
        * @example      html            Colors (non-exhauustive)
        ${['main', 'accent', 'complementary', 'error']
            .map(
                (color) => `
        *   <label class="s-mbe:30 s-label s-color:${color}">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        `,
            )
            .join('\n')}
        * 
        * @example      html            Scales
        *   <label class="s-mbe:30 s-label s-scale\:05">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:10">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:15">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:20">
        *     <span>John Doe</span>
        *     <input type="checkbox" class="s-switch" checked />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
            * @name           s-switch
            * @namespace          sugar.style.ui.switch
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">bare</s-color>" switch
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <label class="s-label">
            *   <span>${__faker.name.findName()}</span>
            *   <input type="checkbox" class="s-switch" />
            * </label>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
        .s-switch {
            @s.ui.switch($scope: bare);
        }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            let cls = `s-switch`;
            if (lnf !== finalParams.defaultLnf) {
                cls += `\n${lnf}`;
            }

            vars.comment(
                () => `/**
                * @name           ${cls}
                * @namespace          sugar.style.ui.switch
                * @type           CssClass
                * 
                * This class represent a(n) "<s-color="accent">${lnf}</s-color>" switch
                * 
                * @feature      Vertical rhythm
                * 
                * @example        html
                * <label class="s-label">
                *   <span>${__faker.name.findName()}</span>
                *   <input type="checkbox" class="${cls
                    .replace(/\./gm, ' ')
                    .trim()}" />
                * </label>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `,
            ).code(
                `
            .${cls.replace('\n', '-')}:not(.s-bare) {
                @s.ui.switch($lnf: ${lnf}, $scope: lnf);
            }
        `,
                { type: 'CssClass' },
            );
        });
    }

    return vars;
}
