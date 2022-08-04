import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SState from './SState';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQTZDaEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxhQUFjLFNBQVEsUUFBUTtJQUMvQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBMEM7UUFDbEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQ0YsRUFBVSxFQUNWLEtBQVUsRUFDVixRQUFtQztRQUVuQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxrQkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUN4QixFQUFFLElBQ0MsUUFBUSxFQUNiLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0oifQ==