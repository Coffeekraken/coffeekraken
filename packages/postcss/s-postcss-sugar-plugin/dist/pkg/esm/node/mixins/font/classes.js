import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
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
class postcssSugarPluginFontClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginFontClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const fontsFamiliesObj = __STheme.get('font.family'), fontSizesObj = __STheme.get('font.size'), fontStretchProps = [
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
            * <p class="s-font:${family} s-font:60">${__faker.lorem.sentence()}</p>`)
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
                *   <p class="s-font:${size}">${__faker.lorem.sentence()}</p>`)
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
        * <p class="s-font:italic s-mbe:20">${__faker.lorem.sentence()}</p>
        * 
        * @example          html        Oblique
        * <div class="s-mbe:50">
        *   <p class="s-font:oblique s-mbe:20">${__faker.lorem.sentence()}</p>
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
                *   <p class="s-font:${weight}:50">${__faker.lorem.sentence()}</p>`)
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
                *   <p class="s-font:${stretch}:50">${__faker.lorem.sentence()}</p>`)
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
        *   ${__faker.name.title()} <span class="s-font:reset-size">${__faker.name.findName()}</span>
        * 
        * @example          html            Reset family
        *   ${__faker.name.title()} <span class="s-font:reset-family">${__faker.name.findName()}</span>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUNoRCxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFDeEMsZ0JBQWdCLEdBQUc7UUFDZixpQkFBaUI7UUFDakIsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsZ0JBQWdCO0tBQ25CLEVBQ0QsZUFBZSxHQUFHO1FBQ2QsTUFBTTtRQUNOLFFBQVE7UUFDUixTQUFTO1FBQ1QsWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO0tBQ2YsQ0FBQztJQUVOLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7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