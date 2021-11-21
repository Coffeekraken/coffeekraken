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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLHlCQUEwQixTQUFRLFlBQVk7SUFDaEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsOERBQThEO2dCQUNsRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNyRDtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsMkNBQTJDO2dCQUN4RCxJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQy9DO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxvREFBb0Q7Z0JBQ3hELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQ25EO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCx3REFBd0Q7Z0JBQzVELElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ3BEO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCx5SEFBeUg7Z0JBQzdILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ3JEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELGVBQWUseUJBQXlCLENBQUMifQ==