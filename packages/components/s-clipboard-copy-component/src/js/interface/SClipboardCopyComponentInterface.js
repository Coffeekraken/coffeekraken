import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SClipboardCopyComponentInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SClipboardCopyComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SClipboardCopyComponentInterface extends __SInterface {
    static get _definition() {
        return {
            successTimeout: {
                description: 'Specify the duration for displaying the "success" icon',
                type: 'Number',
                default: 1500,
            },
            errorTimeout: {
                description: 'Specify the duration for displaying the "error" icon',
                type: 'Number',
                default: 3000,
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NsaXBib2FyZENvcHlDb21wb25lbnRJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ2xpcGJvYXJkQ29weUNvbXBvbmVudEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLGdDQUFpQyxTQUFRLFlBQVk7SUFDdEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1Asc0RBQXNEO2dCQUMxRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==