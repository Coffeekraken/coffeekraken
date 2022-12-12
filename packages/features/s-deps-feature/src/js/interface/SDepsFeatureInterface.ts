import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SDepsFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SCssPartial feature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SDepsFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            css: {
                type: 'String',
                description:
                    'Specify the "partial" css you want to load. This is relative to the "rootPath" property and can be a simple id like "welcome" that will resolve to "${cssPartialsPath}/welcome.css" or directly a path',
            },
            // cssPartialsPath: {
            //     type: 'String',
            //     description:
            //         'Specify the path where are stored your css partials files',
            //     get default() {
            //         return `${__SSugarConfig.get('serve.css.path')}/partials`;
            //     },
            // },
        };
    }
}
