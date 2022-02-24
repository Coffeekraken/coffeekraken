import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.font
 * @type           PostcssMixin
 * @platform      postcss
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFontClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginFontClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const fontsFamiliesObj = __STheme.config('font.family'), fontSizesObj = __STheme.config('font.size'), fontStretchProps = [
        'ultra-condensed',
        'extra-condensed',
        'condensed',
        'semi-condensed',
        'semi-expanded',
        'expanded',
        'extra-expanded',
        'ultra-expanded',
    ], fontWeightProps = [
        'bold',
        'bolder',
        'lighter',
        'weight-100',
        'weight-200',
        'weight-300',
        'weight-400',
        'weight-500',
        'weight-600',
        'weight-700',
        'weight-800',
        'weight-900',
    ];
    vars.comment(() => `
      /**
        * @name          Families
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/families
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(fontsFamiliesObj)
        .map((fontName) => {
        return `* @cssClass      s-font:${fontName}       Apply the \`${fontName}\` font on any HTMLElement`;
    })
        .join('\n ')}
        *    
        * @example        html
        ${Object.keys(fontsFamiliesObj)
        .map((family) => {
        return ` * <div class="s-mbe:50">
                        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${family}</h3>
                        *   <p class="s-font:${family} s-font:60">${__faker.lorem.sentence()}</p>
                        * </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Sizes
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/sizes
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font size to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(fontSizesObj)
        .map((sizeName) => {
        return ` * @cssClass            s-font:${sizeName}          Apply the \`${sizeName}\` size`;
    })
        .join('\n')}
        * 
        *    
        * @example        html
        ${Object.keys(fontSizesObj)
        .map((size) => {
        return ` * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${size}</h3>
            *   <p class="s-font:${size}">${__faker.lorem.sentence()}</p>
            * </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Styles
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/styles
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font style to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-font:italic                   Apply the \`italic\` font-style value
        * @cssClass         s-font:oblique                   Apply the \`oblique\` font-style value
        *    
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Italic</h3>
        *   <p class="s-font:italic s-mbe:20">${__faker.lorem.sentence()}</p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Oblique</h3>
        *   <p class="s-font:oblique s-mbe:20">${__faker.lorem.sentence()}</p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Weights
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/weights
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font weight to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-font:bold                     Apply the \`bold\` font-weight value
        * @cssClass         s-font:bolder                     Apply the \`bolder\` font-weight value
        * @cssClass         s-font:lighter                     Apply the \`lighter\` font-weight value
        * @cssClass         s-font:weight-100                     Apply the \`100\` font-weight value
        * @cssClass         s-font:weight-200                     Apply the \`200\` font-weight value
        * @cssClass         s-font:weight-300                     Apply the \`300\` font-weight value
        * @cssClass         s-font:weight-400                     Apply the \`400\` font-weight value
        * @cssClass         s-font:weight-500                     Apply the \`500\` font-weight value
        * @cssClass         s-font:weight-600                     Apply the \`600\` font-weight value
        * @cssClass         s-font:weight-700                     Apply the \`700\` font-weight value
        * @cssClass         s-font:weight-800                     Apply the \`800\` font-weight value
        * @cssClass         s-font:weight-900                     Apply the \`900\` font-weight value
        * 
        *    
        * @example        html
        ${fontWeightProps
        .map((weight) => {
        return ` * <div class="s-mbe:50">
                    *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${weight}</h3>
                    *   <p class="s-font:${weight}:50">${__faker.lorem.sentence()}</p>
                    * </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Stretches
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/stretches
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font stretch to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-font:ultra-condensed              Apply the \`ultra-condensed\` font-stretch value
        * @cssClass         s-font:extra-condensed              Apply the \`extra-condensed\` font-stretch value
        * @cssClass         s-font:condensed              Apply the \`condensed\` font-stretch value
        * @cssClass         s-font:semi-condensed              Apply the \`semi-condensed\` font-stretch value
        * @cssClass         s-font:semi-expanded              Apply the \`semi-expanded\` font-stretch value
        * @cssClass         s-font:expanded              Apply the \`expanded\` font-stretch value
        * @cssClass         s-font:extra-expanded              Apply the \`extra-expanded\` font-stretch value
        * @cssClass         s-font:ultra-expanded              Apply the \`ultra-expanded\` font-stretch value
        *    
        * @example        html
        ${fontStretchProps
        .map((stretch) => {
        return ` * <div class="s-mbe:50">
                    *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${stretch}</h3>
                    *   <p class="s-font:${stretch}:50">${__faker.lorem.sentence()}</p>
                    * </div> `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Resets
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/resets
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to **reset fonts** like \`size\`, \`family\`, etc...
        * 
        * @cssClass           s-font:reset-size          Reset the size to 1rem
        * @cssClass           s-font:reset-family        Reset to the default font
        * 
        * @example        html
        * <h3 class="s-tc:accent s-font:30 s-mb:20">Reset size</h3>
        * <div class="s-font:60 s-mbe:30">
        *   ${__faker.name.title()} <span class="s-font:reset-size">${__faker.name.findName()}</span>
        * </div>
        * 
        * <h3 class="s-tc:accent s-font:30 s-mb:20">Reset family</h3>
        * <div class="s-font:quote s-font:50">
        *   ${__faker.name.title()} <span class="s-font:reset-family">${__faker.name.findName()}</span>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        vars.comment(() => `
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
        * <h1 class="s-font:${fontName}">Hello world</h1>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
.s-font--${fontName} {
    @sugar.font.family(${fontName});
}`);
    });
    Object.keys(fontSizesObj).forEach((sizeName) => {
        if (sizeName === 'default')
            return;
        vars.comment(() => `/**
  * @name          s-font:${sizeName}
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to apply the font size "<yellow>${sizeName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font:${sizeName}">Hello world</h1>
  */
 `).code(`
.s-font--${sizeName} {
    @sugar.font.size(${sizeName});
}`);
    });
    // reset
    vars.comment(() => `/**
  * @name          s-font:reset-size
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to reset the font size to 1rem on any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font:reset-size">Hello world</h1>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `).code(`
.s-font--reset-size {
  font-size: sugar.scalable(1rem);
}`);
    vars.comment(() => `/**
  * @name          s-font:reset-family
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to reset the font family to default on any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font:reset-family">Hello world</h1>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `).code(`
.s-font--reset-family {
  @sugar.font.family(default);
}`);
    fontStretchProps.forEach((value) => {
        vars.comment(() => `/**
            * @name          s-font:${value}
            * @namespace          sugar.css.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the \`font-stretch: ${value}\` value to any HTMLElement
            * 
            * @example        html
            * <h1 class="s-font:${value}">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font--${value} {
                font-stretch: ${value};
            }`);
    });
    vars.comment(() => `/**
            * @name          s-font:italic
            * @namespace          sugar.css.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the \`font-style: italic\` css value on any HTMLElement
            * 
            * @example        html
            * <h1 class="s-font:italic">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font--italic {
                font-style: italic;
            }`);
    vars.comment(() => `/**
            * @name          s-font:oblique
            * @namespace          sugar.css.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the \`font-style: oblique\` css value on any HTMLElement
            * 
            * @example        html
            * <h1 class="s-font:oblique">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font--oblique {
                font-style: oblique;
            }`);
    fontWeightProps.forEach((value) => {
        vars.comment(() => `/**
            * @name          s-font:${value}
            * @namespace          sugar.css.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the \`font-weight: ${value.replace('weight-', '')}\` value to any HTMLElement
            * 
            * @example        html
            * <h1 class="s-font:${value.replace('weight-', '')}">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-font--${value} {
                font-weight: ${value.replace('weight-', '')};
            }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQ25ELFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUMzQyxnQkFBZ0IsR0FBRztRQUNmLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsV0FBVztRQUNYLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixnQkFBZ0I7S0FDbkIsRUFDRCxlQUFlLEdBQUc7UUFDZCxNQUFNO1FBQ04sUUFBUTtRQUNSLFNBQVM7UUFDVCxZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7S0FDZixDQUFDO0lBRU4sSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7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