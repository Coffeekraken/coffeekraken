import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiTabInterface extends __SInterface {
  static definition = {
    style: {
      type: 'String',
      values: ['default', 'gradient'],
      default: __theme().config('ui.tabs.defaultStyle')
    },
    grow: {
      type: 'Boolean',
      default: false
    },
    direction: {
      type: 'String',
      values: ['vertical','horizontal'],
      default : 'horizontal'
    },
    scope: {
      type: 'Array<String>',
      values: ['bare','lnf','grow','style','direction'],
      default: ['bare','lnf','grow','style','direction']
    }
  };
}

export interface IPostcssSugarPluginUiTabParams {
  grow: boolean;
  style: 'default' | 'gradient';
  direction: 'horizontal' | 'vertical';
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
      style: __theme().config('ui.tabs.defaultStyle'),
      grow: false,
      direction: 'horizontal',
      scope: ['bare','lnf','grow','style','direction'],
      ...params
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
      ${finalParams.grow && finalParams.scope.indexOf('grow') !== -1 ? `
        & > * {
          flex-grow: 1;
        }
      `: ''}
    `);
  }

  if (finalParams.scope.indexOf('lnf') !== -1) {
    vars.push(`
      background-color: sugar.color(ui, surface);
      border-radius: sugar.theme(ui.tabs.borderRadius);
      box-shadow: sugar.theme(ui.tabs.depth);
      overflow: hidden;

        & > * {
          text-align: center;
          padding: sugar.theme('ui.tabs.padding');
          background-color: sugar.color(ui, surface);
          color: sugar.color(ui, foreground);
          transition: sugar.theme(ui.tabs.transition);
          cursor: pointer;
          display: block;      
        }
    `);
  }

  if (finalParams.style === 'default' && finalParams.scope.indexOf('style') !== -1) {
    vars.push(`
      & > dt,
      & > li,
      & > div {
        @sugar.state.hover {
          background-color: sugar.color(complementary);
        }
        @sugar.state.active {
          background-color: sugar.color(accent);
        }          
      }
    `);
  }

  if (finalParams.style === 'gradient' && finalParams.scope.indexOf('style') !== -1) {
    vars.push(`
      & > dt,
      & > li,
      & > div,
      & > * {
        @sugar.state.hover {
          @sugar.gradient($start: sugar.color(complementary, gradientStart), $end: sugar.color(complementary, gradientEnd), $angle: 90deg, $type: linear);
        }
        @sugar.state.active {
          @sugar.gradient($start: sugar.color(accent, gradientStart), $end: sugar.color(accent, gradientEnd), $angle: 90deg, $type: linear);
        }          
      }
    `);
  }

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
