import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./radius
 * @status        beta
 *
 * This function allows you to get a border radius value depending on your theme config
 *
 * @param       {String}        radius      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    border-radius: sugar.border.radius(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'String',
                values: Object.keys(__STheme.get('border.radius')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.padding'),
            },
        };
    }
}
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ radius: '', scalable: true }, params);
    let radiuses = finalParams.radius.split(' ').map((s) => {
        let registeredValue, factor = '';
        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`border.radius.${s}`);
        }
        catch (e) { }
        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        }
        else if (registeredValue !== undefined) {
            factor = `sugar.theme(border.radius.${s}, ${finalParams.scalable})`;
        }
        else if (isNaN(parseFloat(s)) &&
            s.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
            // support dotPath
            factor = `sugar.theme(${s}, ${finalParams.scalable})`;
        }
        else if (!isNaN(parseFloat(s))) {
            // support simple number
            factor = `${s}`;
        }
        else {
            throw new Error(`<yellow>[s-postcss-sugar-plugin]</yellow> Padding "<cyan>${s}</cyan>" is not a valid value`);
        }
        // generate css value
        return `calc(sugar.theme(border.radius.default) * ${factor})`;
    });
    return radiuses.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLCtDQUFnRCxTQUFRLFlBQVk7SUFDdEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNsRCxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7YUFDNUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLCtDQUErQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT3hFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxFQUFFLEVBQ1YsUUFBUSxFQUFFLElBQUksSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ25ELElBQUksZUFBZSxFQUNmLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsd0NBQXdDO1FBQ3hDLElBQUk7WUFDQSxlQUFlLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN4RDtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7UUFFZCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ2pCLGFBQWE7WUFDYixNQUFNLEdBQUcsR0FBRyxDQUFDO1NBQ2hCO2FBQU0sSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQ3RDLE1BQU0sR0FBRyw2QkFBNkIsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztTQUN2RTthQUFNLElBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLEVBQ3ZDO1lBQ0Usa0JBQWtCO1lBQ2xCLE1BQU0sR0FBRyxlQUFlLENBQUMsS0FBSyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUM7U0FDekQ7YUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzlCLHdCQUF3QjtZQUN4QixNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNuQjthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FDWCw0REFBNEQsQ0FBQywrQkFBK0IsQ0FDL0YsQ0FBQztTQUNMO1FBQ0QscUJBQXFCO1FBQ3JCLE9BQU8sNkNBQTZDLE1BQU0sR0FBRyxDQUFDO0lBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLENBQUMifQ==