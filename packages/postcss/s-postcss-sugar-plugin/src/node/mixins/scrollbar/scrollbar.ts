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
 * @snippet         @sugar.scrollbar($1, $2, $3)
 *
 * @example        css
 * body {
 *    @sugar.scrollbar(accent, complementary, 5px);
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

        @sugar.lod.prevent {

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
        }
  `);

    // wireframe
    vars.push(`
        @sugar.lod.wireframe {
            &::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, .03);
            }
            &::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, .1);
            }
        }
    `);

    return vars;
}
