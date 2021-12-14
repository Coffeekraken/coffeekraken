import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
/**
 * @name          radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a border size value depending on your theme config
 *
 * @param       {Number}        size      The radius to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    font-size: sugar.font.size(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginFontSizeInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                alias: 'n',
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.config('scalable.font'),
            },
        };
    }
}
export { postcssSugarPluginFontSizeInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ name: '', scalable: false }, params);
    const name = finalParams.name;
    if (__isValidUnitValue(name)) {
        if (finalParams.scalable)
            return `sugar.scalable(${name})`;
        return name;
    }
    return `sugar.theme(font.size.${name}, ${finalParams.scalable})`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxrQkFBa0IsTUFBTSxpREFBaUQsQ0FBQztBQUVqRjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sbUNBQW9DLFNBQVEsWUFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO2FBQzVDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU81RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLFFBQVEsRUFBRSxLQUFLLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBRTlCLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUIsSUFBSSxXQUFXLENBQUMsUUFBUTtZQUFFLE9BQU8sa0JBQWtCLElBQUksR0FBRyxDQUFDO1FBQzNELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLHlCQUF5QixJQUFJLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO0FBQ3JFLENBQUMifQ==