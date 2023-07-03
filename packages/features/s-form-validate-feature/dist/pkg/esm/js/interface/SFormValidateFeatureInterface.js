import __SInterface from '@coffeekraken/s-interface';
import __SValidator from '@coffeekraken/s-validator';
import { __format } from '@coffeekraken/sugar/string';
/**
 * @name                SFormValidateFeatureInterface
 * @namespace           js.interface
 * @type                      Class
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
            }, format: {
                description: 'Specify if you want your value to be formatted a certain way. You can specify every "import { __format } from `@coffeekraken/sugar/string`" supported formats',
                type: 'String',
                values: __format.formats,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLG9CQUFvQixHQUFHLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxFQUMvRCw0QkFBNEIsR0FBRyxFQUFFLENBQUM7QUFFdEMsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFBRTtJQUN0RSw0QkFBNEIsQ0FBQyxHQUFHLFNBQVMsU0FBUyxDQUFDLEdBQUc7UUFDbEQsV0FBVyxFQUFFLDhDQUE4QyxTQUFTLFNBQVM7UUFDN0UsSUFBSSxFQUFFLFFBQVE7S0FDakIsQ0FBQztDQUNMO0FBRUQsTUFBTSxDQUFDLE9BQU8sT0FBTyw2QkFBOEIsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLHFEQUNPLG9CQUFvQixHQUNwQiw0QkFBNEIsS0FDL0IsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx5RkFBeUY7Z0JBQzdGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2FBQ2xCLEVBQ0QsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFDUCx1RkFBdUY7Z0JBQzNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzNELEVBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCwrSkFBK0o7Z0JBQ25LLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxRQUFRLENBQUMsT0FBTzthQUMzQixFQUNELFVBQVUsRUFBRTtnQkFDUixXQUFXLEVBQUUsaURBQWlEO2dCQUM5RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsdUNBQXVDO2FBQ25ELEVBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFDUCxtR0FBbUc7Z0JBQ3ZHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx5Q0FBeUM7YUFDckQsRUFDRCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLHdiQUF3YjtnQkFDNWIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEVBQUU7YUFDZCxFQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1Asd1FBQXdRO2dCQUM1USxJQUFJLEVBQUUsUUFBUTthQUNqQixFQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1AsbURBQW1EO2dCQUN2RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNoQixFQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsMERBQTBEO2dCQUM5RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQixFQUNELGtCQUFrQixFQUFFO2dCQUNoQixXQUFXLEVBQ1AsNEpBQTRKO2dCQUNoSyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsdUJBQXVCO2FBQ25DLElBQ0g7SUFDTixDQUFDO0NBQ0oifQ==