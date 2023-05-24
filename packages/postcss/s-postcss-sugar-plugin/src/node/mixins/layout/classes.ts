import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __unique } from '@coffeekraken/sugar/array';

/**
 * @name           classes
 * @as              @sugar.layout.classes
 * @namespace      node.mixin.layout
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the layout helper classes like s-layout:12, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.layout.classes
 *
 * @example        css
 * \@sugar.layout.classes;
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
       * @namespace          sugar.style.layout
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
      .s-layout--${id} {
        @sugar.layout(${layout}, $scope: bare);
      }
    `,
            { type: 'CssClass' },
        );
    });

    const spaces = __STheme.get('space');

    Object.keys(spaces).forEach((spaceName) => {
        const clsX = `s-layout:gap-x-${spaceName}`.replace('-default', '');
        const clsY = `s-layout:gap-y-${spaceName}`.replace('-default', '');
        const cls = `s-layout:gap-${spaceName}`.replace('-default', '');

        vars.comment(
            () => `
      /**
       * @name       ${clsX}
       * @namespace          sugar.style.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${clsX.replace(':', ':')}">
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
      .${clsX.replace(':', '--')} > * {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
      }
    `,
            { type: 'CssClass' },
        );

        vars.comment(
            () => `
      /**
       * @name       ${clsY}
       * @namespace          sugar.style.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${clsY.replace(':', ':')}">
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
        .${clsY.replace(':', '--')} > * {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
      }
    `,
            { type: 'CssClass' },
        );

        vars.comment(
            () => `
      /**
       * @name       ${cls}
       * @namespace          sugar.style.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${cls.replace(':', ':')}">
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
      .${cls.replace(':', '--')} > * {
        padding: sugar.space(${spaceName});
      }
    `,
            { type: 'CssClass' },
        );
    });

    vars.comment(
        () => `
     /**
       * @name       s-layout:gap-between
       * @namespace          sugar.style.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to specify that you want only gaps between layout items
       * 
       * @example     html
       * <div class="s-layout:123 s-layout:gap-between">
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
      .s-layout--gap-between > * {
        &:first-child {
          padding-left: 0 !important;
        }
        &:last-child {
          padding-right: 0 !important;
        }
      }
  `,
        { type: 'CssClass' },
    );

    // align items
    ['start', 'end', 'center', 'stretch'].forEach((align) => {
        vars.comment(
            () => `
      /**
         * @name       s-layout:align-${align}
         * @namespace          sugar.style.layout
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
        .s-layout--align-${align} {
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
         * @namespace          sugar.style.layout
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
        .s-layout--justify-${justify} {
          justify-items: ${justify};
        }
    `,
            { type: 'CssClass' },
        );
    });

    return vars;
}
