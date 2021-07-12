import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           ratio
 * @namespace      node.mixins.ratio
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the css needed to apply a ratio on any HTMLElement.
 * It uses the :before technique.
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.ratio(16/9);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginRatioInterface extends __SInterface {
  static definition = {
    ratio: {
      type: 'Number',
      required: true,
      alias: 'd'
    }
  };
}

export interface IPostcssSugarPluginRatioParams {
  ratio: number;
}

export { postcssSugarPluginRatioInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginRatioParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginRatioParams = {
    ratio: 1,
    ...params
  };

  const vars: string[] = [
    `
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        display: block;
        box-sizing: content-box;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% / ${finalParams.ratio});
    }
    & > *:not([class*="s-align--"]) {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
    }
    & > img:not([class*="s-align--"]),
    & > video:not([class*="s-align--"]) {
      object-fit: cover;
    }
  `
  ];

  replaceWith(vars);
}
