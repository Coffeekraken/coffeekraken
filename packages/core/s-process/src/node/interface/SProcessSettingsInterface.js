import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SProcessSettingsInterface
 * @namespace           sugar.node.process.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for a process instance usable across the toolkit like in an SCli instance, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcessSettingsInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            asyncStart: {
                type: 'Boolean',
                alias: 'a',
                default: __SSugarConfig.get('process.asyncStart'),
            },
            killOnError: {
                type: 'Boolean',
                default: __SSugarConfig.get('process.killOnError'),
            },
            emitErrorAsEvent: {
                type: 'Boolean',
                default: __SSugarConfig.get('process.emitErrorAsEvent'),
            },
            stdio: {
                type: 'String|SStdio|Boolean',
                alias: 's',
                default: __SSugarConfig.get('process.stdio'),
            },
            decorators: {
                type: 'Boolean',
                alias: 'd',
                default: __SSugarConfig.get('process.decorators'),
            },
            throw: {
                type: 'Boolean',
                alias: 't',
                default: __SSugarConfig.get('process.throw'),
            },
            exitAtEnd: {
                type: 'Boolean',
                alias: 'e',
                default: __SSugarConfig.get('process.exitAtEnd'),
            },
            runAsChild: {
                type: 'Boolean',
                alias: 'c',
                default: __SSugarConfig.get('process.runAsChild'),
            },
            processPath: {
                type: 'String',
                default: __SSugarConfig.get('process.processPath'),
            },
            // notification: {
            //     type: 'Object',
            //     default: __SSugarConfig.get('process.notification'),
            // },
        }));
    }
}
export default SProcessSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLHlCQUEwQixTQUFRLFlBQVk7SUFDaEQsTUFBTSxLQUFLLFVBQVU7O1FBQ2pCLE9BQU8sQ0FDSCxNQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsbUNBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNQLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNwRDtZQUNELFdBQVcsRUFBRTtnQkFDVCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyRDtZQUNELGdCQUFnQixFQUFFO2dCQUNkLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO2FBQzFEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzthQUMvQztZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDbkQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDcEQ7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7YUFDckQ7WUFDRCxrQkFBa0I7WUFDbEIsc0JBQXNCO1lBQ3RCLDJEQUEyRDtZQUMzRCxLQUFLO1NBQ1IsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxlQUFlLHlCQUF5QixDQUFDIn0=