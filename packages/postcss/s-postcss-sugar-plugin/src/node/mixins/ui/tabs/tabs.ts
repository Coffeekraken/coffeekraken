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
 * @param       {Boolean}           [grow=false]                  Specify if you want your tabs to grow and take all the available place or not
 * @param       {'vertical'|'horizontal'}       [direction='horizontal']                Specify if you want your tabs to be vertical or horizontal
 * @param       {Boolean}           [outline=true]                      Specify if you want your tabs to have an outline on focus or not
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @snippet     @sugar.ui.tabs
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
          @sugar.color(main);

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
        vars.push(`
          & > * {
            @sugar.state.active {
              background-color: sugar.color(current);
              color: sugar.color(current, foreground);
            }
            @sugar.state.hover {
              background-color: sugar.color(current, --lighten 5);
              color: sugar.color(current, foreground);
            }       
          }
        `);

        vars.push(`

                border-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));

                & > *:first-child,
                & > template + * {
                  border-top-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-bottom-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-bottom-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child,
                [dir="rtl"] & > template + *,
                &[dir="rtl"] > template + * {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-bottom-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-bottom-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child,
                & > template + *:last-child {
                  border-top-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                  border-bottom-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                  border-top-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                  border-bottom-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                }
              `);
    }

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

        if (finalParams.direction === 'vertical') {
            vars.push(`
                  & > *:first-child,
                  & > template + * {
                    border-top-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                    border-bottom-left-radius: 0 !important;
                    border-top-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                    border-bottom-right-radius: 0 !important;
                  }
                  & > *:last-child {
                    border-top-left-radius: 0 !important;
                    border-bottom-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                    border-top-right-radius: 0 !important;
                    border-bottom-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                  }
                `);
        }
    }

    // wireframe
    vars.push(`
      & > * {
        @sugar.wireframe {
          @sugar.wireframe.border;
          @sugar.wireframe.background;
        }

        &.active {
          @sugar.wireframe {
            @sugar.wireframe.surface;
          }
        }

      }
    `);

    return vars;
}
