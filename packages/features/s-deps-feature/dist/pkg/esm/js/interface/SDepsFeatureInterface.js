import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
                description: 'Specify the "chunk" css you want to load. This is relative to the "cssChunksBasePath" property and can be a simple id like "welcome" that will resolve to "${cssChunksBasePath}/welcome.css" or directly a path',
            },
            cssChunksBasePath: {
                type: 'String',
                description: 'Specify the path where are stored your css chunk files',
                get default() {
                    return `${__SSugarConfig.get('serve.css.path')}/chunks`;
                },
            },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8scUJBQXNCLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxpTkFBaU47YUFDeE47WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQ1Asd0RBQXdEO2dCQUM1RCxJQUFJLE9BQU87b0JBQ1AsT0FBTyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO2dCQUM1RCxDQUFDO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=