import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

class postcssSugarPluginUiFormClassesInterface extends __SInterface {
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
                default: __STheme.config('ui.input.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                default: __STheme.config('ui.input.defaultShape'),
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

export interface IPostcssSugarPluginUiFormClassesParams {
    styles: string[];
    shapes: ('default' | 'square' | 'pill')[];
    defaultStyle: 'solid';
    defaultShape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiFormClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/text.js`],
    };
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiFormClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiFormClassesParams = {
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
        * @name          Text Input
        * @namespace          sugar.css.ui.input
        * @type               Styleguide
        * @menu           Styleguide / Forms        /styleguide/forms/text-input
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some styles to your text input
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-input${
                    finalParams.defaultStyle === style ? '' : `:${style}`
                }           Apply the ${style} input style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-input${
                    finalParams.defaultShape === shape ? '' : `:${shape}`
                }           Apply the ${shape} input shape`;
            })
            .join('\n')}
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style}
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40 s-color:accent" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40 s-color:complementary" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40 s-color:error" />
            *   </label>
            *   <label dir="rtl" class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something! (RTL)" class="s-input\:${style} s-width:40 s-color:accent" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${style} s-width:40 s-scale\:15 s-color:accent" />
            *   </label>
            * `;
            })
            .join('\n')}
        *
        ${finalParams.shapes
            .map((shape) => {
                return ` * @example        html       ${shape}
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${shape} s-width:40" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *       ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${shape} s-width:40 s-color:accent" />
            *   </label>
            *   <label class="s-label s-mbe:30">
            *        ${__faker.name.findName()}
            *       <input type="text" placeholder="Type something!" class="s-input\:${shape} s-width:40 s-color:complementary" />
            *   </label>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
        * @name           s-input
        * @namespace      sugar.css.ui.input
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bare</yellow>" input
        * 
        * @example        html
        * <input type="text" class="s-input" placeholder="Hello world" />
      */
     `,
        ).code(`
        .s-input {
            @sugar.ui.input($scope: bare);
        }
        `);
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            const isDefaultStyle = finalParams.defaultStyle === style;

            const styleCls = isDefaultStyle ? '' : `.s-input--${style}`;
            const cls = `.s-input${styleCls}`;

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${style}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
        */`,
            ).code(
                [
                    `${cls} {`,
                    ` @sugar.ui.input($style: ${style}, $scope: lnf);`,
                    `}`,
                ].join('\n'),
            );
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            const isDefaultShape = finalParams.defaultShape === shape;

            const shapeCls = isDefaultShape ? '' : `.s-input--${shape}`;
            const cls = `.s-input${shapeCls}`;

            vars.comment(
                () => `/**
            * @name           ${cls}
            * @namespace      sugar.css.ui.input
            * @type           CssClass
            * 
            * This class represent a(n) "<yellow>${shape}</yellow>" input
            * 
            * @example        html
            * <input type="text" class="${cls.trim()}" placeholder="Hello world" />
        */`,
            ).code(
                [
                    `${cls} {`,
                    ` @sugar.ui.input($shape: ${shape}, $scope: shape);`,
                    `}`,
                ].join('\n'),
            );
        });
    }

    return vars;
}
