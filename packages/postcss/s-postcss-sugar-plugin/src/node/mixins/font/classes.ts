import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';

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
 * \@s.font.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginFontClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginFontClassesParams {}

export { postcssSugarPluginFontClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFontClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFontClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const fontsFamiliesObj = __STheme.get('font.family'),
        fontSizesObj = __STheme.get('font.size'),
        fontStretchProps = [
            'ultra-condensed',
            'extra-condensed',
            'condensed',
            'semi-condensed',
            'semi-expanded',
            'expanded',
            'extra-expanded',
            'ultra-expanded',
        ],
        fontWeightProps = [
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

    vars.comment(
        () => `
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
        * \\@s.font.classes;
        * 
        * .my-element {
        *   \\@s.font.family(title);
        *   \\@s.font.size(30);
        * }  
        * 
        ${Object.keys(fontsFamiliesObj)
            .map((fontName) => {
                return `* @cssClass      s-font:${fontName}       Apply the \`${fontName}\` font on any HTMLElement`;
            })
            .join('\n ')}
        *    
        ${Object.keys(fontsFamiliesObj)
            .map(
                (family) => `
            * @example        html          Family ${family}
            * <p class="s-font:${family} s-font:60">${__faker.lorem.sentence()}</p>`,
            )
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
        'Styleguide',
    );

    vars.comment(
        () => `
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
            .map(
                (size) => `
                * @example        html          Size ${size}
                *   <p class="s-font:${size}">${__faker.lorem.sentence()}</p>`,
            )
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
        'Styleguide',
    );

    vars.comment(
        () => `
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
    `,
        'Styleguide',
    );

    vars.comment(
        () => `
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
            .map(
                (weight) => `
                * @example        html          Weight ${weight}
                *   <p class="s-font:${weight}:50">${__faker.lorem.sentence()}</p>`,
            )
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
        'Styleguide',
    );

    vars.comment(
        () => `
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
            .map(
                (stretch) => `
                * @example        html          Stretch ${stretch} 
                *   <p class="s-font:${stretch}:50">${__faker.lorem.sentence()}</p>`,
            )
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
        'Styleguide',
    );

    vars.comment(
        () => `
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
        *   ${__faker.name.title()} <span class="s-font:reset-size">${__faker.name.findName()}</span>
        * 
        * @example          html            Reset family
        *   ${__faker.name.title()} <span class="s-font:reset-family">${__faker.name.findName()}</span>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        vars.comment(
            () => `
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
       `,
        ).code(
            `
.s-font-${fontName} {
    @s.font.family(${fontName});
}`,
            { type: 'CssClass' },
        );
    });

    Object.keys(fontSizesObj).forEach((sizeName) => {
        if (sizeName === 'default') return;
        vars.comment(
            () => `/**
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
 `,
        ).code(
            `
.s-font-${sizeName} {
    @s.font.size(${sizeName});
}`,
            { type: 'CssClass' },
        );
    });

    // reset
    vars.comment(
        () => `/**
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
 `,
    ).code(
        `
.s-font-reset-size {
  font-size: s.scalable(1rem);
}`,
    );

    vars.comment(
        () => `/**
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
 `,
    ).code(
        `
.s-font-reset-family {
  @s.font.family(default);
}`,
        { type: 'CssClass' },
    );

    fontStretchProps.forEach((value) => {
        vars.comment(
            () => `/**
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
           `,
        ).code(
            `
            .s-font-${value} {
                font-stretch: ${value};
            }`,
            { type: 'CssClass' },
        );
    });

    vars.comment(
        () => `/**
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
           `,
    ).code(
        `
            .s-font-italic {
                font-style: italic;
            }`,
        { type: 'CssClass' },
    );

    vars.comment(
        () => `/**
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
           `,
    ).code(
        `
            .s-font-oblique {
                font-style: oblique;
            }`,
        { type: 'CssClass' },
    );

    fontWeightProps.forEach((value) => {
        vars.comment(
            () => `/**
            * @name          s-font:${value}
            * @namespace          sugar.style.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           stable
            * 
            * This class allows you to apply the \`font-weight: ${value.replace(
                'weight-',
                '',
            )}\` value to any HTMLElement
            * 
            * @example        html          Weight ${value}
            * <h1 class="s-font:${value.replace(
                'weight-',
                '',
            )}">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `,
        ).code(
            `
            .s-font-${value} {
                font-weight: ${value.replace('weight-', '')};
            }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
