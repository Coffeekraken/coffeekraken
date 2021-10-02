import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiTerminalInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginUiTerminalParams {}

export { postcssSugarPluginUiTerminalInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTerminalParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTerminalParams = {
        ...params,
    };

    const vars: string[] = [`@sugar.ui.base(terminal);`];

    // bare
    vars.push(`
      &:before {
          content: '$';
          color: sugar.color(complementary);
      }

      @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(
            __theme().config('ui.terminal.rhythmVertical'),
        )}
    } 

    `);

    replaceWith(vars);
}
