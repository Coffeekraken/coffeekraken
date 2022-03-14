import __SInterface from '@coffeekraken/s-interface';
/**
 * @name                SSliderSlideableBehaviorInterface
 * @namespace           js.behaviors.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSliderSlideableBehavior behavior
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SSliderSlideableBehaviorInterface extends __SInterface {
    static get _definition() {
        return {
            friction: {
                description: 'Specify the friction to apply when you release the pointer. 1 mean full friction, 0 mean no friction',
                type: 'Number',
                default: 0.5,
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlclNsaWRlYWJsZUJlaGF2aW9ySW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1NsaWRlclNsaWRlYWJsZUJlaGF2aW9ySW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8saUNBQWtDLFNBQVEsWUFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLFdBQVcsRUFBRSxzR0FBc0c7Z0JBQ25ILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxHQUFHO2FBQ2Y7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=