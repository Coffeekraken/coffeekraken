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

const validatorsDefinition = __SValidator.getValidatorsDefinition(),
    validatorsMessagesDefinition = {};

for (let [validator, definition] of Object.entries(validatorsDefinition)) {
    validatorsMessagesDefinition[`${validator}Message`] = {
        description: `The message to display when the validator "${validator}" fails`,
        type: 'String',
    };
}

export default class SFormValidateFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            ...validatorsDefinition,
            ...validatorsMessagesDefinition,
            type: {
                description:
                    'Specify the validation type. Usually automatically detected depending on the field type',
                type: 'String',
                default: 'text',
            },
            on: {
                description:
                    'Specify when to trigger a validation. Can be "change","submit","enter" and/or "reset"',
                type: 'Array<String>',
                values: ['keyup', 'change', 'submit', 'enter', 'reset'],
                default: ['keyup', 'change', 'submit', 'enter', 'reset'],
            },
            errorClass: {
                description: 'Specify the class to apply when theres an error',
                type: 'String',
                default: 's-form-validate--error s-color--error',
            },
            validClass: {
                description:
                    'Specify the class to apply on your s-form-validate element when validation is passed successfully',
                type: 'String',
                default: 's-form-validate--valid s-color--success',
            },
            language: {
                description:
                    'Specify the language you want to use for messages',
                type: 'String',
                default: 'en',
            },
            displayError: {
                description:
                    'Specify if you want to display the error messages or not',
                type: 'Boolean',
                default: true,
            },
            errorContainerAttr: {
                description:
                    'Specify the attribute to search for the error container. If not found, a default container will be created and inserted after your s-form-validate element',
                type: 'String',
                default: 's-form-validate-error',
            },
        };
    }
}
