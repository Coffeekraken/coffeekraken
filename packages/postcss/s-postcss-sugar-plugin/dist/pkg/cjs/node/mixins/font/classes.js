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
 * @namespace      node.mixin.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate font helper classes like s-font:title, s-font:20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.font.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFontClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginFontClassesInterface;
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
        * @namespace          sugar.style.font
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
        * @namespace          sugar.style.font
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
        * @namespace          sugar.style.font
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
        * @namespace          sugar.style.font
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
        * @namespace          sugar.style.font
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
        * @namespace          sugar.style.font
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
        * @namespace          sugar.style.font
        * @type               CssClass
        * @platform       css
        * @status       beta
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
.s-font--${fontName} {
    @sugar.font.family(${fontName});
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
  * @status           beta
  * 
  * This class allows you to apply the font size "<yellow>${sizeName}</yellow>" to any HTMLElement
  * 
  * @example        html     Font size ${sizeName}
  * <h1 class="s-font:${sizeName}">Hello world</h1>
  */
 `).code(`
.s-font--${sizeName} {
    @sugar.font.size(${sizeName});
}`, { type: 'CssClass' });
    });
    // reset
    vars.comment(() => `/**
  * @name          s-font:reset-size
  * @namespace          sugar.style.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
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
.s-font--reset-size {
  font-size: sugar.scalable(1rem);
}`);
    vars.comment(() => `/**
  * @name          s-font:reset-family
  * @namespace          sugar.style.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
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
.s-font--reset-family {
  @sugar.font.family(default);
}`, { type: 'CssClass' });
    fontStretchProps.forEach((value) => {
        vars.comment(() => `/**
            * @name          s-font:${value}
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
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
            .s-font--${value} {
                font-stretch: ${value};
            }`, { type: 'CssClass' });
    });
    vars.comment(() => `/**
            * @name          s-font:italic
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
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
            .s-font--italic {
                font-style: italic;
            }`, { type: 'CssClass' });
    vars.comment(() => `/**
            * @name          s-font:oblique
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
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
            .s-font--oblique {
                font-style: oblique;
            }`, { type: 'CssClass' });
    fontWeightProps.forEach((value) => {
        vars.comment(() => `/**
            * @name          s-font:${value}
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
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
            .s-font--${value} {
                font-weight: ${value.replace('weight-', '')};
            }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxxQkFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlrRCwyREFBUztBQUU1RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLGdCQUFnQixHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUNoRCxZQUFZLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQ3hDLGdCQUFnQixHQUFHO1FBQ2YsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtLQUNuQixFQUNELGVBQWUsR0FBRztRQUNkLE1BQU07UUFDTixRQUFRO1FBQ1IsU0FBUztRQUNULFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtLQUNmLENBQUM7SUFFTixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JKLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDMUIsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDZCxPQUFP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