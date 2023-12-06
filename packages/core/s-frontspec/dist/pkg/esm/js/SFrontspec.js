// @ts-nocheck
import { __deepMerge, __get } from '@coffeekraken/sugar/object';
/**
 * @name                SFrontspec
 * @namespace           js
 * @type                Class
 * @extends             SClass
 * @platform            js
 * @status              beta
 *
 * This class represent the ```frontspec.json``` json that must be either in:
 * 1. The `document.env.SUGAR.frontspec` object
 * 2. The `document.env.FRONTSPEC` object
 * 3. The "frontspec" param of the constructor
 * Each level will be overrided by the upper one using a deepMerge.
 *
 * @param           {Object}        [frontspec={}]          A frontspec formated object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet        __SFrontspec.get($1)
 *
 * @example             js
 * import __SFrontspec from '@coffeekraken/s-frontspec';
 * const frontspec = new SFrontspec();
 * frontspec.get('partytown.enabled');
 * __SFrontspec.get('partytown.enabled');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SFrontspec {
    /**
     * @name        get
     * @type        Function
     * @static
     *
     * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
     *
     * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
     * @return      {Any}                                   The getted frontspec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotpath = '.') {
        if (!this._defaultFrontspecInstance) {
            this._defaultFrontspecInstance = new SFrontspec();
        }
        return this._defaultFrontspecInstance.get(dotpath);
    }
    /**
     * @name        metas
     * @type        ISFrontspecMetas
     * @public
     *
     * Store the frontspec metas object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get metas() {
        return this._frontspec.metas;
    }
    /**
     * @name        package
     * @type        ISFrontspecPackage
     * @public
     *
     * Store the frontspec package object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get package() {
        return this._frontspec.package;
    }
    /**
     * @name        assets
     * @type        ISFrontspecAssets
     * @public
     *
     * Store the frontspec assets object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get assets() {
        return this._frontspec.assets;
    }
    /**
     * @name        favicon
     * @type        ISFrontspecFavicon
     * @public
     *
     * Store the frontspec favicon object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get favicon() {
        return this._frontspec.favicon;
    }
    /**
     * @name        theme
     * @type        ISFrontspecTheme
     * @public
     *
     * Store the frontspec theme object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get theme() {
        return this._frontspec.theme;
    }
    /**
     * @name        views
     * @type        ISFrontspecViews
     * @public
     *
     * Store the frontspec views object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get views() {
        return this._frontspec.views;
    }
    /**
     * @name        specs
     * @type        ISFrontspecSpecs
     * @public
     *
     * Store the frontspec specs object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get specs() {
        return this._frontspec.specs;
    }
    /**
     * @name        google
     * @type        ISFrontspecGoogle
     * @public
     *
     * Store the frontspec google object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get google() {
        return this._frontspec.google;
    }
    /**
     * @name        lod
     * @type        ISFrontspecLod
     * @public
     *
     * Store the frontspec lod object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // get lod(): ISFrontspecLod {
    //     return this._frontspec.lod;
    // }
    /**
     * @name        partytown
     * @type        ISFrontspecPartytown
     * @public
     *
     * Store the frontspec partytown object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get partytown() {
        return this._frontspec.partytown;
    }
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(frontspec = {}) {
        var _a;
        /**
         * @name        _frontspec
         * @type        ISFrontspec
         * @private
         *
         * Store the actual frontspec object
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._frontspec = {};
        // set the front in the env.SUGAR.front property
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.frontspec = this;
        this.constructor._defaultFrontspecInstance = this;
        this._frontspec = __deepMerge(((_a = document.env) === null || _a === void 0 ? void 0 : _a.FRONTSPEC) ? document.env.FRONTSPEC : {}, frontspec);
    }
    /**
     * @name        get
     * @type        Function
     *
     * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
     *
     * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
     * @return      {Any}                                   The getted frontspec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(dotpath = '.') {
        return __get(this._frontspec, dotpath);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFlZCxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVU7SUFHM0I7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQWNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILDhCQUE4QjtJQUM5QixrQ0FBa0M7SUFDbEMsSUFBSTtJQUVKOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksWUFBeUIsRUFBRTs7UUFsS3ZDOzs7Ozs7Ozs7V0FTRztRQUNLLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBeUpqQyxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQUUsUUFBUSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSztZQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXBDLElBQUksQ0FBQyxXQUFXLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUN6QixDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNyRCxTQUFTLENBQ1osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQ3JCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKIn0=