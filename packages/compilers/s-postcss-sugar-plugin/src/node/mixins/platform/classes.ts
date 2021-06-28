import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __fs from 'fs';

class postcssSugarPluginPlatformClassesMixinInterface extends __SInterface {
  static definition = {
    platforms: {
      type: 'Array<String>'
    }
  };
}

export interface IPostcssSugarPluginPlatformClassesParams {
  platforms: string[];
}

export { postcssSugarPluginPlatformClassesMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginPlatformClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginPlatformClassesParams = {
    platforms: [],
    ...params
  };

  // list all the available platforms in the folder
  const files = __fs.readdirSync(`${__dirname}/platforms`);

  const vars: string[] = [];

  files.forEach(filename => {
    const name = filename.split('.')[0];

    if (finalParams.platforms && finalParams.platforms.indexOf(name) === -1) return;

    vars.push(`
        
        /**
         * @name            s-platform--${name}
         * @namespace       sugar.css.mixins.platform
         * @type            CssClass
         * 
         * This class allows you to display a plarform "icon" like "js", "node, "php", etc...
         * 
         * @example     html
         * <i class="s-platform--${name} s-font:50"></i>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-platform--${name} {
          @sugar.platform(${name});
        }

  `);

  });

  replaceWith(vars);
}
