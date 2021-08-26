import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiListClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            alias: 's',
        },
    };
}

export interface IPostcssSugarPluginUiListClassesParams {
    styles: string[];
}

export { postcssSugarPluginUiListClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiListClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiListClassesParams = {
        styles: __theme().config('ui.list.styles'),
        ...params,
    };

    const vars: string[] = [];

    vars.push(`/**
        * @name           s-list--interactive
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>interactive</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list\:interactive">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push([`.s-list--interactive {`, `@sugar.ui.list.interactive;`, `}`].join('\n'));

    // ul
    vars.push(`/**
        * @name           s-list--ul
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list--ul">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .s-list--ul {
        @sugar.color.remap(ui, ${__theme().config('ui.list.defaultColor')});
        @sugar.ui.list.ul;
      }

      ul {
        @sugar.rhythm.vertical {
          ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
        }
      } 
  `);

    // ul:icon
    vars.push(`/**
        * @name           s-list--ul.s-list--icon
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list with some "<cyan>icon</cyan>" instead of the default bullet
        * 
        * @example        html
        * <ul class="s-list--ul s-list--icon">
        *   <li>
        *     <i class="s-icon-user" />
        *     Hello
        *   </li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push([`.s-list--icon.s-list--ul {`, `@sugar.ui.list.ul(true);`, `}`].join('\n'));

    vars.push(`/**
        * @name           s-format:text ul
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ul</yellow>" list in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <ul>
        *     <li>Hello</li>
        *     <li>World</li>
        *   </ul>
        * </div>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     ul.s-format--text,
    .s-format--text ul {
        @sugar.color.remap(ui, ${__theme().config('ui.list.defaultColor')});
        @sugar.ui.list.ul;
    } 
  `);

    // ol
    vars.push(`/**
        * @name           s-list--ol
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ol</yellow>" list
        * 
        * @feature       Support vertical rhythm
        * 
        * @example        html
        * <ul class="s-list--ol">
        *   <li>Hello</li>
        *   <li>World</li>
        * </ul>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      .s-list--ol {
        @sugar.color.remap(ui, ${__theme().config('ui.list.defaultColor')});
        @sugar.ui.list.ol;
      }   

      ol {
        @sugar.rhythm.vertical {
          ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
        }
      } 
  `);

    vars.push(`/**
        * @name           s-format:text ol
        * @namespace      sugar.css.ui.list
        * @type           CssClass
        * 
        * This class represent an "<yellow>ol</yellow>" list in the s-format:text scope
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <ol>
        *     <li>Hello</li>
        *     <li>World</li>
        *   </ol>
        * </div>
        * 
        * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
      ol.s-format--text,
      .s-format--text ol {
        @sugar.color.remap(ui, ${__theme().config('ui.list.defaultColor')});
        @sugar.ui.list.ol;
      }
  `);

    Object.keys(__theme().baseColors()).forEach((colorName) => {
        vars.push(`
      /**
       * @name        s-list--${colorName}
       * @namespace     sugar.css.ui.button
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any list
       * 
       * @example       html
       * <ul class="s-list--${colorName}" />
       *   <li>Hello</li>
       *   <li>World</li>
       * </ul>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-list--${colorName} {
        @sugar.color.remap(ui, ${colorName});
      }
    `);
    });

    replaceWith(vars);
}
