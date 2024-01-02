import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          classes
 * @as              @s.ui.range.classes
 * @namespace     node.mixin.ui.range
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        stable
 *
 * Generate the range classes
 *
 * @param       {('solid')[]}                           [lnfs=['solid']]         The style(s) you want to generate
 * @param       {'solid'}                [defaultLnf='theme.ui.range.defaultLnf']           The default style you want
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.range.classes
 *
 * @example     css
 * @s.ui.range.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiRangeClassesInterface extends __SInterface {
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
                default: __STheme.current.get('ui.range.defaultLnf'),
            },
        };
    }
}

export interface ISSugarcssPluginUiRangeClassesParams {
    lnfs: 'solid'[];
    defaultLnf: 'solid';
}

export { SSugarcssPluginUiRangeClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiRangeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiRangeClassesParams = {
        lnfs: [],
        defaultLnf: 'solid',
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Range 
        * @namespace          sugar.style.ui.range
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/range
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to display nice radio in your forms
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
        * @s.ui.range.classes;
        * 
        * .my-range {
        *   @s.ui.range;
        * }
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @cssClass     s-range${
                    lnf === finalParams.defaultLnf ? '' : `:${lnf}`
                }           Apply the ${lnf} range lnf`;
            })
            .join('\n')}
        * 
        ${finalParams.lnfs
            .map((lnf) => {
                return ` * @example        html       ${lnf}
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>John Doe</span>
            *     <input type="range" class="s-range ${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            }" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>John Doe</span>
            *     <input type="range" class="s-range ${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:accent" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>John Doe</span>
            *     <input type="range" class="s-range ${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     <span>I'm disabled</span>
            *     <input type="range" disabled class="s-range ${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            } s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            * `;
            })
            .join('\n')}
        * 
        * @example        html          Shapes
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-shape:default" min="0" max="100" step="10" />
        * </label>
        * <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-shape:square" min="0" max="100" step="10" />
        * </label>
        * <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-shape:pill" min="0" max="100" step="10" />
        * </label>
        * 
        * @example        html          Colors (none-exclusive)
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *   </label>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     <span>John Doe</span>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *     <span>John Doe</span>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *     <span>John Doe</span>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *     <span>John Doe</span>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>I'm disabled</span>
        *     <input type="range" disabled class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *   </label>
        * </div>
        *
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-scale:08" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-width:50" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-scale:12" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <span>John Doe</span>
        *     <input type="range" class="s-range s-scale:14" min="0" max="100" step="10" />
        *   </label>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.code(`@s.scope 'bare' {`);
    vars.comment(
        () => `/**
        * @name           s-range
        * @namespace          sugar.style.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">bare</s-color>" range
        * 
        * @example        html
        * <input type="range" class="s-range s-width:50" min="0" max="100" step="10" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
    ).code(
        `
        .s-range {
            @s.scope.only 'bare' {
                @s.ui.range;
            }
        }
        `,
        { type: 'CssClass' },
    );
    vars.code('}');

    vars.code(`@s.scope 'lnf' {`);
    finalParams.lnfs.forEach((lnf) => {
        let cls = `s-range`;
        if (lnf !== finalParams.defaultLnf) {
            cls += `-${lnf}`;
        }

        vars.comment(
            () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.range
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${lnf}</s-color>" range
            * 
            * @example        html
            * <input type="range" class="s-range ${
                finalParams.defaultLnf === lnf ? '' : `:${lnf}`
            }" min="0" max="100" step="10" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            .${cls} {
                @s.scope.only 'lnf' {
                    @s.ui.range($lnf: ${lnf});
                }
            }
            `,
            { type: 'CssClass' },
        );
    });
    vars.code('}');

    return vars;
}
