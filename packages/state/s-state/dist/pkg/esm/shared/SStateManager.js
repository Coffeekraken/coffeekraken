import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SState from './SState.js';
export default class SStateManager extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name           define
     * @type            Function
     *
     * This method allows you to define a new state inside the state manager.
     * It's like creating a new SState instance but quicker
     *
     * @param       {String}            id          The state id you want to create
     * @param       {Object}            state       The state object used to create the SState instance
     * @param       {ISStateSettings}   [setting={}]        Some settings to configure your SState instance
     * @return      {SState}                        The SState instanvce that describe your state
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    define(id, state, settings) {
        this[id] = new __SState(state, Object.assign({ save: this.settings.save, id }, settings));
        return this[id];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RCxPQUFPLFFBQVEsTUFBTSxhQUFhLENBQUM7QUE2Q25DLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLFFBQVE7SUFDL0M7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTBDO1FBQ2xELEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUNGLEVBQVUsRUFDVixLQUFVLEVBQ1YsUUFBbUM7UUFFbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssa0JBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFDeEIsRUFBRSxJQUNDLFFBQVEsRUFDYixDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNKIn0=