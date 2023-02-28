import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginComponentsClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr', 'tf'],
                default: ['bare', 'lnf', 'vr', 'tf'],
            },
        };
    }
}
export { postcssSugarPluginComponentsClassesInterface as interface };

/**
 * @name           classes
 * @namespace      node.mixin.component
 * @type           PostcssMixin
 * @platform        postcss
 * @status        wip
 *
 * This mixin allows you to print all the ui classes for listed in the theme config components
 *
 * @example        css
 * \@sugar.components.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: any;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: any = {
        scope: ['bare', 'lnf', 'vr', 'tf'],
        ...params,
    };

    const vars: string[] = [];

    const componentsObj = __STheme.get('components');

    Object.keys(componentsObj).forEach((selector) => {
        if (finalParams.scope.indexOf('bare') !== -1) {
            vars.push(`
          ${selector} {
            ${__STheme.jsObjectToCssProperties(componentsObj[selector], {
                exclude: ['rhythmVertical'],
            })}
          }
        `);
        }

        if (finalParams.scope.indexOf('vr') !== -1) {
            vars.push(`
          @sugar.rhythm.vertical {
            ${selector} {
              ${__STheme.jsObjectToCssProperties(
                  componentsObj[selector].rhythmVertical ?? {},
              )}
            }
          }
        `);
        }
    });

    replaceWith(vars);
}
