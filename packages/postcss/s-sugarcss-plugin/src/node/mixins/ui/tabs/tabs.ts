import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          tabs
 * @as            @s.ui.tabs
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
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet     @s.ui.tabs
 *
 * @example     css
 * .my-tabs {
 *    @s.ui.tabs;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiTabInterface extends __SInterface {
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
                default: __STheme.current.get('ui.tabs.outline'),
            },
        };
    }
}

export interface ISSugarcssPluginUiTabParams {
    grow: boolean;
    fill: boolean;
    direction: 'horizontal' | 'vertical';
    outline: boolean;
}

export { SSugarcssPluginUiTabInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiTabParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiTabParams = {
        grow: false,
        fill: false,
        direction: 'horizontal',
        outline: true,
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.outline) {
        vars.push(`
        & > *:focus:not(:hover) {
          @s.outline;
        }
      `);
    }

    vars.push(`@s.scope 'bare' {`);

    vars.push(`
        font-size: s.scalable(1rem);
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;

        & > template {
          display: none;
        }
    `);

    if (finalParams.grow) {
        vars.push(`
          display: flex;
                
          & > * {
            flex-grow: 1;
          }
        `);
    }

    vars.push('}');

    vars.push(`@s.scope 'lnf' {`);

    if (finalParams.fill) {
        vars.push(`
        background: s.color(current, surface);
      `);
    }

    vars.push(`
          user-select: none;

          & > * {
            text-align: center;
            padding-inline: s.padding(ui.tabs.paddingInline);
            padding-block: s.padding(ui.tabs.paddingBlock);
            transition: s.theme(ui.tabs.transition);
            cursor: pointer;
            display: block;      
          }
      `);

    vars.push(`
          & > * {
            @s.state.active {
              background-color: s.color(current);

              &, * {
                color: s.color(current, foreground);
              }
            }
            @s.state.hover {
              background-color: s.color(current, --lighten 5);

              &, * {
                color: s.color(current, foreground);
              }
            }       
          }
        `);

    vars.push(`

                border-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));

                & > *:first-child,
                & > template + * {
                  border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child,
                [dir="rtl"] & > template + *,
                &[dir="rtl"] > template + * {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child,
                & > template + *:last-child {
                  border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
                  border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
                  border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
                  border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
                }
              `);

    vars.push('}');

    vars.push(`@s.scope 'bare' {`);

    if (finalParams.direction === 'vertical') {
        vars.push(`
          display: block;

          & > * {
            display: block;
            text-align: inherit;
          }
        `);

        vars.push(`
            & > *:first-child,
            & > template + * {
              border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
              border-bottom-left-radius: 0 !important;
              border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
              border-bottom-right-radius: 0 !important;
            }
            & > *:last-child {
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
            }
        `);
    }

    vars.push('}');

    return vars;
}
