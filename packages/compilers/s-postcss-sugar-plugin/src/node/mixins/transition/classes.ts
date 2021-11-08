import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';

/**
 * @name           classes
 * @namespace      node.mixins.transition
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the transition helper classes like s-transition:slow, etc.
 * The generated transitions are specified in the config.theme.transition configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.transition.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginTransitionClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginTransitionClassesParams {}

export { postcssSugarPluginTransitionClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginTransitionClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginTransitionClassesParams = {
        ...params,
    };

    const transitionObj = __STheme.config('transition');

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Transitions
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/transitions
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some transitions on any HTMLElement.
        * These transitions are defined in the \`theme.transition\` theme settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(transitionObj).map((transition) => {
            return ` * @cssClass             s-transition${
                transition === 'default' ? '' : `:${transition}`
            }            Apply the \`${transition}\` transition`;
        })}
        * 
        * @example        html
        ${Object.keys(transitionObj)
            .map((transition) => {
                const id = `s-transition-${__uniqid()}`;
                return `
                * <!-- ${transition} -->
                * <div class="s-mbe:50">
                *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${transition}</h3>
                *   <div class="s-bg:main s-radius:30" id="${id}">
                *      <div class="s-transition${
                    transition === 'default' ? '' : `:${transition}`
                } s-ratio:1 s-bg:accent s-radius:30"></div>
                *   <style>
                *       #${id} > div { position: relative; left: 0; width: 100px; }
                *       #${id}:hover > div { left: calc(100% - 100px); )  }
                *   </style>
                *   </div>
                * </div>`;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    Object.keys(transitionObj).forEach((transitionName) => {
        const transitionCss = `/**
  * @name          s-ratio:${transitionName.replace('/', '-')}
  * @namespace          sugar.css.transition
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${transitionName}</yellow>" transition style to any HTMLElement
  * 
  * @example        html
  * <div class="s-transition\:${transitionName.replace('/', '-')} s-bg:accent">
  *     <div class="s-center-abs">I'm a cool container</div>
  * </div>
  */
.s-transition${transitionName === 'default' ? '' : `--${transitionName}`} {
    @sugar.transition(${transitionName});
}`;
        vars.push(transitionCss);
    });

    return vars;
}
