"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const object_1 = require("@coffeekraken/sugar/object");
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
class SFrontspec {
    /**
     * @name            init
     * @type            Function
     * @static
     *
     * This method allows you to init the your SFrontspec instance and store it into the document.env.SUGAR.frontspec property
     *
     * @return          {SFrontspec}                                    The SFrontspec instance that represent the frontspec.json file
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static init(frontspec) {
        let frontspecInstance = new this(frontspec);
        // set the front in the env.SUGAR.front property
        if (!document.env)
            document.env = {};
        if (!document.env.SUGAR)
            document.env.SUGAR = {};
        document.env.SUGAR.frontspec = frontspecInstance;
        // return the current theme
        return frontspecInstance;
    }
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
            this._defaultFrontspecInstance = SFrontspec.init();
        }
        return this._defaultFrontspecInstance.get(dotpath);
    }
    /**
     * @name        metas
     * @type        ISFrontspecMetas
     * @private
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
     * @private
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
     * @private
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
     * @private
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
     * @private
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
     * @name        media
     * @type        ISFrontspecMedia
     * @private
     *
     * Store the frontspec media object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get media() {
        return this._frontspec.media;
    }
    /**
     * @name        views
     * @type        ISFrontspecViews
     * @private
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
     * @private
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
     * @private
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
     * @private
     *
     * Store the frontspec lod object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get lod() {
        return this._frontspec.lod;
    }
    /**
     * @name        partytown
     * @type        ISFrontspecPartytown
     * @private
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
        this.constructor._defaultFrontspecInstance = this;
        this._frontspec = (0, object_1.__deepMerge)(((_a = document.env) === null || _a === void 0 ? void 0 : _a.FRONTSPEC) ? document.env.FRONTSPEC : {}, frontspec);
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
        return (0, object_1.__get)(this._frontspec, dotpath);
    }
}
exports.default = SFrontspec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQWdCZCx1REFBZ0U7QUFFaEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUVILE1BQXFCLFVBQVU7SUFHM0I7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQXVCO1FBQy9CLElBQUksaUJBQWlCLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUMsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRztZQUFFLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUs7WUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO1FBRWpELDJCQUEyQjtRQUMzQixPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQWtCLEdBQUc7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNqQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3REO1FBQ0QsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFjRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFlBQXlCLEVBQUU7O1FBaEx2Qzs7Ozs7Ozs7O1dBU0c7UUFDSyxlQUFVLEdBQWdCLEVBQUUsQ0FBQztRQXVLakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFBLG9CQUFXLEVBQ3pCLENBQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3JELFNBQVMsQ0FDWixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsR0FBRyxDQUFDLFVBQWtCLEdBQUc7UUFDckIsT0FBTyxJQUFBLGNBQUssRUFBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQXRQRCw2QkFzUEMifQ==