// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SStaticServerStartParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a static server process.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SStaticServerStartParamsInterface extends __SInterface {
    static get _definition() {
        return {
            hostname: {
                description: 'Server hostname',
                type: 'String',
                alias: 'o',
                required: true,
                default: __SSugarConfig.get('staticServer.hostname') || '127.0.0.1',
            },
            port: {
                description: 'Server port',
                type: 'Number',
                alias: 'p',
                default: __SSugarConfig.get('staticServer.port') || 8080,
            },
            listen: {
                description: 'Specify if you want the server to listen on specified hostname and port for requests or not',
                type: 'Boolean',
                alias: 'l',
                default: true,
            },
            rootDir: {
                description: 'Server root directory',
                type: 'String',
                default: __SSugarConfig.get('staticServer.rootDir'),
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQ0FBa0MsU0FBUSxZQUFZO0lBQ3ZFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUFFLGlCQUFpQjtnQkFDOUIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUNILGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxXQUFXO2FBQ2pFO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLElBQUk7YUFDM0Q7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLDZGQUE2RjtnQkFDakcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLHVCQUF1QjtnQkFDcEMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDdEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=