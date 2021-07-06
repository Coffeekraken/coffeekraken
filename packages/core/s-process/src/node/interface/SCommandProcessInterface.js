// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __SProcessInterface from './SProcessInterface';
/**
 * @name                SCommandProcessInterface
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
export default class SCommandProcessInterface extends __SInterface {
}
// static extendsArray = ['SProcess', 'SPromise'];
SCommandProcessInterface.definition = Object.assign(Object.assign({}, __SProcessInterface.definition), { command: {
        type: 'String',
        alias: 'c',
        required: true
    } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbW1hbmRQcm9jZXNzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbW1hbmRQcm9jZXNzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLG1CQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBRXREOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyx3QkFBeUIsU0FBUSxZQUFZOztBQUNoRSxrREFBa0Q7QUFDM0MsbUNBQVUsbUNBQ1osbUJBQW1CLENBQUMsVUFBVSxLQUNqQyxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsUUFBUSxFQUFFLElBQUk7S0FDZixJQUNEIn0=