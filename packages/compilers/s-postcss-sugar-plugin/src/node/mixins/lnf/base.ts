import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginLiikAndFeelBaseInterface extends __SInterface {
  static definition = {
    layout: {
      type: 'String',
      required: true
    }
  };
}

export interface IPostcssSugarPluginLookAndFeelBaseParams {
  layout: string;
}

export { postcssSugarPluginLiikAndFeelBaseInterface as interface };

/**
 * @name          base
 * @namespace     sugar.postcss.mixin.lnf
 * @type          PostcssMixin
 *
 * This mixin apply some base look and feel depending on the current theme like:
 *
 * - Page background using the <s-color="accent">background</s-color> theme color
 * - Text color using the <s-color="accent">default</s-color> theme color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @example       css
 * \@sugar.lnf.base;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: IPostcssSugarPluginLookAndFeelBaseParams;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginLookAndFeelBaseParams = {
    ...params
  };

  const vars: string[] = [];

  let selector = '&';
  if (atRule.parent && atRule.parent.type === 'root') {
    selector = 'html';

    vars.push(`
      body {

      }
    `);

  } 

   vars.push(
    `
    @sugar.scope(lnf) {
        ${selector} {
            color: sugar.color(main, text);
            @sugar.font.family(default);
            @sugar.font.size(default);
        }
        ::selection {
            color: sugar.color(accent, text);
            background-color: sugar.color(accent);
        }
    }
    `
   );

  replaceWith(vars);
}
