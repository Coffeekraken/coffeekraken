import __sugarConfig from '@coffeekraken/s-sugar-config';
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
        default: __sugarConfig('process.asyncStart')
    },
    killOnError: {
        type: 'Boolean',
        default: __sugarConfig('process.killOnError')
    },
    emitErrorAsEvent: {
        type: 'Boolean',
        default: __sugarConfig('process.emitErrorAsEvent')
    },
    stdio: {
        type: 'String|SStdio|Boolean',
        alias: 's',
        default: __sugarConfig('process.stdio')
    },
    decorators: {
        type: 'Boolean',
        alias: 'd',
        default: __sugarConfig('process.decorators')
    },
    throw: {
        type: 'Boolean',
        alias: 't',
        default: __sugarConfig('process.throw')
    },
    exitAtEnd: {
        type: 'Boolean',
        alias: 'e',
        default: __sugarConfig('process.exitAtEnd')
    },
    runAsChild: {
        type: 'Boolean',
        alias: 'c',
        default: __sugarConfig('process.runAsChild')
    },
    definition: {
        type: 'Object',
        default: __sugarConfig('process.definition')
    },
    processPath: {
        type: 'String',
        default: __sugarConfig('process.processPath')
    },
    notification: {
        type: 'Object',
        default: __sugarConfig('process.notification')
    }
};
export default SProcessSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQcm9jZXNzU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLHlCQUEwQixTQUFRLFlBQVk7O0FBQzNDLG9DQUFVLEdBQUc7SUFDbEIsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxhQUFhLENBQUMsMEJBQTBCLENBQUM7S0FDbkQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsdUJBQXVCO1FBQzdCLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxlQUFlLENBQUM7S0FDeEM7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztLQUM3QztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLGVBQWUsQ0FBQztLQUN4QztJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0tBQzVDO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsb0JBQW9CLENBQUM7S0FDN0M7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxZQUFZLEVBQUU7UUFDWixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxhQUFhLENBQUMsc0JBQXNCLENBQUM7S0FDL0M7Q0FDRixDQUFDO0FBRUosZUFBZSx5QkFBeUIsQ0FBQyJ9