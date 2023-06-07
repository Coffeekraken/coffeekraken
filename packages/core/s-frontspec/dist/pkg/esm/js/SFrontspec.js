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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFnQmQsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFVO0lBRzNCOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUF1QjtRQUMvQixJQUFJLGlCQUFpQixHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFBRSxRQUFRLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLO1lBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztRQUVqRCwyQkFBMkI7UUFDM0IsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0RDtRQUNELE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBY0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxHQUFHO1FBQ0gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxZQUF5QixFQUFFOztRQWhMdkM7Ozs7Ozs7OztXQVNHO1FBQ0ssZUFBVSxHQUFnQixFQUFFLENBQUM7UUF1S2pDLElBQUksQ0FBQyxXQUFXLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUN6QixDQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNyRCxTQUFTLENBQ1osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUcsQ0FBQyxVQUFrQixHQUFHO1FBQ3JCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKIn0=