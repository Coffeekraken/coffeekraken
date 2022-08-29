import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

/**
 * @name          classes
 * @namespace     node.mixin.ui.tabs
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the tabs classes
 *
 * @param       {('solid')[]}                           [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill')[]}             [shape=['default','square','pill']]         The shape(s) you want to generate
 * @param       {'solid'}                [defaultStyle='theme.ui.tabs.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}        [defaultShape='theme.ui.tabs.defaultShape']           The default shape you want
 * @param       {String}                            [defaultColor=theme.ui.tabs.defaultColor]            The default color you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.tabs.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiListClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
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
                default: __STheme.get('ui.tabs.defaultStyle') ?? 'solid',
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.tabs.defaultShape'),
            },
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.tabs.defaultColor'),
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

export interface IPostcssSugarPluginUiListClassesParams {
    styles: 'solid'[];
    shapes: ('default' | 'square' | 'pill')[];
    defaultStyle: 'solid';
    defaultShape: 'default' | 'square' | 'pill';
    defaultColor: string;
    scope: ('bare' | 'lnf' | 'shape' | 'vr' | 'tf')[];
}

export { postcssSugarPluginUiListClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/tabs.js`],
    };
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiListClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListClassesParams = {
        styles: [],
        shapes: [],
        defaultStyle: 'solid',
        defaultShape: 'default',
        defaultColor: 'main',
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Tabs
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tabs
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style list (or any others) HTMLElement as tabs
        * 
        * @support          rtl
        * @support          chromium            
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-tabs${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} tabs style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-tabs${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }           Apply the ${shape} tabs shape`;
            })
            .join('\n')}
        * @cssClass       s-tabs:grow        Make the tabs items grow and take the available space
        * @cssClass       s-tabs:fill       Add a background to the tabs
        * @cssClass       s-tabs:vertical    Display the tabs horizontally
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @example        html       ${style} style ${
                    finalParams.defaultStyle === style
                        ? '<span class="s-badge:outline s-scale:05">default</span>'
                        : ''
                }
            *   <ul class="s-tabs${
                style === finalParams.defaultStyle ? '' : `:${style}`
            } s-color:accent">
            *     <li tabindex="0" active>${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *   </ul>
            * `;
            })
            .join('\n')}
        *
        ${finalParams.shapes
            .map((shape) => {
                return ` * @example        html       ${shape}
            *   <ul class="s-tabs${
                shape === finalParams.defaultShape ? '' : `:${shape}`
            } s-color:accent">
            *     <li tabindex="0" active>${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *   </ul>
            * `;
            })
            .join('\n')}
        * 
        * @example        html       Grow
        *   <ul class="s-tabs:grow">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * 
        * @example        html       Fill
        *   <ul class="s-tabs:fill">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        RTL
        * <div dir="rtl">
        *   <ul class="s-tabs">
        *     <li class="s-color:accent" tabindex="0" active>${__faker.name.findName()}</li>
        *     <li class="s-color:complementary" tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * @example      html        Vertical
        *   <ul class="s-tabs:vertical s-color:complementary">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * 
        * @example      html        Scales
        *   <ul class="s-tabs:grow s-scale:13 s-color:accent">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `
            /**
              * @name           s-tabs
              * @namespace          sugar.style.ui.tabs
              * @type           CssClass
              * 
              * This class represent a "<yellow>bare</yellow>" tabs
              * 
              * @example        html
              * <div class="s-tabs">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
           `,
        ).code(
            `
          .s-tabs {
            @sugar.ui.tabs($scope: bare);
          }
          `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(
                () => `/**
              * @name           s-tabs${
                  finalParams.defaultStyle === style ? '' : `:${style}`
              }
              * @namespace          sugar.style.ui.tabs
              * @type           CssClass
              * 
              * This class represent a "<yellow>${style}</yellow>" tabs
              * 
              * @example        html
              * <div class="s-tabs${
                  finalParams.defaultStyle === style ? '' : `:${style}`
              }">
              *    <div class="active">An active tab</div>
              *    <div>A tab</div>
              * </div>
            */
           `,
            ).code(
                `
          .s-tabs${finalParams.defaultStyle === style ? '' : `--${style}`} {
            @sugar.ui.tabs($style: ${style}, $scope: lnf);
          }
        `,
                { type: 'CssClass' },
            );
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(
                () => `/**
            * @name           s-tabs${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            }
            * @namespace          sugar.style.ui.tabs
            * @type           CssClass
            * 
            * This class represent a "<yellow>${shape}</yellow>" tabs
            * 
            * @example        html
            * <div class="s-tabs${
                finalParams.defaultShape === shape ? '' : `:${shape}`
            }">
            *    <div class="active">An active tab</div>
            *    <div>A tab</div>
            * </div>
          */
         `,
            ).code(
                `
        .s-tabs${finalParams.defaultShape === shape ? '' : `--${shape}`} {
          @sugar.ui.tabs($shape: ${shape}, $scope: shape);

          &.s-tabs--vertical {
                @sugar.ui.tabs($direction: vertical, $shape: ${shape}, $scope: 'shape');
            }
        }
      `,
                { type: 'CssClass' },
            );
        });
    }

    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(
            () => `
            .s-tabs:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
            }
        `,
            { type: 'CssClass' },
        );
    }

    vars.comment(
        () => `/**
        * @name           s-tabs--grow
        * @namespace          sugar.style.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>grow</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--grow">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `,
    ).code(
        `
    .s-tabs--grow {
      @sugar.ui.tabs($grow: true, $scope: grow);
    }
  `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
        * @name           s-tabs--fill
        * @namespace          sugar.style.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>fill</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--fill">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `,
    ).code(
        `
    .s-tabs--fill {
      @sugar.ui.tabs($fill: true, $scope: fill);
    }
  `,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
        * @name           s-tabs--vertical
        * @namespace          sugar.style.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>vertical</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--vertical">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
     `,
    ).code(
        `
    .s-tabs--vertical {
      @sugar.ui.tabs($direction: vertical, $scope: 'direction');
    }
  `,
        { type: 'CssClass' },
    );

    return vars;
}
