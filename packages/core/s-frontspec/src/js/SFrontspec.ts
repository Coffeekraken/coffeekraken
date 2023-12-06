// @ts-nocheck

import type {
    ISFrontspec,
    ISFrontspecAssets,
    ISFrontspecFavicon,
    ISFrontspecGoogle,
    // ISFrontspecLod,
    ISFrontspecMetas,
    ISFrontspecPackage,
    ISFrontspecPartytown,
    ISFrontspecSpecs,
    ISFrontspecTheme,
    ISFrontspecViews,
} from '@coffeekraken/s-frontspec';
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

export default class SFrontspec implements ISFrontspec {
    _defaultFrontspecInstance;

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
    static get(dotpath: string = '.'): any {
        if (!this._defaultFrontspecInstance) {
            this._defaultFrontspecInstance = new SFrontspec();
        }
        return this._defaultFrontspecInstance.get(dotpath);
    }

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
    private _frontspec: ISFrontspec = {};

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
    get metas(): ISFrontspecMetas {
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
    get package(): ISFrontspecPackage {
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
    get assets(): ISFrontspecAssets {
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
    get favicon(): ISFrontspecFavicon {
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
    get theme(): ISFrontspecTheme {
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
    get views(): ISFrontspecViews {
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
    get specs(): ISFrontspecSpecs {
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
    get google(): ISFrontspecGoogle {
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
    get partytown(): ISFrontspecPartytown {
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
    constructor(frontspec: ISFrontspec = {}) {
        // set the front in the env.SUGAR.front property
        if (!document.env) document.env = {};
        if (!document.env.SUGAR) document.env.SUGAR = {};
        document.env.SUGAR.frontspec = this;

        this.constructor._defaultFrontspecInstance = this;
        this._frontspec = __deepMerge(
            document.env?.FRONTSPEC ? document.env.FRONTSPEC : {},
            frontspec,
        );
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
    get(dotpath: string = '.'): any {
        return __get(this._frontspec, dotpath);
    }
}
