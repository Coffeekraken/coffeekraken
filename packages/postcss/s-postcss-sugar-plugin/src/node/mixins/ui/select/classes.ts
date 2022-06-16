import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.select
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the select classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.select.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.select.defaultShape']           The default shape you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.select.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiFormSelectClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.select.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.select.defaultShape'),
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

export interface IPostcssSugarPluginUiFormSelectClassesParams {
    styles: 'solid'[];
    shapes: ('default' | 'square' | 'pill')[];
    defaultStyle: 'solid';
    defaultShape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape' | 'tf' | 'vr')[];
}

export { postcssSugarPluginUiFormSelectClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/select.js`],
    };
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormSelectClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormSelectClassesParams = {
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
        * @name          Select
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/select
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice select in your forms
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
                return ` * @cssClass     s-select${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} select style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-select${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }           Apply the ${shape} select shape`;
            })
            .join('\n')}
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style} style
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <select class="s-select${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-width:40" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     I'm disabled
            *     <select disabled class="s-select${
                finalParams.defaultStyle === style ? '' : `:${style}`
            } s-width:40" name="select-style-${style}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            * `;
            })
            .join('\n')}
        *
        ${finalParams.shapes
            .map((shape) => {
                return ` * @example        html       ${shape} shape
            *   <label class="s-mbe:30 s-label:responsive">
            *     ${__faker.name.title()} ${__faker.name.findName()}
            *     <select class="s-select${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            *   <label class="s-mbe:30 s-label:responsive">
            *     I'm disabled
            *     <select disabled class="s-select${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            } s-width:40" name="select-shape-${shape}">
            *       <option value="value1">${__faker.name.findName()}</option>
            *       <option value="value2">${__faker.name.findName()}</option>
            *       <option value="value3">${__faker.name.findName()}</option>
            *     </select>
            *   </label>
            * `;
            })
            .join('\n')}
        * 
        * @example      html            Colors (none-exhaustive)
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-color:accent s-width:40" name="select-color-complementary">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-color:complementary s-width:40" name="select-color-error">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-color:error s-width:40" name="select-color-error" disabled>
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example      html            Multiple
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-color:accent s-width:40" multiple name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        * 
        * @example          html            RTL
        * <div dir="rtl">
        *   <label class="s-mbe:30 s-label:responsive">
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *   </label>
        * </div>
        * 
        * @example          html           Scales
        *   <label class="s-mbe:30 s-label:responsive s-scale:07">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:13">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
        *     ${__faker.name.title()} ${__faker.name.findName()}
        *   </label>
        *   <label class="s-mbe:30 s-label:responsive s-scale:16">
        *     <select class="s-select s-color:accent s-width:40" name="select-color-accent">
        *       <option value="value1">${__faker.name.findName()}</option>
        *       <option value="value2">${__faker.name.findName()}</option>
        *       <option value="value3">${__faker.name.findName()}</option>
        *     </select>
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
            * @name           s-select
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>bare</yellow>" select
            * 
            * @example        html
            * <select class="s-select">
            *   <option value="value 1">Hello</option>
            *   <option value="value 2">World</option>
            * </select>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
        );
        vars.code(
            () => `
                .s-select {
                    @sugar.ui.select($scope: bare);
                }`,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            const isDefaultStyle = finalParams.defaultStyle === style;

            const styleCls = isDefaultStyle ? '' : `.s-select--${style}`;
            const cls = `.s-select${styleCls}`;

            vars.comment(
                () => `/**
            * @name           s-select${isDefaultStyle ? '' : `:${style}`}
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" select
            * 
            * @example        html
            * <select class="s-select${isDefaultStyle ? '' : `:${style}`}">
            *   <option value="value 1">Hello</option>
            *   <option value="value 2">World</option>
            * </select>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`,
            );
            vars.code(
                () => `
                ${cls} {
                    @sugar.ui.select($style: ${style}, $scope: lnf);
                }`,
                { type: 'CssClass' },
            );
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            const isDefaultShape = finalParams.defaultShape === shape;

            const styleCls = isDefaultShape ? '' : `.s-select--${shape}`;
            const cls = `.s-select${styleCls}`;

            vars.comment(
                () => `/**
        * @name           s-select${isDefaultShape ? '' : `:${shape}`}
        * @namespace          sugar.style.ui.select
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${shape}</yellow>" select
        * 
        * @example        html
        * <select class="s-select${isDefaultShape ? '' : `:${shape}`}">
        *   <option value="value 1">Hello</option>
        *   <option value="value 2">World</option>
        * </select>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */`,
            );
            vars.code(
                () => `
            ${cls} {
                @sugar.ui.select($shape: ${shape}, $scope: shape);
            }`,
                { type: 'CssClass' },
            );
        });
    }

    if (finalParams.scope.indexOf('tf') !== -1) {
        vars.comment(
            () => `/**
            * @name           s-format:text select
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent a simple select tag in the s-format:text scope
            * 
            * @example        html
            * <div class="s-format:text">
            *   <select>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @sugar.format.text {
                select {
                    @sugar.ui.select($scope: '${finalParams.scope.join(',')}');
                } 
            }
        `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.indexOf('vr') !== -1) {
        vars.comment(
            () => `/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.select
            * @type           CssClass
            * 
            * This class represent some select in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <select class="s-select">
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *   </select>
            *   <select class="s-select">
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *       <option>${__faker.name.findName()}</option>
            *   </select>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
            @sugar.rhythm.vertical {
                select, .s-select {
                    ${__STheme.jsObjectToCssProperties(
                        __STheme.get('ui.select.rhythmVertical'),
                    )}
                } 
            }
        `,
            { type: 'CssClass' },
        );
    }

    return vars;
}
