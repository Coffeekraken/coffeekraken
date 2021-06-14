import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiTabInterface extends __SInterface {
  static definition = {
    style: {
      type: 'String',
      values: ['default', 'gradient'],
      default: 'default'
    },
    grow: {
      type: 'Boolean',
      default: false
    },
    scope: {
      type: 'Array<String>',
      values: ['bare','lnf','grow','style'],
      default: ['bare','lnf','grow','style']
    }
  };
}

export interface IPostcssSugarPluginUiTabParams {
  grow: boolean;
  style: 'default' | 'gradient';
  scope: string[];
}

export { postcssSugarPluginUiTabInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiTabParams>;
  atRule: any;
  replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTabParams = {
      style: 'default',
      grow: false,
      scope: ['bare','lnf','grow','style'],
      ...params
    };

    console.log(finalParams);

  const vars: string[] = [];

  if (finalParams.scope.indexOf('bare') !== -1) {
    vars.push(`
      @sugar.scope.bare {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
      }
    `);
  }

  if (finalParams.grow && finalParams.scope.indexOf('grow') !== -1) {
    vars.push(`
      ${finalParams.grow && finalParams.scope.indexOf('grow') !== -1 ? `
        & > * {
          flex-grow: 1;
        }
      `: ''}
    `);
  }

  if (finalParams.scope.indexOf('lnf') !== -1) {
    vars.push(`
      @sugar.scope.lnf {

          & > * {
            text-align: center;
            padding: ${__themeVar('ui.tab.padding')};
            background-color: sugar.color(ui, surface);
            color: sugar.color(ui, foreground);
            @sugar.transition (fast);
            cursor: pointer;
            display: block;      
          }
      }
    `);
  }

  if (finalParams.style === 'default' && finalParams.scope.indexOf('style') !== -1) {
    vars.push(`
      @sugar.scope.lnf {
        & > * {
          @sugar.state.hover {
            background-color: sugar.color(accent);
          }
          @sugar.state.active {
            background-color: sugar.color(complementary);
          }          
        }
      }
    `);
  }

  if (finalParams.style === 'gradient' && finalParams.scope.indexOf('style') !== -1) {
    vars.push(`
      @sugar.scope.lnf {
        & > *:hover {
            @sugar.gradient.linear($start: sugar.color(accent, gradientStart), $end: sugar.color(accent, gradientEnd), $angle: 90deg);
            background-color: red !important;
        }
        & > * {
          @sugar.state.active {
            @sugar.gradient.linear($start: sugar.color(complementary, gradientStart), $end: sugar.color(complementary, gradientEnd), $angle: 90deg);
          }          
        }
      }
    `);
  }


  replaceWith(vars);
}
