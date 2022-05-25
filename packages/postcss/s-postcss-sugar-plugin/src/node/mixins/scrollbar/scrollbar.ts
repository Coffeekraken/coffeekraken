import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           scrollbar
 * @namespace      node.mixin.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @example        css
 * body {
 *    @sugar.scrollbar(accent, 5px);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginScrollbarInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.defaultColor'),
            },
            background: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.defaultColor'),
            },
            size: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.size'),
            },
        };
    }
}

export interface IPostcssSugarPluginScrollbarParams {
    size: string;
    color: string;
    background: string;
}

export { postcssSugarPluginScrollbarInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginScrollbarParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginScrollbarParams = {
        size: '5px',
        color: 'accent',
        background: 'main',
        ...params,
    };

    const vars: string[] = [];

    // lnf
    vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.size};
          height: ${finalParams.size};
      }
      &::-webkit-scrollbar-track {
            ${
                finalParams.background.match(/^sugar\.color/) ??
                finalParams.background.match(/^(var|hsla?|rgba?)\(/)
                    ? `
                background-color: ${finalParams.background};
            `
                    : `
                background-color: sugar.color(${finalParams.background}, --alpha 0.1);
            `
            }

      }
      &::-webkit-scrollbar-thumb {
          ${
              finalParams.color.match(/^sugar\.color/) ||
              finalParams.color.match(/^(var|hsla?|rgba?)\(/)
                  ? `
                background-color: ${finalParams.color};
          `
                  : `
            background-color: sugar.color(${finalParams.color});
          `
          }
      }
  `);

    return vars;
}
