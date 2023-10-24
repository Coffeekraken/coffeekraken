import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __unique } from '@coffeekraken/sugar/array';

/**
 * @name           classes
 * @as              @s.layout.classes
 * @namespace      node.mixin.layout
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the layout helper classes like s-layout:12, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.layout.classes
 *
 * @example        css
 * @s.layout.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginLayoutClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginLayoutClassesParams {}

export { postcssSugarPluginLayoutClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginLayoutClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginLayoutClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const layoutConfig = __STheme.get('layout');

    const layouts = layoutConfig.layout;
    Object.keys(layouts).forEach((id) => {
        const layout = layouts[id];
        const colsCount = __unique(layout.split(/\n\s/)).length;
        vars.comment(
            () => `
      /**
       * @name       s-layout:${id}
       * @namespace          sugar.style.helpers.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class represent a layout of "<yellow>${layout}</yellow>"
       * 
       * @example     html
       * <div class="s-container s-layout:${id}">
       *    ${Array(colsCount)
           .map((idx) => {
               return `<div>I'm the area ${idx}</div>`;
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
      .s-layout-${id} {
        @s.layout(${layout}, $scope: bare);
      }
    `,
            { type: 'CssClass' },
        );
    });

    // align items
    ['start', 'end', 'center', 'stretch'].forEach((align) => {
        vars.comment(
            () => `
      /**
         * @name       s-layout:align-${align}
         * @namespace          sugar.style.helpers.layout
         * @type          CssClass
         * @platform      css
         * @status        beta
         * 
         * This allows you to align all the items to "${align}"
         * 
         * @example     html
         * <div class="s-layout:123 s-layout:align-${align}">
         *    ${Array(3)
             .map((idx) => {
                 return `<div>I'm the area ${idx}</div>`;
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
        .s-layout-align-${align} {
          align-items: ${align};
        }
    `,
            { type: 'CssClass' },
        );
    });

    // justify items
    ['start', 'end', 'center', 'stretch'].forEach((justify) => {
        vars.comment(
            () => `
      /**
         * @name       s-layout:justify-${justify}
         * @namespace          sugar.style.helpers.layout
         * @type          CssClass
         * @platform      css
         * @status        beta
         * 
         * This allows you to justify all the items to "${justify}"
         * 
         * @example     html
         * <div class="s-layout:123 s-layout:justify-${justify}">
         *    ${Array(3)
             .map((idx) => {
                 return `<div>I'm the area ${idx}</div>`;
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
        .s-layout-justify-${justify} {
          justify-items: ${justify};
        }
    `,
            { type: 'CssClass' },
        );
    });

    return vars;
}
