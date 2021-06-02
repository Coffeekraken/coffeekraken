import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUiTerminalClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginUiTerminalClassesParams {}

export { postcssSugarPluginUiTerminalClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiTerminalClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiTerminalClassesParams = {
    ...params
  };

  const vars: string[] = [
    `
    @sugar.scope(bare) {

        /**
         * @name            s-terminal
         * @namespace       sugar.css.ui.terminal
         * @type            CssClass
         * 
         * This class allows you to apply a terminal look to any HTMLElement
         * 
         * @example         css
         * <span class="s-terminal">
         *  Something cool
         * </span>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-terminal {
            @sugar.ui.terminal;
        }
    }

  `
  ];

  replaceWith(vars);
}
