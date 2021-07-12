import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixins.icon
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the classes needed to display the icons you've
 * passed as parameter.
 * The icons parameter define all the icons you want. Each line define a new icon and you can use these
 * different "adapters" to specify your icons:
 * 
 * - Line syntax: {adapter}:{iconName}:{iconNameYouWant}
 * 
 * Available adapters are:
 * 
 * - Filesystem:
 * Here's some example of filesystem icons declarations:
 * @sugar.icon.classes(
 *    fs:src/icons/vuejs.svg:vue
 *    fs:src/icons/something.svg:something
 * );
 * 
 * - Font awesome (5)
 * Here's some example of font awesome icons declarations:
 * @sugar.icon.classes(
 *    fa:user:user
 *    fa:heart:heart
 *    fa:fire:fire
 *    fa:copy:copy
 *    fa:box-open:box
 * );
 *
 * @param       {String}       icons        The icons you want. Each line define a new icon
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.icon.classes(
 *    fa:user:user
 *    fa:heart:heart
 *    fs:src/icons/vuejs.svg:vue
 *    fa:fire:fire
 *    fa:copy:copy
 *    fa:box-open:box
 * );
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginIconClassesInterface extends __SInterface {
  static definition = {
    icons: {
      type: {
        type: 'Array<String>',
        splitChars: [',',' ','\n']
      },
      default: [],
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

    const protocol = icon.split(':')[0];

    // fontawesome
    if (protocol === 'fa' || protocol === 'fab' || protocol === 'far' || protocol === 'fal' || protocol === 'fad') {
      
      // const as = icon.split(':')[1] ?? iconName;
      const splits = icon.split(':');
      const faIconName = splits[1];
      const as = splits[2] ?? faIconName;

      vars.push(`
        /**
         * @name        s-icon:${as}
          * @namespace      sugar.css.icon
          * @type           CssClass
          * @platform       css
          * @status         beta
          *
          * This class allows you to display the "<yellow>${as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
          *
          * @example        html
          * <i class="s-icon\:${as} s-font\:20"></i>
          * <i class="s-icon\:${as} s-font\:40"></i>
          * <i class="s-icon\:${as} s-font\:60"></i>
          * <i class="s-icon\:${as} s-font\:80"></i>
          * <i class="s-icon\:${as} s-font\:100"></i>
          */
          .s-icon--${as} {
            @sugar.icon.fa(${faIconName}, ${protocol});
          }
      `);
    }

    // filesystem
    if (protocol === 'fs') {
      
      // const as = icon.split(':')[1] ?? iconName;
      const splits = icon.split(':');
      const path = splits[1];
      const as = splits[2];


      vars.push(`
        /**
         * @name        s-icon:${as}
          * @namespace      sugar.css.icon
          * @type           CssClass
          * @platform         css
          * @status         beta
          *
          * This class allows you to display the "<yellow>${as}</yellow>" icon using the "<cyan>i</cyan>" tag like bellow
          *
          * @example        html
          * <i class="s-icon\:${as} s-font\:20"></i>
          * <i class="s-icon\:${as} s-font\:40"></i>
          * <i class="s-icon\:${as} s-font\:60"></i>
          * <i class="s-icon\:${as} s-font\:80"></i>
          * <i class="s-icon\:${as} s-font\:100"></i>
          */
          .s-icon--${as} {
            @sugar.icon.fs(${path}, ${as});
          }
      `);
    }

  });



  replaceWith(vars);
}
