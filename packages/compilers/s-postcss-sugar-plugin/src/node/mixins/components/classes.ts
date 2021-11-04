import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginComponentsClassesInterface extends __SInterface {
    static definition = {
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
export { postcssSugarPluginComponentsClassesInterface as interface };

/**
 * @name           classes
 * @namespace      mixins.components
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes for listed in the theme config components
 *
 * @example         postcss
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

    const cssArray: string[] = [];

    const componentsObj = __STheme.config('components');

    Object.keys(componentsObj).forEach((selector) => {
        if (finalParams.scope.indexOf('bare') !== -1) {
            cssArray.push(`
          ${selector} {
            ${__STheme.jsObjectToCssProperties(componentsObj[selector], {
                exclude: ['rhythmVertical'],
            })}
          }
        `);
        }

        if (finalParams.scope.indexOf('vr') !== -1) {
            cssArray.push(`
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

    replaceWith(cssArray);
}
