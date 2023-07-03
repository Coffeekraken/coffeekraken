// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 *
 * @name                SCarpenterStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to start a SCarpenter environment
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCarpenterStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            port: {
                type: 'String',
                description: 'Specify the server port you want for your carpenter environment',
                default: __SSugarConfig.get('carpenter.server.port'),
                alias: 'p',
            },
            vitePort: {
                type: 'String',
                description: 'Specify the vite server port you want when the "dev" mode is on',
                default: __SSugarConfig.get('carpenter.vite.port'),
            },
            cssPath: {
                type: 'String',
                description: 'Specify the path to the main css entry point',
                required: true,
                default: '/dist/css/index.css',
            },
            jsPath: {
                type: 'String',
                description: 'Specify the path to the main js entry point',
                required: true,
                default: '/dist/js/index.esm.js',
            },
            dev: {
                type: 'Boolean',
                description: 'Specify if you want to launch carpenter in dev mode to work on it',
                default: false,
            },
        };
    }
}
export default SCarpenterStartParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLDhCQUErQixTQUFRLFlBQVk7SUFDckQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDcEQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1AsaUVBQWlFO2dCQUNyRSxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyRDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUscUJBQXFCO2FBQ2pDO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSw2Q0FBNkM7Z0JBQzFELFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSx1QkFBdUI7YUFDbkM7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLG1FQUFtRTtnQkFDdkUsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsZUFBZSw4QkFBOEIsQ0FBQyJ9