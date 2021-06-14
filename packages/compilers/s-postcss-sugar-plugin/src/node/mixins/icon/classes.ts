import __SInterface from '@coffeekraken/s-interface';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __theme from '../../utils/theme';
import __yaml from 'yaml';
// import * as __fa from '@fortawesome/fontawesome-free';
import * as __fa from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

class postcssSugarPluginIconClassesInterface extends __SInterface {
  static definition = {
    icons: {
      type: {
        type: 'Array<String>',
        splitChars: [',',' ','\n']
      },
      required: true
    }
  };
}

export interface IPostcssSugarPluginIconClassesParams {
  icons: string[]
}

export { postcssSugarPluginIconClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginIconClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginIconClassesParams = {
    icons: [],
    ...params
  };

  const vars: string[] = [];

  finalParams.icons.forEach(icon => {

    const iconName = icon.split(':')[0];
    const as = icon.split(':')[1] ?? iconName;

    // fontawesome
    if (iconName.slice(0,3) === 'fa-') {

      const faIconName = iconName.slice(3);

      vars.push(`
        /**
         * @name        s-icon--${as}
          * @namespace      sugar.css.icon.classes.${as}
          * @type           CssClass
          *
          * This class allows you to display the "<yellow>${as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
          *
          * @example        html
          * <i class="s-icon--${as} s-font:20"></i>
          * <i class="s-icon--${as} s-font:40"></i>
          * <i class="s-icon--${as} s-font:60"></i>
          * <i class="s-icon--${as} s-font:80"></i>
          * <i class="s-icon--${as} s-font:100"></i>
          */
          .s-icon--${as} {
            @sugar.icon.fa(${faIconName});
          }
      `);
    }

  });



  replaceWith(vars);
}
