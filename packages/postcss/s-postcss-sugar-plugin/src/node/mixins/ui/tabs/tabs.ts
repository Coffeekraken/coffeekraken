import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          tabs
 * @namespace     node.mixin.ui.tabs
 * @type               PostcssMixin
 * @interface     ./tabs          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the tabs style to any element
 *
 * @param       {'default'}           [style='theme.ui.tabs.defaultLnf']        The style you want for your tabs
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiTabInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                description: 'Specify the look and feel you want for your tabs',
                values: ['default'],
                default: __STheme.get('ui.tabs.defaultLnf'),
            },
            grow: {
                type: 'Boolean',
                description:
                    'Specify if you want your tabs to take all the available place of not',
                default: false,
            },
            fill: {
                type: 'Boolean',
                description:
                    'Specify if you want your tabs to be filled with a background color or not',
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
                default: __STheme.get('ui.tabs.outline'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                description: 'Specify the scope(s) you want to generate',
                values: ['bare', 'lnf', 'grow', 'fill', 'direction'],
                default: ['bare', 'lnf', 'grow', 'fill', 'direction'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiTabParams {
    lnf: 'default';
    grow: boolean;
    fill: boolean;
    direction: 'horizontal' | 'vertical';
    outline: boolean;
    scope: ('bare' | 'lnf' | 'grow' | 'fill' | 'direction')[];
}

export { postcssSugarPluginUiTabInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTabParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTabParams = {
        lnf: 'default',
        grow: false,
        fill: false,
        direction: 'horizontal',
        outline: true,
        scope: ['bare', 'lnf', 'grow', 'fill', 'direction'],
        ...params,
    };

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
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;

        & > template {
          display: none;
        }
    `);
    }

    if (finalParams.grow && finalParams.scope.indexOf('grow') !== -1) {
        vars.push(`
      ${
          finalParams.grow && finalParams.scope.indexOf('grow') !== -1
              ? `
              display: flex;
              
              & > * {
                flex-grow: 1;
              }
      `
              : ''
      }
    `);
    }

    if (finalParams.fill && finalParams.scope.indexOf('fill') !== -1) {
        vars.push(`
      ${
          finalParams.fill && finalParams.scope.indexOf('fill') !== -1
              ? `
              background: sugar.color(current, surface);
      `
              : ''
      }
    `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          user-select: none;

          & > * > * {
            @sugar.color(main);
          }

          & > * {
            text-align: center;
            padding-inline: sugar.padding(ui.tabs.paddingInline);
            padding-block: sugar.padding(ui.tabs.paddingBlock);
            transition: sugar.theme(ui.tabs.transition);
            cursor: pointer;
            display: block;      
          }
      `);
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.lnf) {
            case 'default':
            default:
                vars.push(`
          & > * {
            color: sugar.color(current, foreground);

            @sugar.state.active {
              background-color: sugar.color(current);
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

    // if (finalParams.scope.includes('shape')) {
    //     switch (finalParams.shape) {
    //         case 'square':
    //             vars.push(`
    //             border-radius: 0 !important;
    //             & > * {
    //               border-radius: 0 !important;
    //             }
    //           `);

    //             break;
    //         case 'pill':
    //             vars.push(`

    //             border-radius: 9999px;

    //             & > *:first-child,
    //             & > template + * {
    //               border-top-left-radius: 9999px;
    //               border-bottom-left-radius: 9999px;
    //               border-top-right-radius: 0;
    //               border-bottom-right-radius: 0;
    //             }
    //             & > *:last-child {
    //               border-top-left-radius: 0;
    //               border-bottom-left-radius: 0;
    //               border-top-right-radius: 9999px;
    //               border-bottom-right-radius: 9999px;
    //             }

    //             [dir="rtl"] & > *:first-child,
    //             &[dir="rtl"] > *:first-child,
    //             [dir="rtl"] & > template + *,
    //             &[dir="rtl"] > template + * {
    //               border-top-left-radius: 0;
    //               border-bottom-left-radius: 0;
    //               border-top-right-radius: 9999px;
    //               border-bottom-right-radius: 9999px;
    //             }
    //             [dir="rtl"] & > *:last-child,
    //             &[dir="rtl"] > *:last-child {
    //               border-top-left-radius: 9999px;
    //               border-bottom-left-radius: 9999px;
    //               border-top-right-radius: 0;
    //               border-bottom-right-radius: 0;
    //             }

    //             & > *:first-child:last-child,
    //             & > template + *:last-child {
    //               border-top-left-radius: 9999px !important;
    //               border-bottom-left-radius: 9999px !important;
    //               border-top-right-radius: 9999px !important;
    //               border-bottom-right-radius: 9999px !important;
    //             }

    //           `);

    //             if (finalParams.direction === 'vertical') {
    //                 vars.push(`
    //                 & > *:first-child,
    //                 & > template + * {
    //                   border-top-left-radius: 9999px !important;
    //                   border-bottom-left-radius: 0 !important;
    //                   border-top-right-radius: 9999px !important;
    //                   border-bottom-right-radius: 0 !important;
    //                 }
    //                 & > *:last-child {
    //                   border-top-left-radius: 0 !important;
    //                   border-bottom-left-radius: 9999px !important;
    //                   border-top-right-radius: 0 !important;
    //                   border-bottom-right-radius: 9999px !important;
    //                 }
    //               `);
    //             }

    //             break;
    //         default:
    //             vars.push(`

    //             border-radius: sugar.border.radius(ui.tabs.borderRadius);

    //             & > *:first-child,
    //             & > template + * {
    //               border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-top-right-radius: 0;
    //               border-bottom-right-radius: 0;
    //             }
    //             & > *:last-child {
    //               border-top-left-radius: 0;
    //               border-bottom-left-radius: 0;
    //               border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius);
    //             }

    //             [dir="rtl"] & > *:first-child,
    //             &[dir="rtl"] > *:first-child,
    //             [dir="rtl"] & > template + *,
    //             &[dir="rtl"] > template + * {
    //               border-top-left-radius: 0;
    //               border-bottom-left-radius: 0;
    //               border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius);
    //             }
    //             [dir="rtl"] & > *:last-child,
    //             &[dir="rtl"] > *:last-child {
    //               border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-top-right-radius: 0;
    //               border-bottom-right-radius: 0;
    //             }

    //             & > *:first-child:last-child,
    //             & > template + *:last-child {
    //               border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //               border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //               border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //               border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //             }
    //           `);

    //             if (finalParams.direction === 'vertical') {
    //                 vars.push(`
    //                 & > *:first-child,
    //                 & > template + * {
    //                   border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //                   border-bottom-left-radius: 0 !important;
    //                   border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //                   border-bottom-right-radius: 0 !important;
    //                 }
    //                 & > *:last-child {
    //                   border-top-left-radius: 0 !important;
    //                   border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //                   border-top-right-radius: 0 !important;
    //                   border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //                 }
    //               `);
    //             }

    //             break;
    //     }
    // }

    return vars;
}
