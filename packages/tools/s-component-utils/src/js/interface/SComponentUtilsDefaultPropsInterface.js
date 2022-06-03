import __SInterface from '@coffeekraken/s-interface';
import { triggers } from '@coffeekraken/sugar/js/dom/detect/when';
/**
 * @name                SComponentUtilsDefaultPropsInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of a basic SComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SComponentUtilsDefaultPropsInterface extends __SInterface {
    static get _definition() {
        return {
            id: {
                description: 'Specify an id for your component',
                type: 'String',
                physical: true,
            },
            mounted: {
                description: 'Specify if your component is mounted or not',
                type: 'Boolean',
                default: false,
                physical: true,
            },
            mountWhen: {
                description: 'Specify when your component will be mounted',
                type: 'String',
                values: triggers,
                default: 'direct',
            },
            adoptStyle: {
                description: 'Specify if your component adopt the style of the global DOM. This worts only if you are using a shadowRoot element',
                type: 'Boolean',
                default: true,
                physical: true,
            },
            lnf: {
                description: 'Specify the lnf (look-and-feel) of your component. This is used by the css to style your component',
                type: 'String',
                default: 'default',
                physical: true,
            },
            responsive: {
                description: 'Specify some responsive properties. A "media" property is required and has to be either a media query, or a media query name defined in the config.themeMedia.queries theme setting',
                type: 'Object',
                default: {},
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLG9DQUFxQyxTQUFRLFlBQVk7SUFDMUUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEVBQUUsRUFBRTtnQkFDQSxXQUFXLEVBQUUsa0NBQWtDO2dCQUMvQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQUUsNkNBQTZDO2dCQUMxRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsUUFBUTtnQkFDaEIsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLG9IQUFvSDtnQkFDeEgsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUNQLG9HQUFvRztnQkFDeEcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxxTEFBcUw7Z0JBQ3pMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=