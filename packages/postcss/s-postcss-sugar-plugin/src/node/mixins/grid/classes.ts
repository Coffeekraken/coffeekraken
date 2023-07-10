import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @as              @sugar.grid.classes
 * @namespace      node.mixin.grid
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the grid helper classes like s-grid:12, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.grid.classes
 *
 * @example        css
 * \@sugar.grid.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginGridClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginGridClassesParams {}

export { postcssSugarPluginGridClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginGridClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginGridClassesParams = {
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
         * @status      beta
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
        .s-grid--${id} {
          display: grid;
          grid-template-columns: repeat(${grid}, minmax(0, 1fr));
        }
      `,
            { type: 'CssClass' },
        );
    });

    return vars;
}
