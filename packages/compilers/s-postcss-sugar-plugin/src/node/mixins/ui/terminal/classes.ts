import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUiTerminalClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginUiTerminalClassesParams {}

export { postcssSugarPluginUiTerminalClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/terminal.js`],
    };
}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTerminalClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTerminalClassesParams = {
        ...params,
    };

    const vars: string[] = [
        `
        /**
         * @name            s-terminal
         * @namespace       sugar.css.ui.terminal
         * @type            CssClass
         * 
         * This class allows you to apply a terminal look to any HTMLElement
         * 
         * @feature       Support vertical rhythm
         * 
         * @example         css
         * <span class="s-terminal">
         *  Something cool
         * </span>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        .s-terminal {
            @sugar.ui.terminal;
        }
  `,
    ];

    return vars;
}
