// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SProcessInterface
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
export default class SProcessInterface extends __SInterface {
}
// static extendsArray = ['SProcess', 'SPromise'];
SProcessInterface.definition = {
    help: {
        type: 'Boolean',
        alias: 'h',
        default: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Byb2Nlc3NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTUHJvY2Vzc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGlCQUFrQixTQUFRLFlBQVk7O0FBQ3pELGtEQUFrRDtBQUMzQyw0QkFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQyJ9