import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SFrontendCheckerCheckParamsInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe params of the frontendChecker.check cli command
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SFrontendCheckerCheckParamsInterface extends __SInterface {
    static get _definition() {
        return {
            url: {
                type: 'String',
                description: 'Specify the url of the webpage to check',
                required: true,
                alias: 'u',
            },
            includeLazy: {
                type: 'Boolean',
                description:
                    'Specify if you want to execute also the "lazy" checks that are usually launched by hand',
                default: false,
                alias: 'l',
            },
        };
    }
}
