import __SInterface from '@coffeekraken/s-interface';

/**
 * @name                SGlitchFeatureInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This interface represent the attributes of the SGlitch feature
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SGlitchFeatureInterface extends __SInterface {
    static get _definition() {
        return {
            fps: {
                type: 'Number',
                description: 'Specify the frames per second of the render',
                default: 30,
            },
            minTimeout: {
                type: 'Number',
                description:
                    'Specify the min timeout between the glitches phase in ms',
                default: 0,
            },
            maxTimeout: {
                type: 'Number',
                description:
                    'Specify the max timeout between the glitches phase in ms',
                default: 5000,
            },
            minDiration: {
                type: 'Number',
                description: 'Specify the min glitch duration in ms',
                default: 100,
            },
            maxDuration: {
                type: 'Number',
                description: 'Specify the max glitch duration in ms',
                default: 2000,
            },
        };
    }
}
