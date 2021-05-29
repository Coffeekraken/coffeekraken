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
}
SProcessSettingsInterface.definition = {
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
export default SProcessSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLHlCQUEwQixTQUFRLFlBQVk7O0FBQzNDLG9DQUFVLEdBQUc7SUFDbEIsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0tBQ2pEO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztLQUNsRDtJQUNELGdCQUFnQixFQUFFO1FBQ2hCLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7S0FDdkQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0tBQzVDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0tBQ2pEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztLQUM1QztJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztLQUNoRDtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztLQUNqRDtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7S0FDakQ7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDO0tBQ2xEO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztLQUNuRDtDQUNGLENBQUM7QUFFSixlQUFlLHlCQUF5QixDQUFDIn0=