import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginUiTerminalInterface extends __SInterface {
    static get definition() {
        return {};
    }
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
        ${__STheme.jsObjectToCssProperties(
            __STheme.config('ui.terminal.rhythmVertical'),
        )}
    } 

    `);

    return vars;
}
