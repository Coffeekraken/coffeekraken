import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';

class postcssSugarPluginClassesMixinInterface extends __SInterface {
    static definition = {};
}
export { postcssSugarPluginClassesMixinInterface as interface };

/**
 * @name           classes
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to generate all the colors helpers classes like s-tc:accent, etc...
 *
 * @return    {Css}         The generated css for color classes
 *
 * @example         postcss
 * \@sugar.color;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const cssArray: string[] = [];

    Object.keys(__theme().baseColors()).forEach((colorName) => {
        cssArray.push(`
      /**
       * @name        s-color:${colorName}
       * @namespace     sugar.css.ui.label
       * @type          CssClass
       * 
       * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any ui element.
       * This does apply the color only on the item itself and not on his childs...
       * 
       * @example       html
       * <label>
       *   Hello world
       *   <input type="text" class="s-input s-color:${colorName}" />
       * </label>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-color--${colorName} {
        @sugar.color(${colorName});
      }
    `);
    });

    __theme().loopOnColors((colorObj) => {
        const colorName = colorObj.name;
        let modifierStr = '';
        if (colorObj.variant) modifierStr = `-${colorObj.variant}`;

        cssArray.push(
            [
                `/**`,
                ` * @name           s-tc:${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.${colorName}.${colorObj.variant}`,
                ` * @type           CssClass`,
                ` * @platform       css`,
                ` * @status         beta`,
                ` *`,
                ` * This class allows you to apply the "${colorName}${modifierStr}" text color to an HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-tc\:${colorName}${modifierStr}">`,
                ` *     Something cool`,
                ` * </h1>`,
                ` */`,
                `.s-tc--${colorName}${modifierStr} {`,
                `   color: sugar.color(${colorName}, ${colorObj.variant});`,
                `}`,
            ].join('\n'),
        );

        cssArray.push(
            [
                `/**`,
                ` * @name           s-bg:${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.bg.${colorName}.${colorObj.variant}`,
                ` * @type           CssClass`,
                ` * @platform       css`,
                ` * @status         beta`,
                ` *`,
                ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-bg\:${colorName}${modifierStr}">`,
                ` *     Something cool`,
                ` * </h1>`,
                ` */`,
                `.s-bg--${colorName}${modifierStr} {`,
                `   background-color: sugar.color(${colorName}, ${colorObj.variant})`,
                `}`,
            ].join('\n'),
        );
    });

    cssArray.push(
        [
            `/**`,
            ` * @name           s-bg:odd`,
            ` * @namespace      sugar.css.bg.classes`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to scope the applied bgs on the direct childs to only be applied on "odd" HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <ol class="s-bg\:odd">`,
            ` *     <li class="s-bg--accent">Something cool</li>`,
            ` *     <li class="s-bg--accent">Something cool</li>`,
            ` *     <li class="s-bg--accent">Something cool</li>`,
            ` * </li>`,
            ` */`,
            `.s-bg--odd > *:nth-child(even) {`,
            '   background-color: transparent !important;',
            `}`,
        ].join('\n'),
    );
    cssArray.push(
        [
            `/**`,
            ` * @name           s-bg:even`,
            ` * @namespace      sugar.css.color`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to scope the applied colors on the direct childs to only be applied on "even" HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <ol class="s-bg\:even">`,
            ` *     <li class="s-bg--accent">Something cool</li>`,
            ` *     <li class="s-bg--accent">Something cool</li>`,
            ` *     <li class="s-bg--accent">Something cool</li>`,
            ` * </li>`,
            ` */`,
            `.s-bg--even > *:nth-child(even) {`,
            '   background-color: transparent !important;',
            `}`,
        ].join('\n'),
    );

    replaceWith(cssArray);
}
