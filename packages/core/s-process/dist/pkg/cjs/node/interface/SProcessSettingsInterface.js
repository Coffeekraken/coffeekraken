"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SProcessSettingsInterface
 * @namespace           node.interface
 * @type                      Class
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
class SProcessSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            killOnError: {
                description: 'Specify if you want to kill the process when an error occurs',
                type: 'Boolean',
                default: s_sugar_config_1.default.get('process.killOnError'),
            },
            stdio: {
                description: 'Specify the stdio to use for your process',
                type: 'String|SStdio|Boolean',
                alias: 's',
                default: s_sugar_config_1.default.get('process.stdio'),
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
                default: s_sugar_config_1.default.get('process.throw'),
            },
            exitAtEnd: {
                description: 'Specify if you want to kill the process at his end',
                type: 'Boolean',
                alias: 'e',
                default: s_sugar_config_1.default.get('process.exitAtEnd'),
            },
            runAsChild: {
                description: 'Specify if you want to run your process as a child one',
                type: 'Boolean',
                alias: 'c',
                default: s_sugar_config_1.default.get('process.runAsChild'),
            },
            processPath: {
                description: 'Specify a path to a process file that exports a process supported type like an SProcess based class, a function, etc...',
                type: 'String',
                default: s_sugar_config_1.default.get('process.processPath'),
            },
        };
    }
}
exports.default = SProcessSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0seUJBQTBCLFNBQVEscUJBQVk7SUFDaEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsOERBQThEO2dCQUNsRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUFFLDJDQUEyQztnQkFDeEQsSUFBSSxFQUFFLHVCQUF1QjtnQkFDN0IsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzthQUMvQztZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQy9DO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxvREFBb0Q7Z0JBQ3hELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUNuRDtZQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDcEQ7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUNQLHlIQUF5SDtnQkFDN0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGtCQUFlLHlCQUF5QixDQUFDIn0=