"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name           classes
 * @as              @s.font.classes
 * @namespace      node.mixin.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate font helper classes like s-font:title, s-font:20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.font.classes
 *
 * @example        css
 * @s.font.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginFontClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginFontClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const fontsFamiliesObj = s_theme_1.default.get('font.family'), fontSizesObj = s_theme_1.default.get('font.size'), fontStretchProps = [
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
        * @namespace          sugar.style.helpers.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/families
        * @platform       css
        * @status       stable
        * 
        * This class allows you to apply a font to any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.font.classes;
        * 
        * .my-element {
        *   @s.font.family(title);
        *   @s.font.size(30);
        * }  
        * 
        ${Object.keys(fontsFamiliesObj)
        .map((fontName) => {
        return `* @cssClass      s-font:${fontName}       Apply the \`${fontName}\` font on any HTMLElement`;
    })
        .join('\n ')}
        *    
        ${Object.keys(fontsFamiliesObj)
        .map((family) => `
            * @example        html          Family ${family}
            * <p class="s-font:${family} s-font:60">${faker_1.default.lorem.sentence()}</p>`)
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `, 'Styleguide');
    vars.comment(() => `
      /**
        * @name          Sizes
        * @namespace          sugar.style.helpers.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/sizes
        * @platform       css
        * @status       stable
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
        ${Object.keys(fontSizesObj)
        .map((size) => `
                * @example        html          Size ${size}
                *   <p class="s-font:${size}">${faker_1.default.lorem.sentence()}</p>`)
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `, 'Styleguide');
    vars.comment(() => `
      /**
        * @name          Styles
        * @namespace          sugar.style.helpers.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/styles
        * @platform       css
        * @status       stable
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
        * @example        html          Italic
        * <p class="s-font:italic s-mbe:20">${faker_1.default.lorem.sentence()}</p>
        * 
        * @example          html        Oblique
        * <div class="s-mbe:50">
        *   <p class="s-font:oblique s-mbe:20">${faker_1.default.lorem.sentence()}</p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `, 'Styleguide');
    vars.comment(() => `
      /**
        * @name          Weights
        * @namespace          sugar.style.helpers.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/weights
        * @platform       css
        * @status       stable
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
        ${fontWeightProps
        .map((weight) => `
                * @example        html          Weight ${weight}
                *   <p class="s-font:${weight}:50">${faker_1.default.lorem.sentence()}</p>`)
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `, 'Styleguide');
    vars.comment(() => `
      /**
        * @name          Stretches
        * @namespace          sugar.style.helpers.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/stretches
        * @platform       css
        * @status       stable
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
        ${fontStretchProps
        .map((stretch) => `
                * @example        html          Stretch ${stretch} 
                *   <p class="s-font:${stretch}:50">${faker_1.default.lorem.sentence()}</p>`)
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `, 'Styleguide');
    vars.comment(() => `
      /**
        * @name          Resets
        * @namespace          sugar.style.helpers.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/resets
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to **reset fonts** like \`size\`, \`family\`, etc...
        * 
        * @cssClass           s-font:reset-size          Reset the size to 1rem
        * @cssClass           s-font:reset-family        Reset to the default font
        * 
        * @example        html          Reset size
        *   ${faker_1.default.name.title()} <span class="s-font:reset-size">${faker_1.default.name.findName()}</span>
        * 
        * @example          html            Reset family
        *   ${faker_1.default.name.title()} <span class="s-font:reset-family">${faker_1.default.name.findName()}</span>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        vars.comment(() => `
        /**
        * @name          s-font:${fontName}
        * @namespace          sugar.style.helpers.font
        * @type               CssClass
        * @platform       css
        * @status       stable
        * 
        * This class allows you to apply the font "<yellow>${fontName}</yellow>" to any HTMLElement
        * 
        * @example        html      Font ${fontName}
        * <h1 class="s-font:${fontName}">Hello world</h1>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
.s-font-${fontName} {
    @s.font.family(${fontName});
}`, { type: 'CssClass' });
    });
    Object.keys(fontSizesObj).forEach((sizeName) => {
        if (sizeName === 'default')
            return;
        vars.comment(() => `/**
  * @name          s-font:${sizeName}
  * @namespace          sugar.style.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           stable
  * 
  * This class allows you to apply the font size "<yellow>${sizeName}</yellow>" to any HTMLElement
  * 
  * @example        html     Font size ${sizeName}
  * <h1 class="s-font:${sizeName}">Hello world</h1>
  */
 `).code(`
.s-font-${sizeName} {
    @s.font.size(${sizeName});
}`, { type: 'CssClass' });
    });
    // reset
    vars.comment(() => `/**
  * @name          s-font:reset-size
  * @namespace          sugar.style.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           stable
  * 
  * This class allows you to reset the font size to 1rem on any HTMLElement
  * 
  * @example        html        Reset size
  * <h1 class="s-font:reset-size">Hello world</h1>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `).code(`
.s-font-reset-size {
  font-size: s.scalable(1rem);
}`);
    vars.comment(() => `/**
  * @name          s-font:reset-family
  * @namespace          sugar.style.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           stable
  * 
  * This class allows you to reset the font family to default on any HTMLElement
  * 
  * @example        html            Reset family
  * <h1 class="s-font:reset-family">Hello world</h1>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `).code(`
.s-font-reset-family {
  @s.font.family(default);
}`, { type: 'CssClass' });
    fontStretchProps.forEach((value) => {
        vars.comment(() => `/**
            * @name          s-font:${value}
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           stable
            * 
            * This class allows you to apply the \`font-stretch: ${value}\` value to any HTMLElement
            * 
            * @example        html      Stretch ${value}
            * <h1 class="s-font:${value}">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font-${value} {
                font-stretch: ${value};
            }`, { type: 'CssClass' });
    });
    vars.comment(() => `/**
            * @name          s-font:italic
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           stable
            * 
            * This class allows you to apply the \`font-style: italic\` css value on any HTMLElement
            * 
            * @example        html          Italic
            * <h1 class="s-font:italic">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font-italic {
                font-style: italic;
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-font:oblique
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           stable
            * 
            * This class allows you to apply the \`font-style: oblique\` css value on any HTMLElement
            * 
            * @example        html          Oblique
            * <h1 class="s-font:oblique">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font-oblique {
                font-style: oblique;
            }`, { type: 'CssClass' });
    fontWeightProps.forEach((value) => {
        vars.comment(() => `/**
            * @name          s-font:${value}
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           stable
            * 
            * This class allows you to apply the \`font-weight: ${value.replace('weight-', '')}\` value to any HTMLElement
            * 
            * @example        html          Weight ${value}
            * <h1 class="s-font:${value.replace('weight-', '')}">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-font-${value} {
                font-weight: ${value.replace('weight-', '')};
            }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxxQkFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUkrQyx3REFBUztBQUV6RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLGdCQUFnQixHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUNoRCxZQUFZLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQ3hDLGdCQUFnQixHQUFHO1FBQ2YsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtLQUNuQixFQUNELGVBQWUsR0FBRztRQUNkLE1BQU07UUFDTixRQUFRO1FBQ1IsU0FBUztRQUNULFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtLQUNmLENBQUM7SUFFTixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF3QkosTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUMxQixHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFB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