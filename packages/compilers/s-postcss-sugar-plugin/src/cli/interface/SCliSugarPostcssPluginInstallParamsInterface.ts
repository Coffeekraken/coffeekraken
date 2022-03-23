// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SCliSugarPostcssPluginInstallParamsInterface
 * @namespace           cli.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar postcss.install` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SCliSugarPostcssPluginInstallParamsInterface extends __SInterface {
    static get _definition() {
        return {
            install: {
                description:
                    'Specify if you want to install the postcss plugins automatcally',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
