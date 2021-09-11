import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiDropdownClassesInterface extends __SInterface {
    static definition = {
        styles: {
            type: 'String[]',
            default: ['solid'],
        },
        defaultStyle: {
            type: 'String',
            values: ['solid'],
            default: __theme().config('ui.dropdown.defaultStyle'),
        },
    };
}

export interface IPostcssSugarPluginUiDropdownClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
}

export { postcssSugarPluginUiDropdownClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiDropdownClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiDropdownClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Dropdown
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/dropdown
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice dropdown on buttons or whatever
        * 
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-dropdown${
                    style === finalParams.defaultStyle ? '' : `\:${style}`
                }           Apply the ${style} dropdown style`;
            })
            .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
            .map((style) => {
                return ` * <!-- ${style} style -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">${style} style</h3>
            *   <button class="s-btn s-ui\:accent s-mb\:30">
            *       Click me!
            *       <div class="s-dropdown">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <span class="s-btn-group s-mb\:30">
            *       <a class="s-btn">Click me!</a>
            *       <button class="s-btn s-ui\:complementary">
            *           +
            *           <div class="s-dropdown">
            *               <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *               <a class="s-btn s-ui\:accent">You find me!</a>
            *           </div>
            *       </button>
            *   </span>
            * </div>
            * 
            * <!-- Positions -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Position</h3>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Bottom (default)
            *       <div class="s-dropdown">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Bottom start
            *       <div class="s-dropdown\:bottom-start">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Bottom end
            *       <div class="s-dropdown\:bottom-end">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top
            *       <div class="s-dropdown\:top">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top start
            *       <div class="s-dropdown\:top-start">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top end
            *       <div class="s-dropdown\:top-end">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * 
            * <!-- RTL -->
            * <div class="s-font\:30 s-mb\:50" dir="rtl">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">RTL Support</h3>
            *   <button class="s-btn s-mb\:30">
            *       Click me!
            *       <div class="s-dropdown">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top start
            *       <div class="s-dropdown\:top-start">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            *   <button class="s-btn s-mb\:30 s-mr\:20">
            *       Top end
            *       <div class="s-dropdown\:top-end">
            *          <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
            *          <a class="s-btn s-ui\:accent">You find me!</a>
            *       </div>
            *   </button>
            * </div>
            * `;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    finalParams.styles.forEach((style) => {
        vars.push(`/**
        * @name           s-dropdown${finalParams.defaultStyle === style ? '' : `\:${style}`}
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>${style}</yellow>" dropdown
        * 
        * @example        html
        * <span class="s-dropdown-container">
        *     <button class="s-btn">Click me!</button>
        *     <div class="s-dropdown${finalParams.defaultStyle === style ? '' : `\:${style}`}">
        *         <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *         <a class="s-btn s-ui\:accent">You find me!</a>
        *     </div>
        * </span>
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown${finalParams.defaultStyle === style ? '' : `--${style}`} {
            @sugar.ui.dropdown($style: ${style});
        }
        `);
    });

    vars.push(`/**
        * @name           s-dropdown
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom (center)</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:bottom">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown {
            @sugar.ui.dropdown($position: bottom);
        }
        `);

    vars.push(`/**
        * @name           s-dropdown:bottom-start
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom start</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:bottom-start">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--bottom-start {
            @sugar.ui.dropdown($position: bottom-start);
        }
        `);

    vars.push(`/**
        * @name           s-dropdown:bottom-end
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>bottom end</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:bottom-end">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--bottom-end {
            @sugar.ui.dropdown($position: bottom-end);
        }
        `);

    vars.push(`/**
        * @name           s-dropdown:top
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:top">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top {
            @sugar.ui.dropdown($position: top);
        }
        `);

    vars.push(`/**
        * @name           s-dropdown:top-start
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top-start</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:top-start">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top-start {
            @sugar.ui.dropdown($position: top-start);
        }
        `);

    vars.push(`/**
        * @name           s-dropdown:top-end
        * @namespace      sugar.css.ui.dropdown
        * @type           CssClass
        * 
        * This class represent a(n) "<yellow>top-end</yellow>" aligned dropdown
        * 
        * @example        html
        * <button class="s-btn">
        *   Click me!
        *   <div class="s-dropdown\:top-end">
        *       <p class="s-typo\:p s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</p>
        *       <a class="s-btn s-ui\:accent">You find me!</a>
        *   </div>
        * </button>
        *     
        * 
        * @since      2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-dropdown--top-end {
            @sugar.ui.dropdown($position: top-end);
        }
        `);

    replaceWith(vars);
}
