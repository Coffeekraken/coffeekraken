"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_validator_1 = __importDefault(require("@coffeekraken/s-validator"));
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
const validatorsDefinition = s_validator_1.default.getValidatorsDefinition(), validatorsMessagesDefinition = {};
for (let [validator, definition] of Object.entries(validatorsDefinition)) {
    validatorsMessagesDefinition[`${validator}Message`] = {
        description: `The message to display when the validator "${validator}" fails`,
        type: 'String',
    };
}
class SFormValidateFeatureInterface extends s_interface_1.default {
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
exports.default = SFormValidateFeatureInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLG9CQUFvQixHQUFHLHFCQUFZLENBQUMsdUJBQXVCLEVBQUUsRUFDL0QsNEJBQTRCLEdBQUcsRUFBRSxDQUFDO0FBRXRDLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7SUFDdEUsNEJBQTRCLENBQUMsR0FBRyxTQUFTLFNBQVMsQ0FBQyxHQUFHO1FBQ2xELFdBQVcsRUFBRSw4Q0FBOEMsU0FBUyxTQUFTO1FBQzdFLElBQUksRUFBRSxRQUFRO0tBQ2pCLENBQUM7Q0FDTDtBQUVELE1BQXFCLDZCQUE4QixTQUFRLHFCQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLHFEQUNPLG9CQUFvQixHQUNwQiw0QkFBNEIsS0FDL0IsSUFBSSxFQUFFO2dCQUNGLFdBQVcsRUFDUCx5RkFBeUY7Z0JBQzdGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxNQUFNO2FBQ2xCLEVBQ0QsRUFBRSxFQUFFO2dCQUNBLFdBQVcsRUFDUCx1RkFBdUY7Z0JBQzNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzNELEVBQ0QsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxpREFBaUQ7Z0JBQzlELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx1Q0FBdUM7YUFDbkQsRUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLG1HQUFtRztnQkFDdkcsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHlDQUF5QzthQUNyRCxFQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQ1Asd2JBQXdiO2dCQUM1YixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsRUFBRTthQUNkLEVBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCx3UUFBd1E7Z0JBQzVRLElBQUksRUFBRSxRQUFRO2FBQ2pCLEVBQ0QsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFDUCxtREFBbUQ7Z0JBQ3ZELElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2hCLEVBQ0QsWUFBWSxFQUFFO2dCQUNWLFdBQVcsRUFDUCwwREFBMEQ7Z0JBQzlELElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCLEVBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2hCLFdBQVcsRUFDUCw0SkFBNEo7Z0JBQ2hLLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx1QkFBdUI7YUFDbkMsSUFDSDtJQUNOLENBQUM7Q0FDSjtBQTVERCxnREE0REMifQ==