import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SStdioSettingsInterface
 * @namespace           shared.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @platform             js
 * @status              beta
 *
 * This class represent the interface that describe SStdio settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SStdioSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            filter: {
                description:
                    'Specify a function that will be used to filter the logs. It will take the log object as parameter and MUST return a boolean.',
                type: 'Function',
            },
            processor: {
                description:
                    'Specify a function that will be used to process the logs. It will take the log object and MUST return it, updated or not...',
                type: 'Function',
            },
            defaultLogObj: {
                description:
                    'Specify a default log object that will be used as base for each received logs',
                type: 'Object',
                default: {},
            },
            defaultAskObj: {
                description:
                    'Specify a default ask object that will be used as base for each received questions (ask)',
                type: 'Object',
                default: {},
            },
        };
    }
}
