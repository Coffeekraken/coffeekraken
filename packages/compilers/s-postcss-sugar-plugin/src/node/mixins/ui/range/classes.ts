import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

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
                default: __STheme.config('ui.range.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill', 'circle'],
                default: __STheme.config('ui.range.defaultShape'),
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

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/range.js`],
    };
}

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
        * @namespace          sugar.css.ui
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
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
            *   <label class="s-mbe:30 s-label">
            *     <input type="range" class="s-range${
                finalParams.defaultStyle === style ? '' : `:${style}`
            }" min="0" max="100" step="10" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="range" class="s-range${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-color:accent" min="0" max="100" step="10" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="range" class="s-range${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-color:complementary" min="0" max="100" step="10" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            * </div>
            * `;
            })
            .join('\n')}
        *
        ${finalParams.shapes
            .map((shape) => {
                return ` * <!-- ${shape} shape -->
            * <div class="s-font:30 s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${shape} shape</h3>
            *   <label class="s-mbe:30 s-label">
            *     <input type="range" class="s-range${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            }" min="0" max="100" step="10" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="range" class="s-range${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-color:accent" min="0" max="100" step="10" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            *   <label class="s-mbe:30 s-label">
            *     <input type="range" class="s-range${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-color:complementary" min="0" max="100" step="10" />
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *   </label>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * <!-- Colors -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors (non-exhaustive)</h3>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * <!-- LTR -->
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors (non-exhaustive)</h3>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:accent" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:complementary" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-color:error" disabled min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * <!-- Scale -->
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors (non-exhaustive)</h3>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-scale:08" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-scale:12" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label">
        *     <input type="range" class="s-range s-scale:14" min="0" max="100" step="10" />
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
        * @name           s-range
        * @namespace      sugar.css.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">bare</s-color>" range
        * 
        * @example        html
        * <input type="range" class="s-range" min="0" max="100" step="10" />
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `,
        ).code(`
        .s-range {
            @sugar.ui.range($scope: bare);
        }
        `);
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
            * @namespace      sugar.css.ui.range
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
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `,
            ).code(`
            .${cls} {
                @sugar.ui.range($style: ${style}, $scope: lnf);
            }
            `);
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
            * @namespace      sugar.css.ui.range
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
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `,
            ).code(`
            .${cls} {
                @sugar.ui.range($shape: ${shape}, $scope: shape);
            }
            `);
        });
    }

    return vars;
}
