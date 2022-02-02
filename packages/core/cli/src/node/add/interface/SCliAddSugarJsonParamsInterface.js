// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SCliAddSugarJsonParamsInterface
 * @namespace           node.add.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar add.sugarJson` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SCliAddSugarJsonParamsInterface extends __SInterface {
    static get _definition() {
        return {
            recipe: {
                description: 'Specify the recipe to use',
                type: 'String',
                required: true
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaUFkZFN1Z2FySnNvblBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDbGlBZGRTdWdhckpzb25QYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLCtCQUFnQyxTQUFRLFlBQVk7SUFDckUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsMkJBQTJCO2dCQUN4QyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==