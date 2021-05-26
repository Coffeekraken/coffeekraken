import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiNavbarInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginUiNavbarParams {}

export { postcssSugarPluginUiNavbarInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginUiNavbarParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginUiNavbarParams = {
    ...params
  };

  const vars: string[] = [];

  // bare
  vars.push(`
      @sugar.scope.bare {
        display: flex;
        align-items: center;

        & > * {
            flex-grow: 0;
        }
      }
    `);

  // lnf
  vars.push(`
      @sugar.scope.lnf {

    }
  `);

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
