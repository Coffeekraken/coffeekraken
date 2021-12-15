import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          tabs
 * @namespace     ui.tabs
 * @type          CssMixin
 * @interface     ./tabs          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the tabs style to any element
 *
 * @param       {'solid'}           [style='theme.ui.tabs.defaultStyle']        The style you want for your tabs
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.tabs.defaultShape]      The shape you want for your tabs
 * @param       {Boolean}           [grow=false]                  Specify if you want your tabs to grow and take all the available place or not
 * @param       {'vertical'|'horizontal'}       [direction='horizontal']                Specify if you want your tabs to be vertical or horizontal
 * @param       {Boolean}           [outline=true]                      Specify if you want your tabs to have an outline on focus or not
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-tabs {
 *    @sugar.ui.tabs;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginUiTabInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                description: 'Specify the style you want for your tabs',
                values: ['solid'],
                default: __STheme.config('ui.tabs.defaultStyle'),
            },
            shape: {
                type: 'String',
                description: 'Specify the shape you want for your tabs',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.tabs.defaultShape'),
            },
            grow: {
                type: 'Boolean',
                description:
                    'Specify if you want your tabs to take all the available place of not',
                default: false,
            },
            direction: {
                type: 'String',
                description: 'Specigy the direction of your tabs',
                values: ['vertical', 'horizontal'],
                default: 'horizontal',
            },
            outline: {
                type: 'Boolean',
                description:
                    'Specify if you want your tabs to have an outline on focus',
                default: __STheme.config('ui.tabs.outline'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                description: 'Specify the scope(s) you want to generate',
                values: ['bare', 'lnf', 'shape', 'grow', 'direction'],
                default: ['bare', 'lnf', 'shape', 'grow', 'direction'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiTabParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill';
    grow: boolean;
    direction: 'horizontal' | 'vertical';
    outline: boolean;
    scope: ('bare' | 'lnf' | 'shape' | 'grow' | 'direction' | 'vr')[];
}

export { postcssSugarPluginUiTabInterface as interface };

export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTabParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTabParams = {
        style: 'solid',
        shape: 'default',
        grow: false,
        direction: 'horizontal',
        outline: true,
        scope: ['bare', 'lnf', 'grow', 'direction'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

    if (finalParams.outline) {
        vars.push(`
        & > *:focus:not(:hover) {
          @sugar.outline;
        }
      `);
    }

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        font-size: sugar.scalable(1rem);
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    `);
    }

    if (finalParams.grow && finalParams.scope.indexOf('grow') !== -1) {
        vars.push(`
      ${
          finalParams.grow && finalParams.scope.indexOf('grow') !== -1
              ? `
        & > * {
          flex-grow: 1;
        }
      `
              : ''
      }
    `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          /** background-color: sugar.color(current, surface); */
          user-select: none;

          & > * > * {
            @sugar.color(main);
          }

          & > * {
            text-align: center;
            padding-inline: sugar.theme(ui.tabs.paddingInline);
            padding-block: sugar.theme(ui.tabs.paddingBlock);
            transition: sugar.theme(ui.tabs.transition);
            cursor: pointer;
            display: block;      
          }
      `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
          & > * {
            @sugar.state.active {
              background-color: sugar.color(current);
              color: sugar.color(current, foreground);
            }
            @sugar.state.hover {
              background-color: sugar.color(current, --lighten 5);
            }       
          }
        `);
                break;
        }
    }

    // if (finalParams.style === 'gradient' && finalParams.scope.indexOf('style') !== -1) {
    //     vars.push(`
    //   & > dt,
    //   & > li,
    //   & > div,
    //   & > * {
    //     @sugar.state.hover {
    //       @sugar.gradient($start: sugar.color(complementary, gradientStart), $end: sugar.color(complementary, gradientEnd), $angle: 90deg, $type: linear);
    //     }
    //     @sugar.state.active {
    //       @sugar.gradient($start: sugar.color(current, gradientStart), $end: sugar.color(current, gradientEnd), $angle: 90deg, $type: linear);
    //     }
    //   }
    // `);
    // }

    if (
        finalParams.direction === 'vertical' &&
        finalParams.scope.indexOf('direction') !== -1
    ) {
        vars.push(`
          display: block;

          & > * {
            display: block;
            text-align: inherit;
          }
        `);
    }

    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                border-radius: 0 !important;
                & > * {
                  border-radius: 0 !important;
                }
              `);

                break;
            case 'pill':
                vars.push(`

                border-radius: 9999px;

                & > *:first-child {
                  border-top-left-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: 9999px;
                  border-bottom-right-radius: 9999px;
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: 9999px;
                  border-bottom-right-radius: 9999px;
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child {
                  border-top-left-radius: 9999px !important;
                  border-bottom-left-radius: 9999px !important;
                  border-top-right-radius: 9999px !important;
                  border-bottom-right-radius: 9999px !important;
                }

              `);

                if (finalParams.direction === 'vertical') {
                    vars.push(`
                    & > *:first-child {
                      border-top-left-radius: 9999px !important;
                      border-bottom-left-radius: 0 !important;
                      border-top-right-radius: 9999px !important;
                      border-bottom-right-radius: 0 !important;
                    }
                    & > *:last-child {
                      border-top-left-radius: 0 !important;
                      border-bottom-left-radius: 9999px !important;
                      border-top-right-radius: 0 !important;
                      border-bottom-right-radius: 9999px !important;
                    }
                  `);
                }

                break;
            default:
                vars.push(`

                border-radius: sugar.theme(ui.tabs.borderRadius);

                & > *:first-child {
                  border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
                  border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
                  border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
                  border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
                  border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child {
                  border-top-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
                  border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
                  border-top-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
                  border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
                }
              `);

                if (finalParams.direction === 'vertical') {
                    vars.push(`
                    & > *:first-child {
                      border-top-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
                      border-bottom-left-radius: 0 !important;
                      border-top-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
                      border-bottom-right-radius: 0 !important;
                    }
                    & > *:last-child {
                      border-top-left-radius: 0 !important;
                      border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
                      border-top-right-radius: 0 !important;
                      border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
                    }
                  `);
                }

                break;
        }
    }

    return vars;
}
