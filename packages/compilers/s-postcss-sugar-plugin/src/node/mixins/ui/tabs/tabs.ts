import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiTabInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.tabs.defaultStyle'),
        },
        grow: {
            type: 'Boolean',
            default: false,
        },
        direction: {
            type: 'String',
            values: ['vertical', 'horizontal'],
            default: 'horizontal',
        },
        outline: {
            type: 'Boolean',
            default: __theme().config('ui.tabs.outline'),
        },
        scope: {
            type: {
                type: 'Array<String>',
                splitChars: [',', ' '],
            },
            values: ['bare', 'lnf', 'grow', 'direction'],
            default: ['bare', 'lnf', 'grow', 'direction'],
        },
    };
}

export interface IPostcssSugarPluginUiTabParams {
    grow: boolean;
    style: 'solid';
    direction: 'horizontal' | 'vertical';
    outline: boolean;
    scope: string[];
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
        style: __theme().config('ui.tabs.defaultStyle'),
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
        & > * {
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
          border-radius: sugar.theme(ui.tabs.borderRadius);
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
    }

    replaceWith(vars);
}
