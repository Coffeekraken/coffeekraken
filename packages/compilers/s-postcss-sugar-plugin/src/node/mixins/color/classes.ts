import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginClassesMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginClassesMixinInterface as interface };

/**
 * @name           classes
 * @namespace      mixins.colors
 * @type           Mixin
 * @status        beta
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.Classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (params = {}, atRule, processNested) {
  const themes = __sugarConfig('theme');

  const cssArray: string[] = [];

  Object.keys(themes).forEach((themeName) => {
    const themeObj = themes[themeName];
    const colors = Object.keys(themeObj.color);
    colors.forEach((colorName) => {
      const colorObj = themeObj.color[colorName];
      Object.keys(colorObj).forEach((modifier) => {
        const colorValue = colorObj[modifier];

        let modifierStr = modifier;
        let modifierInvertStr = modifier;
        if (modifier.match(/^default/)) {
          if (modifier.match(/\-i$/)) {
            modifierStr = '--i';
            modifierInvertStr = '';
          } else {
            modifierStr = ``;
            modifierInvertStr = '--i';
          }
        } else {
          if (modifier.match(/\-i$/)) {
            modifierStr = `--${modifier}`;
            modifierInvertStr = `--${modifier.replace(/\-i$/, '')}`;
          } else {
            modifierStr = `--${modifier}`;
            modifierInvertStr = `--${modifier}-i`;
          }
        }

        cssArray.push(
          [
            `/**`,
            ` * @name           c-${colorName}${modifierStr}`,
            ` * @namespace      sugar.color.classes`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="c-${colorName}${modifierStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.c-${colorName}${modifierStr} {`,
            `   color: sugar.color(${colorName}${modifierStr});`,
            `}`
          ].join('\n')
        );

        cssArray.push(
          [
            `/**`,
            ` * @name           bg-${colorName}${modifierStr}`,
            ` * @namespace      sugar.color.classes`,
            ` * @type           CssClass`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="bg-${colorName}${modifierStr} c-${colorName}${modifierInvertStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.bg-${colorName}${modifierStr} {`,
            `   background-color: sugar.color(${colorName}${modifierStr})`,
            `}`
          ].join('\n')
        );
      });
    });
  });

  if (atRule) {
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
  } else {
    return cssArray.join('\n');
  }
}
