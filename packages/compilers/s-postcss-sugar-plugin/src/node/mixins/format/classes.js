import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.format
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the documentation for the usage of the .s-format:... classes
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.format.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginFormatClassesInterface extends __SInterface {
}
postcssSugarPluginFormatClassesInterface.definition = {};
export { postcssSugarPluginFormatClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const fontsFamiliesObj = __theme().config('font.family');
    vars.push(`
      /**
        * @name          Format text
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Tools        /styleguide/tools/format
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply some formatting to pure HTMLElement that are scoped into.
        * For example, a simple "ul" tag will be styled as if the "s-list:ul" class would be applied on it
        * when it is scoped inside the "s-format:text" class.
        * 
        * @cssClass               s-format:text             Apply the text formatting to childs elements like "ul", "ol", "p", "h1", "h2", etc... HTML tags
        * 
        * @example        html
        * <!-- block -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text format</h3>
        *   <div class="s-format:text">
        *       <h1>${__faker.name.findName()}</h1>
        *       <p>${__faker.lorem.sentence()}</p>
        *       <ul>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *       </ul>
        *       <blockquote>
        *           ${__faker.lorem.paragraph()}
        *       </blockquote>
        *       <ol>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *           <li>${__faker.name.findName()}</li>
        *       </ol>
        *       <select>
        *           <option>${__faker.name.findName()}</option>
        *           <option>${__faker.name.findName()}</option>
        *           <option>${__faker.name.findName()}</option>
        *       </select>
        *       <br />
        *       <button>${__faker.name.findName()}</button>
        *   </div>
        * </div>
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
        return `<span class="s-tc:accent s-font:30">${fontSize}</span><br /><br /><h1 class="s-font\:${fontSize} s-mbe:30">${__faker.name.title()} ${__faker.name.findName()}</h1>`;
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
        * <h3 class="s-tc:accent s-font:30 s-mb\:20">Reset size</h3>
        * <div class="s-font\:60 s-mbe:30">
        *   ${__faker.name.title()} <span class="s-font\:reset-size">${__faker.name.findName()}</span>
        * </div>
        * 
        * <h3 class="s-tc:accent s-font:30 s-mb\:20">Reset family</h3>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUN4RCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLGdCQUFnQixHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUV6RCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFvQlEsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7cUJBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFOzswQkFFbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzBCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7O3NCQUczQixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7OzBCQUdyQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQkFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7MEJBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7OEJBR25C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