import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
/**
 * @name                SProcessSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SProcessSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            killOnError: {
                description: 'Specify if you want to kill the process when an error occurs',
                type: 'Boolean',
                default: __SSugarConfig.get('process.killOnError'),
            },
            stdio: {
                description: 'Specify the stdio to use for your process',
                type: 'String|SStdio|Boolean',
                alias: 's',
                default: __SSugarConfig.get('process.stdio'),
            },
            collectStdout: {
                description: 'Specify if you want to collect the stdout of the process',
                type: 'Boolean',
                default: false,
            },
            collectStderr: {
                description: 'Specify if you want to collect the stderr of the process',
                type: 'Boolean',
                default: true,
            },
            throw: {
                description: 'Specify if you want to throw error when an error occurs',
                type: 'Boolean',
                alias: 't',
                default: __SSugarConfig.get('process.throw'),
            },
            exitAtEnd: {
                description: 'Specify if you want to kill the process at his end',
                type: 'Boolean',
                alias: 'e',
                default: __SSugarConfig.get('process.exitAtEnd'),
            },
            runAsChild: {
                description: 'Specify if you want to run your process as a child one',
                type: 'Boolean',
                alias: 'c',
                default: __SSugarConfig.get('process.runAsChild'),
            },
            processPath: {
                description: 'Specify a path to a process file that exports a process supported type like an SProcess based class, a function, etc...',
                type: 'String',
                default: __SSugarConfig.get('process.processPath'),
            },
        };
    }
}
export default SProcessSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSx5QkFBMEIsU0FBUSxZQUFZO0lBQ2hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLDhEQUE4RDtnQkFDbEUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQy9DO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCx5REFBeUQ7Z0JBQzdELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzthQUMvQztZQUNELFNBQVMsRUFBRTtnQkFDUCxXQUFXLEVBQ1Asb0RBQW9EO2dCQUN4RCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUNuRDtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNwRDtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AseUhBQXlIO2dCQUM3SCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxlQUFlLHlCQUF5QixDQUFDIn0=