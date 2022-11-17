import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __uniqid } from '@coffeekraken/sugar/string';

/**
 * @name           classes
 * @namespace      node.mixin.transition
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the transition helper classes like s-transition:slow, etc.
 * The generated transitions are specified in the config.theme.transition configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.transition.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginTransitionClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginTransitionClassesParams = {
        ...params,
    };

    const transitionObj = __STheme.get('transition');

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Transitions
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/transition
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some transitions on any HTMLElement.
        * These transitions are defined in the \`theme.transition\` theme settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.transition.classes;
        * 
        ${Object.keys(transitionObj).map((transition) => {
            return ` * @cssClass             s-transition${
                transition === 'default' ? '' : `:${transition}`
            }            Apply the \`${transition}\` transition`;
        })}
        * 
        ${Object.keys(transitionObj)
            .map((transition) => {
                const id = `s-transition-${__uniqid()}`;
                return `
                * @example          html        ${transition}
                *   <div class="s-bg:main-surface s-radius:30" id="${id}">
                *      <div class="s-transition${
                    transition === 'default' ? '' : `:${transition}`
                } s-ratio:1 s-bg:accent s-radius:30"></div>
                *       <style>
                *           #${id} > div { position: relative; left: 0; width: 100px; }
                *           #${id}:hover > div { left: calc(100% - 100px); )  }
                *       </style>
                *   </div>`;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    Object.keys(transitionObj).forEach((transitionName) => {
        vars.comment(
            () => `/**
  * @name          s-ratio:${transitionName.replace('/', '-')}
  * @namespace          sugar.style.transition
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
 `,
        ).code(
            `
.s-transition${transitionName === 'default' ? '' : `--${transitionName}`} {
    @sugar.transition(${transitionName});
}`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
