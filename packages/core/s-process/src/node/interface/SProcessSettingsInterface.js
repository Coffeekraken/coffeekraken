import __SugarConfig from '@coffeekraken/s-sugar-config';
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
        return {
            asyncStart: {
                type: 'Boolean',
                alias: 'a',
                default: __SugarConfig.get('process.asyncStart')
            },
            killOnError: {
                type: 'Boolean',
                default: __SugarConfig.get('process.killOnError')
            },
            emitErrorAsEvent: {
                type: 'Boolean',
                default: __SugarConfig.get('process.emitErrorAsEvent')
            },
            stdio: {
                type: 'String|SStdio|Boolean',
                alias: 's',
                default: __SugarConfig.get('process.stdio')
            },
            decorators: {
                type: 'Boolean',
                alias: 'd',
                default: __SugarConfig.get('process.decorators')
            },
            throw: {
                type: 'Boolean',
                alias: 't',
                default: __SugarConfig.get('process.throw')
            },
            exitAtEnd: {
                type: 'Boolean',
                alias: 'e',
                default: __SugarConfig.get('process.exitAtEnd')
            },
            runAsChild: {
                type: 'Boolean',
                alias: 'c',
                default: __SugarConfig.get('process.runAsChild')
            },
            definition: {
                type: 'Object',
                default: __SugarConfig.get('process.definition')
            },
            processPath: {
                type: 'String',
                default: __SugarConfig.get('process.processPath')
            },
            notification: {
                type: 'Object',
                default: __SugarConfig.get('process.notification')
            }
        };
    }
}
export default SProcessSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLHlCQUEwQixTQUFRLFlBQVk7SUFDbEQsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTztZQUNMLFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUNqRDtZQUNELFdBQVcsRUFBRTtnQkFDWCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzthQUNsRDtZQUNELGdCQUFnQixFQUFFO2dCQUNoQixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQzthQUN2RDtZQUNELEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsdUJBQXVCO2dCQUM3QixLQUFLLEVBQUUsR0FBRztnQkFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDNUM7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQzVDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQ2hEO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ2pEO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ2pEO1lBQ0QsV0FBVyxFQUFFO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO2FBQ2xEO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ25EO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRjtBQUNELGVBQWUseUJBQXlCLENBQUMifQ==