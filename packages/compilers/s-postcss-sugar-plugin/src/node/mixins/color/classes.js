import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
}
postcssSugarPluginClassesMixinInterface.definition = {};
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
export default function ({ params, atRule, processNested }) {
    const colorsObj = __theme().config('color');
    const cssArray = [];
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((colorVariantName) => {
            if (colorVariantName.match(/-[hslrgba]$/))
                return;
            const colorVariantValue = colorObj[colorVariantName];
            let modifierStr = '';
            if (colorVariantName.match(/^default/)) {
                modifierStr = ``;
                colorVariantName = '';
            }
            else {
                modifierStr = `-${colorVariantName}`;
            }
            if (colorVariantName.match(/^:/) && __isPlainObject(colorVariantValue)) {
                // Object.keys(colorVariantValue).forEach((modifierName) => {
                //   let className;
                //   switch (colorVariantName) {
                //     case ':hover':
                //       className = `[hoverable]:hover:not([hoverable]:not(:hover) &)`;
                //       break;
                //     case ':focus':
                //       className = '*:focus, *:focus-within';
                //       break;
                //     case ':active':
                //       className = `*:active`;
                //       break;
                //   }
                //   cssArray.push(`
                //     .${className} {
                //     }
                //   `);
                // });
            }
            else {
                cssArray.push([
                    `/**`,
                    ` * @name           s-color-${colorName}${modifierStr}`,
                    ` * @namespace      sugar.css.color.classes.${colorName}.${colorVariantName}`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-color-${colorName}${modifierStr}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `.s-color-${colorName}${modifierStr} {`,
                    `   color: sugar.color(${colorName},${colorVariantName});`,
                    `}`
                ].join('\n'));
                cssArray.push([
                    `/**`,
                    ` * @name           s-bg-${colorName}${modifierStr}`,
                    ` * @namespace      sugar.css.color.classes.bg.${colorName}.${colorVariantName}`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-bg-${colorName}${modifierStr}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `.s-bg-${colorName}${modifierStr} {`,
                    `   background-color: sugar.color(${colorName},${colorVariantName})`,
                    `}`
                ].join('\n'));
                cssArray.push([
                    `/**`,
                    ` * @name           s-cs-base-${colorName}`,
                    ` * @namespace      sugar.css.color.classes.cs.base.${colorName}`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-cs-base-${colorName}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `.s-cs-base-${colorName} {`,
                    `   @sugar.color.schema(${colorName})`,
                    `}`
                ].join('\n'));
                cssArray.push([
                    `/**`,
                    ` * @name           s-cs-accent-${colorName}`,
                    ` * @namespace      sugar.css.color.classes.cs.accent.${colorName}`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-cs-accent-${colorName}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `.s-cs-accent-${colorName} {`,
                    `   @sugar.color.schema('', ${colorName})`,
                    `}`
                ].join('\n'));
                cssArray.push([
                    `/**`,
                    ` * @name           s-cs-complementary-${colorName}`,
                    ` * @namespace      sugar.css.color.classes.cs.complementary.${colorName}`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="s-cs-complementary-${colorName}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `.s-cs-complementary-${colorName} {`,
                    `   @sugar.color.schema('', '', ${colorName})`,
                    `}`
                ].join('\n'));
            }
        });
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFFeEUsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUU7SUFDeEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQ2pELElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztnQkFBRSxPQUFPO1lBRWxELE1BQU0saUJBQWlCLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFckQsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN0QyxXQUFXLEdBQUcsRUFBRSxD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