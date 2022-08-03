import __SInterface from '@coffeekraken/s-interface';
import __SValidator from '@coffeekraken/s-validator';
/**
 * @name                SFormValidateFeatureInterface
 * @namespace           js.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SFormValidateFeature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const validatorsDefinition = __SValidator.getValidatorsDefinition(), validatorsMessagesDefinition = {};
for (let [validator, definition] of Object.entries(validatorsDefinition)) {
    validatorsMessagesDefinition[`${validator}Message`] = {
        description: `The message to display when the validator "${validator}" fails`,
        type: 'String',
    };
}
export default class SFormValidateFeatureInterface extends __SInterface {
    static get _definition() {
        return Object.assign(Object.assign(Object.assign({}, validatorsDefinition), validatorsMessagesDefinition), { type: {
                description: 'Specify the validation type. Usually automatically detected depending on the field type',
                type: 'String',
                default: 'text',
            }, on: {
                description: 'Specify when to trigger a validation. Can be "change","submit","enter" and/or "reset"',
                type: 'Array<String>',
                values: ['keyup', 'change', 'submit', 'enter', 'reset'],
                default: ['keyup', 'change', 'submit', 'enter', 'reset'],
            }, errorClass: {
                description: 'Specify the class to apply when theres an error',
                type: 'String',
                default: 's-form-validate--error s-color--error',
            }, validClass: {
                description: 'Specify the class to apply on your s-form-validate element when validation is passed successfully',
                type: 'String',
                default: 's-form-validate--valid s-color--success',
            }, handlers: {
                description: 'Specify some custom handlers by validator that will be executed in addition to the default validate behavior. The handler will take as argument an object containing the "result" SValidator result, the "$feature" that represent the s-validate node, the "$form" node if exists, the "$node" attached node if using the "nodes" property, the "$field" that represent the input field handled and the "props" that represent the feature properties',
                type: 'Object',
                default: {},
            }, nodes: {
                description: 'Specify a css selector that target some HTMLElements used for the validation. Every HTMLElement has to specify 1 validator by using element attributes (same as on the feature itself). Classes are applied on each "node" to specify if the validator is valid or not',
                type: 'String',
            }, language: {
                description: 'Specify the language you want to use for messages',
                type: 'String',
                default: 'en',
            }, displayError: {
                description: 'Specify if you want to display the error messages or not',
                type: 'Boolean',
                default: true,
            }, errorContainerAttr: {
                description: 'Specify the attribute to search for the error container. If not found, a default container will be created and inserted after your s-form-validate element',
                type: 'String',
                default: 's-form-validate-error',
            } });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sb0JBQW9CLEdBQUcsWUFBWSxDQUFDLHVCQUF1QixFQUFFLEVBQy9ELDRCQUE0QixHQUFHLEVBQUUsQ0FBQztBQUV0QyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO0lBQ3RFLDRCQUE0QixDQUFDLEdBQUcsU0FBUyxTQUFTLENBQUMsR0FBRztRQUNsRCxXQUFXLEVBQUUsOENBQThDLFNBQVMsU0FBUztRQUM3RSxJQUFJLEVBQUUsUUFBUTtLQUNqQixDQUFDO0NBQ0w7QUFFRCxNQUFNLENBQUMsT0FBTyxPQUFPLDZCQUE4QixTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIscURBQ08sb0JBQW9CLEdBQ3BCLDRCQUE0QixLQUMvQixJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLHlGQUF5RjtnQkFDN0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLE1BQU07YUFDbEIsRUFDRCxFQUFFLEVBQUU7Z0JBQ0EsV0FBVyxFQUNQLHVGQUF1RjtnQkFDM0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ3ZELE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7YUFDM0QsRUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFLGlEQUFpRDtnQkFDOUQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHVDQUF1QzthQUNuRCxFQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQ1AsbUdBQW1HO2dCQUN2RyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUseUNBQXlDO2FBQ3JELEVBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCx3YkFBd2I7Z0JBQzViLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2FBQ2QsRUFDRCxLQUFLLEVBQUU7Z0JBQ0gsV0FBVyxFQUNQLHdRQUF3UTtnQkFDNVEsSUFBSSxFQUFFLFFBQVE7YUFDakIsRUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLElBQUk7YUFDaEIsRUFDRCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLDBEQUEwRDtnQkFDOUQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEIsRUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsV0FBVyxFQUNQLDRKQUE0SjtnQkFDaEssSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHVCQUF1QjthQUNuQyxJQUNIO0lBQ04sQ0FBQztDQUNKIn0=