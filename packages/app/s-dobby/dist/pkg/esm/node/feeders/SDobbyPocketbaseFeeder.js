import __pocketbase from 'pocketbase/cjs';
import __SDobbyFeeder from '../SDobbyFeeder.js';
global.EventSource = EventSource;
/**
 * @name                SDobbyPocketbaseFeeder
 * @namespace           node
 * @type                Class
 * @extends             SDobbyFeeder
 * @platform            node
 * @status              beta
 *
 * This class represent the pocketbase dobby feeder.
 *
 * @param           {SDobby}                    dobby           The dobby instance on which this pool is attached
 * @param           {ISDobbyPoolMetas}          poolMetas       The informations about the pool like name, uid, etc...
 * @param           {ISDobbyPoolSettings}          [settings={}]           Some settings to configure your dobby adapter instance
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDobbyPocketbaseFeeder extends __SDobbyFeeder {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(dobby, feederMetas, settings) {
        super(dobby, feederMetas, settings);
        this._pocketbase = new __pocketbase(this.settings.url);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sY0FBYyxNQUFNLG9CQUFvQixDQUFDO0FBVWhELE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBRWpDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxzQkFDakIsU0FBUSxjQUFjO0lBT3RCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksS0FBZSxFQUNmLFdBQStCLEVBQy9CLFFBQTBDO1FBRTFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0oifQ==