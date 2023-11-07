import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @as              @s.grid.classes
 * @namespace      node.mixin.grid
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the grid helper classes like s-grid:12, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.grid.classes
 *
 * @example        css
 * @s.grid.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginGridClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginGridClassesParams {}

export { SSugarcssPluginGridClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginGridClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginGridClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const layoutConfig = __STheme.get('layout');

    const grids = layoutConfig.grid;
    Object.keys(grids).forEach((id) => {
        const grid = grids[id];
        vars.comment(
            () => `
        /**
         * @name       s-grid:${id}
         * @namespace          sugar.style.helpers.grid
         * @type          CssClass
         * @platform      css
         * @status      alpha
         * 
         * This class represent a grid of "<yellow>${id}</yellow> columns"
         * 
         * @example     html
         * <div class="s-container s-grid:${id}">
         *    ${Array(12)
             .map((idx) => {
                 return `<div>I'm the grid item ${idx}</div>`;
             })
             .join('\n')}
        * </div>
        * 
        * @since     2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
      `,
        ).code(
            `
        .s-grid-${id} {
          display: grid;
          grid-template-columns: repeat(${grid}, minmax(0, 1fr));
        }
      `,
            { type: 'CssClass' },
        );
    });

    return vars;
}
