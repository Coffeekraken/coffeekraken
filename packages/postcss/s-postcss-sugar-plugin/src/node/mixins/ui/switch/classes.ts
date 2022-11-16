import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.switch
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the switch classes
 *
 * @param       {('default')[]}                           [lnfs=['default']]         The style(s) you want to generate
 * @param       {'default'}                [defaultLnf='theme.ui.form.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.form.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiSwitchClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['default'],
                default: ['default'],
            },
            defaultLnf: {
                type: 'String',
                values: ['default'],
                default: __STheme.get('ui.form.defaultLnf') ?? 'default',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'tf'],
                default: ['bare', 'lnf', 'tf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiSwitchClassesMixinParams {
    lnfs: 'default'[];
    defaultLnf: 'default';
    scope: ('bare' | 'lnf' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiSwitchClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiSwitchClassesMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiSwitchClassesMixinParams = {
        lnfs: [],
        defaultLnf: 'default',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Switch
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/form/switch
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style checkbox HTMLElement as switches
        * 
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
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
            *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
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
        * @example      html            RTL Support
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        * </div>
        * 
        * @example      html            Colors (non-exhauustive)
        ${['main', 'accent', 'complementary', 'error']
            .map(
                (color) => `
        *   <label class="s-mbe:30 s-label s-color:${color}">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        `,
            )
            .join('\n')}
        * 
        * @example      html            Scales
        *   <label class="s-mbe:30 s-label s-scale\:05">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:10">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:15">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
        *   </label>
        *   <label class="s-mbe:30 s-label s-scale\:20">
        *     <span>${__faker.name.title()} ${__faker.name.findName()}</span>
        *     <input type="checkbox" class="s-switch" />
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
            @sugar.ui.switch($scope: bare);
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
            .${cls.replace('\n', '--')} {
                @sugar.ui.switch($lnf: ${lnf}, $scope: lnf);
            }
        `,
                { type: 'CssClass' },
            );
        });
    }

    return vars;
}
