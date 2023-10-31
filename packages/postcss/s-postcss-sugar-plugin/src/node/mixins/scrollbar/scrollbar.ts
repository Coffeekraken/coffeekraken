import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           scrollbar
 * @as          @s.scrollbar
 * @namespace      node.mixin.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        stable
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @snippet         @s.scrollbar($1, $2, $3)
 *
 * @example        css
 * body {
 *    @s.scrollbar(accent, complementary, 5px);
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
                default: __STheme.get('ui.scrollbar.color'),
            },
            background: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.color'),
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

        @s.lod.prevent {

            &::-webkit-scrollbar {
                width: ${finalParams.size};
                height: ${finalParams.size};
            }
            &::-webkit-scrollbar-track {
                    ${
                        finalParams.background.match(/^s\.color/) ??
                        finalParams.background.match(/^(var|hsla?|rgba?)\(/)
                            ? `
                        background-color: ${finalParams.background};
                    `
                            : `
                        background-color: s.color(${finalParams.background}, --alpha 0.1);
                    `
                    }

            }
            &::-webkit-scrollbar-thumb {
                ${
                    finalParams.color.match(/^s\.color/) ||
                    finalParams.color.match(/^(var|hsla?|rgba?)\(/)
                        ? `
                        background-color: ${finalParams.color};
                `
                        : `
                    background-color: s.color(${finalParams.color}, --alpha 0.3);
                `
                }
            }
        }
  `);

    return vars;
}
