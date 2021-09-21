import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __faker from 'faker';

/**
 * @name           classes
 * @namespace      node.mixins.font
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate font helper classes like s-font:title, s-font:20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.font.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFontClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginFontClassesParams {}

export { postcssSugarPluginFontClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFontClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFontClassesParams = {
        ...params,
    };

    const vars: string[] = [];

    const fontsFamiliesObj = __theme().config('font.family');

    vars.push(`
      /**
        * @name          Font Families
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/families
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font to any HTMLElement
        * 
        ${Object.keys(fontsFamiliesObj)
            .map((fontName) => {
                return `* @cssClass      s-font\:${fontName}       Apply the ${fontName} font on any HTMLElement`;
            })
            .join('\n ')}
        * 
        * @example        html
        * ${Object.keys(fontsFamiliesObj)
            .map((fontName) => {
                return `<span class="s-color:accent s-font:30">${fontName}</span><br /><br /><h1 class="s-font\:${fontName} s-font\:50 s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</h1>`;
            })
            .join('\n * ')}
        * 
        * @example        css
        ${Object.keys(fontsFamiliesObj)
            .map((fontName) => {
                return `* .my-font-${fontName} {
        *     \@sugar.font.family(${fontName});  
        * }`;
            })
            .join('\n ')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        vars.push(`
        /**
        * @name          s-font:${fontName}
        * @namespace          sugar.css.font
        * @type               CssClass
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply the font "<yellow>${fontName}</yellow>" to any HTMLElement
        * 
        * @example        html
        * <h1 class="s-font\:${fontName}">Hello world</h1>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
.s-font--${fontName} {
    @sugar.font.family(${fontName});
}`);
    });

    // Font sizes
    const fontsSizesObj = __theme().config('font.size');
    vars.push(`
      /**
        * @name          Font Sizes
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/sizes
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font size to any HTMLElement
        * 
        ${Object.keys(fontsSizesObj)
            .map((fontSize) => {
                return `* @cssClass      s-font\:${fontSize}       Apply the ${fontSize} font size on any HTMLElement`;
            })
            .join('\n ')}
        * 
        * @example        html
        * ${Object.keys(fontsSizesObj)
            .map((fontSize) => {
                return `<span class="s-color:accent s-font:30">${fontSize}</span><br /><br /><h1 class="s-font\:${fontSize} s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</h1>`;
            })
            .join('\n * ')}
        * 
        * @example        css
        ${Object.keys(fontsSizesObj)
            .map((fontSize) => {
                return `* .my-font-${fontSize} {
        *     \@sugar.font.size(${fontSize});  
        * }`;
            })
            .join('\n ')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    Object.keys(fontsSizesObj).forEach((sizeName) => {
        if (sizeName === 'default') return;
        vars.push(`/**
  * @name          s-font:${sizeName}
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to apply the font size "<yellow>${sizeName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font\:${sizeName}">Hello world</h1>
  */
.s-font--${sizeName} {
    @sugar.font.size(${sizeName});
}`);
    });

    // reset
    vars.push(`
      /**
        * @name          Font Resets
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/resets
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to reset fonts like size, family, etc...
        * 
        * @cssClass           s-font\:reset-size          Reset the size to 1rem
        * @cssClass           s-font\:reset-family        Reset to the default font
        * 
        * @example        html
        * <h3 class="s-color:accent s-font:30 s-mb\:20">Reset size</h3>
        * <div class="s-font\:60 s-mbe:30">
        *   ${__faker.name.title()} <span class="s-font\:reset-size">${__faker.name.findName()}</span>
        * </div>
        * 
        * <h3 class="s-color:accent s-font:30 s-mb\:20">Reset family</h3>
        * <div class="s-font\:quote s-font\:50">
        *   ${__faker.name.title()} <span class="s-font\:reset-family">${__faker.name.findName()}</span>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
  * @name          s-font:reset-size
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to reset the font size to 1rem on any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font\:reset-size">Hello world</h1>
  */
.s-font--reset-size {
  font-size: sugar.scalable(1rem);
}`);
    vars.push(`/**
  * @name          s-font:reset-family
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to reset the font family to default on any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font\:reset-family">Hello world</h1>
  */
.s-font--reset-family {
  @sugar.font.family(default);
}`);

    replaceWith(vars);
}
