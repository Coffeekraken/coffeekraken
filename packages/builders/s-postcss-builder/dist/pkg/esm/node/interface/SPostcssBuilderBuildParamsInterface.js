import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SEnv from '@coffeekraken/s-env';
/**
 * @name                SPostcssBuilderBuildParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SPostcssBuilder.build method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SPostcssBuilderBuildParamsInterface extends __SInterface {
    static get _definition() {
        return {
            input: {
                description: 'Specify the input css file for your build',
                type: 'String',
                required: true,
                alias: 'i',
                default: __SSugarConfig.get('postcssBuilder.input'),
            },
            output: {
                description: 'Specify the output file path you want to save your build',
                type: 'String',
                alias: 'o',
                default: __SSugarConfig.get('postcssBuilder.output'),
            },
            prod: {
                description: 'Shorthand to set a production ready build',
                type: 'Boolean',
                default: __SEnv.is('production'),
                alias: 'p',
            },
            minify: {
                description: 'Specify if you want to minify your output css',
                type: 'Boolean',
                alias: 'm',
                default: false,
            },
            purge: {
                description: 'Specify if you want to purge your output css. See the config.purgecss configuration file for more control',
                type: 'Boolean',
                default: false,
            },
            saveDev: {
                description: 'Specify if you want to save a .dev.css file that will not be purged or minified',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBRXpDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUNBQW9DLFNBQVEsWUFBWTtJQUN6RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ3REO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDaEMsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsMkdBQTJHO2dCQUMvRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsaUZBQWlGO2dCQUNyRixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==