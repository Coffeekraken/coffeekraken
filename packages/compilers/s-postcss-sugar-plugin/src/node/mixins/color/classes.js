import __theme from '../../utils/theme';
import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginClassesMixinInterface extends __SInterface {
}
postcssSugarPluginClassesMixinInterface.definition = {};
export { postcssSugarPluginClassesMixinInterface as interface };
/**
 * @name           classes
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to generate all the colors helpers classes like s-color:accent, etc...
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
    const cssArray = [];
    __theme().loopOnColors(colorObj => {
        const colorName = colorObj.name;
        let modifierStr = '';
        if (colorObj.variant)
            modifierStr = `-${colorObj.variant}`;
        cssArray.push([
            `/**`,
            ` * @name           s-color:${colorName}${modifierStr}`,
            ` * @namespace      sugar.css.color.${colorName}.${colorObj.variant}`,
            ` * @type           CssClass`,
            ` * @platform       css`,
            ` * @status         beta`,
            ` *`,
            ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
            ` *`,
            ` * @example        html`,
            ` * <h1 class="s-color\:${colorName}${modifierStr}">`,
            ` *     Something cool`,
            ` * </h1>`,
            ` */`,
            `.s-color--${colorName}${modifierStr} {`,
            `   color: sugar.color(${colorName}, ${colorObj.variant});`,
            `}`
        ].join('\n'));
        cssArray.push([
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
            `}`
        ].join('\n'));
    });
    cssArray.push([
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
        `}`
    ].join('\n'));
    cssArray.push([
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
        `}`
    ].join('\n'));
    replaceWith(cssArray);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUV6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7SUFDdEQsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBRTlCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUVoQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLFFBQVEsQ0FBQyxPQUFPO1lBQUUsV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTNELFFBQVEsQ0FBQyxJQUFJLENBQ1Q7WUFDRSxLQUFLO1lBQ0wsOEJBQThCLFNBQVMsR0FBRyxXQUFXLEVBQUU7WUFDdkQsc0NBQXNDLFNBQVMsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3JFLDZCQUE2QjtZQUM3Qix3QkFBd0I7WUFDeEIseUJBQXlCO1lBQ3pCLElBQUk7WUFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsMkJBQTJCO1lBQzVGLElBQUk7WUFDSix5QkFBeUI7WUFDekIsMEJBQTBCLFNBQVMsR0FBRyxXQUFXLElBQUk7WUFDckQsdUJBQXVCO1lBQ3ZCLFVBQVU7WUFDVixLQUFLO1lBQ0wsYUFBYSxTQUFTLEdBQUcsV0FBVyxJQUFJO1lBQ3hDLHlCQUF5QixTQUFTLEtBQUssUUFBUSxDQUFDLE9BQU8sSUFBSTtZQUMzRCxHQUFHO1NBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztRQUVGLFFBQVEsQ0FBQyxJQUFJLENBQ1g7WUFDRSxLQUFLO1lBQ0wsMkJBQTJCLFNBQVMsR0FBRyxXQUFXLEVBQUU7WUFDcEQseUNBQXlDLFNBQVMsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3hFLDZCQUE2QjtZQUM3Qix3QkFBd0I7WUFDeEIseUJBQXlCO1lBQ3pCLElBQUk7WUFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsNkNBQTZDO1lBQzlHLElBQUk7WUFDSix5QkFBeUI7WUFDekIsdUJBQXVCLFNBQVMsR0FBRyxXQUFXLElBQUk7WUFDbEQsdUJBQXVCO1lBQ3ZCLFVBQVU7WUFDVixLQUFLO1lBQ0wsVUFBVSxTQUFTLEdBQUcsV0FBVyxJQUFJO1lBQ3JDLG9DQUFvQyxTQUFTLEtBQUssUUFBUSxDQUFDLE9BQU8sR0FBRztZQUNyRSxHQUFHO1NBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztJQUVOLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLElBQUksQ0FDUDtRQUNFLEtBQUs7UUFDTCw2QkFBNkI7UUFDN0IseUNBQXlDO1FBQ3pDLDZCQUE2QjtRQUM3Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLElBQUk7UUFDSixnSEFBZ0g7UUFDaEgsSUFBSTtRQUNKLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0IscURBQXFEO1FBQ3JELHFEQUFxRDtRQUNyRCxxREFBcUQ7UUFDckQsVUFBVTtRQUNWLEtBQUs7UUFDTCxrQ0FBa0M7UUFDbEMsOENBQThDO1FBQzlDLEdBQUc7S0FDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO0lBQ0osUUFBUSxDQUFDLElBQUksQ0FDVDtRQUNFLEtBQUs7UUFDTCw4QkFBOEI7UUFDOUIsb0NBQW9DO1FBQ3BDLDZCQUE2QjtRQUM3Qix3QkFBd0I7UUFDeEIseUJBQXlCO1FBQ3pCLElBQUk7UUFDSixvSEFBb0g7UUFDcEgsSUFBSTtRQUNKLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFDNUIscURBQXFEO1FBQ3JELHFEQUFxRDtRQUNyRCxxREFBcUQ7UUFDckQsVUFBVTtRQUNWLEtBQUs7UUFDTCxtQ0FBbUM7UUFDbkMsOENBQThDO1FBQzlDLEdBQUc7S0FDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO0lBRU4sV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hCLENBQUMifQ==