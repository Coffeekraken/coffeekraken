import __STheme from '../shared/STheme';
/**
 * @name            STheme
 * @namespace       js
 * @type            Class
 * @extends         STheme
 *
 * This class represent the sugar theme you've passed the name in the constructor.
 * Once you have an instance of this theme you will have access to a lot of utilities
 * methods like "loopOnColors", etc...
 *
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @example         js
 * import STheme from '@coffeekraken/s-theme';
 * const theme = new STheme();
 * theme.loopOnColors(({name, modifier, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class STheme extends __STheme {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(theme, variant) {
        super(theme, variant);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBQ3hDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBYyxFQUFFLE9BQWdCO1FBQ3hDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQztDQUNKIn0=