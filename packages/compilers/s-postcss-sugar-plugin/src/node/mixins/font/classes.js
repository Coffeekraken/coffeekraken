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
}
postcssSugarPluginFontClassesInterface.definition = {};
export { postcssSugarPluginFontClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
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
        return `<span class="s-color:accent s-font\:30">${fontName}</span><br /><br /><h1 class="s-font\:${fontName} s-font\:50 s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</h1>`;
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
        return `<span class="s-color:accent s-font\:30">${fontSize}</span><br /><br /><h1 class="s-font\:${fontSize} s-font\:50 s-mb\:30">${__faker.name.title()} ${__faker.name.findName()}</h1>`;
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
        if (sizeName === 'default')
            return;
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
        * <h3 class="s-color\:accent s-font\:30 s-mb\:20">Reset size</h3>
        * <div class="s-font\:60 s-mb\:30">
        *   ${__faker.name.title()} <span class="s-font\:reset-size">${__faker.name.findName()}</span>
        * </div>
        * 
        * <h3 class="s-color\:accent s-font\:30 s-mb\:20">Reset family</h3>
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
  font-size: 1rem;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN0RCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLGdCQUFnQixHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUV6RCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OztVQVdKLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDMUIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLDRCQUE0QixRQUFRLG9CQUFvQixRQUFRLDBCQUEwQixDQUFDO0lBQ3RHLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxLQUFLLENBQUM7OztZQUdaLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDNUIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFPLDJDQUEyQyxRQUFRLHlDQUF5QyxRQUFRLHlCQUF5QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQztJQUMv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