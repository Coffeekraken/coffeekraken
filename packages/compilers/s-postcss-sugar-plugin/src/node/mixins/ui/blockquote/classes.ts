import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiBlockquoteClassesInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiBlockquoteClassesParams {
}

export { postcssSugarPluginUiBlockquoteClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiBlockquoteClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {

  const finalParams: IPostcssSugarPluginUiBlockquoteClassesParams = {
    ...params
  };

  const vars: string[] = [];


    const cls = `s-blockquote`;

    vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a simple blockquote
        * 
        * @feature      Support vertical rhythm
        * 
        * @example        html
        * <blockquote class="${cls.trim()}">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .${cls} {
            @sugar.color.remap(ui, sugar.theme(ui.blockquote.defaultColor));
            @sugar.ui.blockquote;
        } 
        blockquote {
            @sugar.rhythm.vertical {
              ${__jsObjectToCssProperties(__theme().config('ui.blockquote.:rhythmVertical'))}
            }
        } 
    `);

    vars.push(`/**
        * @name           s-format:text
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a simple blockquote tag in the s-format:text scope
        * 
        * @feature      Support vertical rhythm
        * 
        * @example        html
        * <div class="s-format\:text">
        *   <blockquote>
        *       <p>Hello world</p>
        *   </blockquote>
        * </div>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-format--text blockquote {
            @sugar.color.remap(ui, ${__theme().config('ui.blockquote.defaultColor')});
            @sugar.ui.blockquote;
        } 
    `);

    Object.keys(__theme().baseColors()).forEach((colorName) => {
    vars.push(`/**
        * @name           s-blockquote:${colorName}
        * @namespace      sugar.css.ui.blockquote
        * @type           CssClass
        * 
        * This class represent a simple "<s-color="${colorName}">${colorName}</s-color> blockquote
        * 
        * @example        html
        * <blockquote class="s-blockquote\:${colorName}">
        *   <p>Hello world</p>
        * </blockquote>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-blockquote--${colorName} {
            @sugar.color.remap(ui, ${colorName});
        } 
    `);
  });

  replaceWith(vars);

}
