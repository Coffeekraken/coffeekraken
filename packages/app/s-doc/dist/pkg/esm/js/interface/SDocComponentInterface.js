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
            fetchExtension: {
                type: 'string',
                description: 'Specify an extension to add at the end of the fetch url like "json"',
                default: '',
            },
            loaderSvg: {
                type: 'String',
                description: 'Specify an svg to use as the loader',
                default: `<svg class="s-logo s-logo-coffeekraken-picto" viewBox="0 0 299 229" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M102.5 55.3151V202.802H191V229H71V29H142V55.3151H102.5Z" fill="white"/>
                        <path d="M265.5 26.3151V202.802H227.5V229H298.5V0H227.5V26.3151H265.5Z" fill="white"/>
                        <path d="M31.5 109.315V166.802H31V193H0V83H71V109.315H31.5Z" fill="white"/>
                        <path d="M173 144.5C173 159.136 162.703 171 150 171C137.297 171 127 159.136 127 144.5C127 129.864 137.297 118 150 118C167.5 118 173 129.864 173 144.5Z" fill="#FEBD0F"/>
                        <path d="M240 144.5C240 159.136 229.703 171 217 171C204.297 171 194 159.136 194 144.5C194 129.864 200.5 118 217 118C229.703 118 240 129.864 240 144.5Z" fill="#FEBD0F"/>
                        </svg>
                        `,
            },
            features: {
                type: 'Object',
                description: 'Specify which feature are available like "fullscreen", etc...',
                default: {
                    fullscreen: true,
                },
            },
            icons: {
                type: 'Object',
                description: 'Specify some icons for the UI',
                default: {
                    file: '<i class="fa-regular fa-file"></i>',
                    enterFullscreen: '<i class="fa-solid fa-expand"></i>',
                    exitFullscreen: '<i class="fa-solid fa-compress"></i>',
                    menu: '<i class="fa-solid fa-list-ul"></i>',
                },
            },
            i18n: {
                type: 'Object',
                description: 'Specify all the UI translations',
                default: {
                    examplesTitle: __i18n('Examples', {
                        id: 's-doc.examples.title',
                    }),
                    installTitle: __i18n('Install', {
                        id: 's-doc.install.title',
                    }),
                    paramsTitle: __i18n('Parameters', {
                        id: 's-doc.params.title',
                    }),
                    cssClassesTitle: __i18n('CSS Classes', {
                        id: 's-doc.cssClasses.title',
                    }),
                    settingsTitle: __i18n('Settings', {
                        id: 's-doc.settings.title',
                    }),
                    search: __i18n('Search documentation', {
                        id: 's-doc.search',
                    }),
                    toggleFullscreen: __i18n('Toggle fullscreen', {
                        id: 's-doc.fullscreen.toggle',
                    }),
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLHNCQUF1QixTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLHFFQUFxRTtnQkFDekUsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxPQUFPLEVBQUU7Ozs7Ozs7eUJBT0E7YUFDWjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsK0RBQStEO2dCQUNuRSxPQUFPLEVBQUU7b0JBQ0wsVUFBVSxFQUFFLElBQUk7aUJBQ25CO2FBQ0o7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLCtCQUErQjtnQkFDNUMsT0FBTyxFQUFFO29CQUNMLElBQUksRUFBRSxvQ0FBb0M7b0JBQzFDLGVBQWUsRUFBRSxvQ0FBb0M7b0JBQ3JELGNBQWMsRUFBRSxzQ0FBc0M7b0JBQ3RELElBQUksRUFBRSxxQ0FBcUM7aUJBQzlDO2FBQ0o7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLGlDQUFpQztnQkFDOUMsT0FBTyxFQUFFO29CQUNMLGFBQWEsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUM5QixFQUFFLEVBQUUsc0JBQXNCO3FCQUM3QixDQUFDO29CQUNGLFlBQVksRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFO3dCQUM1QixFQUFFLEVBQUUscUJBQXFCO3FCQUM1QixDQUFDO29CQUNGLFdBQVcsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFFO3dCQUM5QixFQUFFLEVBQUUsb0JBQW9CO3FCQUMzQixDQUFDO29CQUNGLGVBQWUsRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFFO3dCQUNuQyxFQUFFLEVBQUUsd0JBQXdCO3FCQUMvQixDQUFDO29CQUNGLGFBQWEsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUM5QixFQUFFLEVBQUUsc0JBQXNCO3FCQUM3QixDQUFDO29CQUNGLE1BQU0sRUFBRSxNQUFNLENBQUMsc0JBQXNCLEVBQUU7d0JBQ25DLEVBQUUsRUFBRSxjQUFjO3FCQUNyQixDQUFDO29CQUNGLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTt3QkFDMUMsRUFBRSxFQUFFLHlCQUF5QjtxQkFDaEMsQ0FBQztpQkFDTDthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSiJ9