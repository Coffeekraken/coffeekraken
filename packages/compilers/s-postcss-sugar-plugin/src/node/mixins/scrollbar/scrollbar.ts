import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginScrollbarInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      default: 'accent'
    },
    width: {
      type: 'String',
      default: '5px'
    }
  };
}

export interface IPostcssSugarPluginScrollbarParams {
  color: string;
  width: string;
}

export { postcssSugarPluginScrollbarInterface as interface };
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginScrollbarParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginScrollbarParams = {
    color: 'accent',
    width: '5px',
    ...params
  };

  const vars: string[] = [];

  // lnf
  vars.push(`
    @sugar.scope.lnf {
        &::-webkit-scrollbar {
            width: ${finalParams.width}
        }
        &::-webkit-scrollbar-track {
            background-color: sugar.color(${finalParams.color}, --darken 30);
            background: rgba(0,0,0,0);
        }
        &::-webkit-scrollbar-thumb {
            background-color: sugar.color(${finalParams.color});
        }
    }
  `);

  replaceWith(vars);
}
