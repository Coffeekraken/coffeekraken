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
        scope: {
            type: 'Array<String>',
            values: ['bare', 'lnf', 'grow', 'direction'],
            default: ['bare', 'lnf', 'grow', 'direction'],
        },
    };
}

export interface IPostcssSugarPluginUiTabParams {
    grow: boolean;
    style: 'solid';
    direction: 'horizontal' | 'vertical';
    scope: string[];
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
        style: __theme().config('ui.tabs.defaultStyle'),
        grow: false,
        direction: 'horizontal',
        scope: ['bare', 'lnf', 'grow', 'direction'],
        ...params,
    };

    const vars: string[] = [];

    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
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
          /** background-color: sugar.color(ui, surface); */
          border-radius: sugar.theme(ui.tabs.borderRadius);
          overflow: hidden;
          user-select: none;

            & > * {
              text-align: center;
              padding-inline: sugar.scalable(sugar.theme(ui.tabs.paddingInline));
              padding-block: sugar.scalable(sugar.theme(ui.tabs.paddingBlock));
              transition: sugar.theme(ui.tabs.transition);
              cursor: pointer;
              display: block;      
            }
      `);
        if (finalParams.direction !== 'vertical') {
            vars.push(`
          & > *:last-child:not([dir="rtl"] & > *) {
            border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
            border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
          }
          [dir="rtl"] & > *:last-child,
          &[dir="rtl"] > *:last-child {
            border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
            border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
          }
        `);
        }
    }

    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
          & > dt,
          & > li,
          & > div {
            @sugar.state.hover {
              background-color: sugar.color(ui, --alpha 0.4);
            }
            @sugar.state.focus {
              background-color: sugar.color(ui, --alpha 0.3);
            }
            @sugar.state.active {
              background-color: sugar.color(ui);
              color: sugar.color(ui, foreground);
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
    //       @sugar.gradient($start: sugar.color(ui, gradientStart), $end: sugar.color(ui, gradientEnd), $angle: 90deg, $type: linear);
    //     }
    //   }
    // `);
    // }

    if (finalParams.direction === 'vertical' && finalParams.scope.indexOf('direction') !== -1) {
        vars.push(`
      display: block;

      & > dt,
      & > li,
      & > div,
      & > * {
        display: block;
        text-align: inherit;
      }
    `);
    }

    replaceWith(vars);
}
