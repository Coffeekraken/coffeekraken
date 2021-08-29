import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           scrollbar
 * @namespace      mixins.scrollbar
 * @type           Mixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @example         postcss
 * body {
 *    @sugar.scrollbar(accent, 5px);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginScrollbarInterface extends __SInterface {
    static definition = {
        color: {
            type: 'String',
            default: 'accent',
        },
        size: {
            type: 'String',
            default: '5px',
        },
    };
}

export interface IPostcssSugarPluginScrollbarParams {
    color: string;
    size: string;
}

export { postcssSugarPluginScrollbarInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginScrollbarParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginScrollbarParams = {
        color: 'accent',
        size: '5px',
        ...params,
    };

    const vars: string[] = [];

    // lnf
    vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.size};
          height: ${finalParams.size};
      }
      &::-webkit-scrollbar-track {
          background-color: sugar.color(${finalParams.color}, --darken 30);
          background: rgba(0,0,0,0);
      }
      &::-webkit-scrollbar-thumb {
          background-color: sugar.color(${finalParams.color});
      }
  `);

    replaceWith(vars);
}
