"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SAppearFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SAppearFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SAppearFeatureInterface extends s_interface_1.default {
    static get _definition() {
        return {
            in: {
                description: 'Specify the animation you want to use to display your element',
                type: 'String',
                default: 'fade',
                physical: true,
            },
            out: {
                description: 'Specify the animation you want to use to hide your item',
                type: 'String',
                physical: true,
            },
            delay: {
                description: 'Specify a delay before animation in or out your element. Can be an array of two number that define the min delay and the max delay. The real delay will be random between these two numbers',
                type: {
                    type: 'Array<Number>',
                    splitChars: [',']
                },
                default: [0]
            },
            duration: {
                description: 'Specify the duration of the animation in ms. Can be an array of two number that define the min delay and the max duration. The real duration will be random between these two numbers',
                type: {
                    type: 'Array<Number>',
                    splitChars: [',']
                },
                default: [500]
            },
            distance: {
                description: 'Specify the distance that your element will move if you have set an "in" direction. Can be an array of two number that define the min delay and the max distance. The real duration will be random between these two numbers',
                type: {
                    type: 'Array<Number>',
                    splitChars: [',']
                },
                default: [100, 120]
            },
            appear: {
                description: 'Specify if the element has to appear. This is usually setted automatically when needed',
                type: 'Boolean',
                default: false,
                physical: true,
            },
        };
    }
}
exports.default = SAppearFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLHVCQUF3QixTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxFQUFFLEVBQUU7Z0JBQ0EsV0FBVyxFQUNQLCtEQUErRDtnQkFDbkUsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUNQLHlEQUF5RDtnQkFDN0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLDZMQUE2TDtnQkFDak0sSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNmO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCx1TEFBdUw7Z0JBQzNMLElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUM7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLDhOQUE4TjtnQkFDbE8sSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLHdGQUF3RjtnQkFDNUYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBcERELDBDQW9EQyJ9