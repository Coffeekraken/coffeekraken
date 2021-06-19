import __SInterface from '@coffeekraken/s-interface';

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

    const protocol = icon.split(':')[0];

    // fontawesome
    if (protocol === 'fa' || protocol === 'fab' || protocol === 'far' || protocol === 'fal' || protocol === 'fad') {
      
      // const as = icon.split(':')[1] ?? iconName;
      const splits = icon.split(':');
      const faIconName = splits[1];
      const as = splits[2] ?? faIconName;

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
            @sugar.icon.fs(${path});
          }
      `);
    }

  });



  replaceWith(vars);
}
