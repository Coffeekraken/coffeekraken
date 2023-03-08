import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SKitchenAddParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SKitchen.add method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SKitchenAddParamsInterface extends __SInterface {
    static get _definition() {
        return {
            ingredients: {
                description:
                    'Specify one or more ingredient(s) you want to add to your project',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: [
                    'frontspec',
                    'manifest',
                    'favicon',
                    'postcss',
                    'sugarJson',
                    'sugar',
                    'readme',
                ],
                required: true,
                alias: 'i',
            },
        };
    }
}
export default SKitchenAddParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sMEJBQTJCLFNBQVEsWUFBWTtJQUNqRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCxtRUFBbUU7Z0JBQ3ZFLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osV0FBVztvQkFDWCxVQUFVO29CQUNWLFNBQVM7b0JBQ1QsU0FBUztvQkFDVCxXQUFXO29CQUNYLE9BQU87b0JBQ1AsUUFBUTtpQkFDWDtnQkFDRCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGVBQWUsMEJBQTBCLENBQUMifQ==
