import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiListUlInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      required: true,
      default: 'default',
      alias: 'c'
    },
    textColor: {
      type: 'String',
      alias: 't'
    },
    style: {
      type: 'String',
      values: ['default'],
      default: 'default'
    }
  };
}

export interface IPostcssSugarPluginUiListUlParams {
  color: string;
  textColor: string;
  style: 'default';
}

export { postcssSugarPluginUiListUlInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginUiListUlParams>;
  atRule: any;
  processNested: Function;
}) {
  //   const finalParams: IPostcssSugarPluginUiListUlParams = {
  //     color: 'primary',
  //     ...params
  //   };

  const vars: string[] = [];

  // bare
  vars.push(`
      @sugar.scope.bare {
        min-width: 500px;
      }
    `);

  vars.push(`
    @sugar.scope.lnf {
        padding: sugar.space(20);
        background-color: sugar.color(surface);
        border-radius: 5px;
        @sugar.depth (30);

        & > li {
            border-radius: 5px;
            padding: sugar.space(40);
        }

        @sugar.state.hover {
          background-color: sugar.color(primary:hover, surface);
        }

    }
  `);

  // & > li:hover {
  //         background-color: sugar.color(primary, hover);
  //     }
  //     & > li:focus,
  //     & > li[focus] {
  //         background-color: sugar.color(primary, focus);
  //         outline: none;
  //     }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
