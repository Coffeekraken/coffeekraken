import { __i18n } from '@coffeekraken/s-i18n';
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SDocComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDocComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDocComponentInterface extends __SInterface {
    static get _definition() {
        return {
            endpoints: {
                type: 'Object',
                description: 'Specify the doc endpoints url',
                default: __SSugarConfig.get('doc.endpoints'),
            },
            i18n: {
                type: 'Object',
                description: 'Specify all the UI translations',
                default: {
                    examplesTitle: __i18n('Examples', {
                        id: 's-doc.examples.title',
                    }),
                    paramsTitle: __i18n('Parameters', {
                        id: 's-doc.params.title',
                    }),
                    settingsTitle: __i18n('Settings', {
                        id: 's-doc.settings.title',
                    }),
                    search: __i18n('Search documentation', {
                        id: 's-doc.search',
                    }),
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHNCQUF1QixTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsT0FBTyxFQUFFO29CQUNMLGFBQWEsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUM5QixFQUFFLEVBQUUsc0JBQXNCO3FCQUM3QixDQUFDO29CQUNGLFdBQVcsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFO3dCQUM5QixFQUFFLEVBQUUsb0JBQW9CO3FCQUMzQixDQUFDO29CQUNGLGFBQWEsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUM5QixFQUFFLEVBQUUsc0JBQXNCO3FCQUM3QixDQUFDO29CQUNGLE1BQU0sRUFBRSxNQUFNLENBQUMsc0JBQXNCLEVBQUU7d0JBQ25DLEVBQUUsRUFBRSxjQUFjO3FCQUNyQixDQUFDO2lCQUNMO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=