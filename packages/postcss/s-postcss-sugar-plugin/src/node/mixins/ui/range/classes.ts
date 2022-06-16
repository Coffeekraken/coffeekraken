import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.range
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the range classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill'|'circle')[]}             [shape=['default','square','pill','circle']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.range.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'|'circle'}        [defaultShape='theme.ui.range.defaultShape']           The default shape you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.range.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiRangeClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill', 'circle'],
                default: ['default', 'square', 'pill', 'circle'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.range.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill', 'circle'],
                default: __STheme.get('ui.range.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr', 'tf'],
                default: ['bare', 'lnf', 'shape', 'vr', 'tf'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiRangeClassesParams {
    styles: 'solid'[];
    shapes: ('default' | 'square' | 'pill' | 'circle')[];
    defaultStyle: 'solid';
    defaultShape: 'default' | 'square' | 'pill' | 'circle';
    scope: ('bare' | 'lnf' | 'shape' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiRangeClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiRangeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiRangeClassesParams = {
        styles: [],
        shapes: [],
        defaultStyle: 'solid',
        defaultShape: 'default',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Range 
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/range
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice radio in your forms
        * 
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-range${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} range style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-range${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }           Apply the ${shape} range shape`;
            })
            .join('\n')}
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style}
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="range" class="s-range${
                finalParams.defaultStyle === style ? '' : `:${style}`
            }" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="range" class="s-range${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-color:accent" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="range" class="s-range${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     I'm disabled
            *     <input type="range" disabled class="s-range${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            * `;
            })
            .join('\n')}
        *
        ${finalParams.shapes
            .map((shape) => {
                return ` * @example        html       ${shape}
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="range" class="s-range${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            }" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="range" class="s-range${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-color:accent" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <input type="range" class="s-range${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     I'm disabled
            *     <input type="range" disabled class="s-range${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-color:complementary" min="0" max="100" step="10" />
            *   </label>
            * `;
            })
            .join('\n')}
        * 
        * @example        html          Colors (none-exclusive)
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     I'm disabled
        *     <input type="range" disabled class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *   </label>
        * </div>
        *
        * @example        html          Scales
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-scale:08" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-scale:12" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <input type="range" class="s-range s-scale:14" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
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
        * @name           s-range
        * @namespace          sugar.style.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">bare</s-color>" range
        * 
        * @example        html
        * <input type="range" class="s-range" min="0" max="100" step="10" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `,
        ).code(
            `
        .s-range {
            @sugar.ui.range($scope: bare);
        }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            let cls = `s-range`;
            if (style !== finalParams.defaultStyle) {
                cls += `--${style}`;
            }

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.range
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${style}</s-color>" range
            * 
            * @example        html
            * <input type="range" class="s-range${
                finalParams.defaultStyle === style ? '' : `:${style}`
            }" min="0" max="100" step="10" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
            ).code(
                `
            .${cls} {
                @sugar.ui.range($style: ${style}, $scope: lnf);
            }
            `,
                { type: 'CssClass' },
            );
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            let cls = `s-range`;
            if (shape !== finalParams.defaultShape) {
                cls += `--${shape}`;
            }

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace          sugar.style.ui.range
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">${shape}</s-color>" range
            * 
            * @example        html
            * <input type="range" class="s-range${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            }" min="0" max="100" step="10" />
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
            ).code(
                `
            .${cls} {
                @sugar.ui.range($shape: ${shape}, $scope: shape);
            }
            `,
                { type: 'CssClass' },
            );
        });
    }

    return vars;
}
