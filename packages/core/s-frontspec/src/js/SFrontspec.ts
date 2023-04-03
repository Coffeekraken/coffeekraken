// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
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

export interface ISFrontspecInitSettings {}

export default class SFrontspec extends __SClass {
    _defaultFrontspecInstance;

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
    static init(): SFront {
        const finalSettings = <ISFrontspecInitSettings>{};

        let frontspecInstance = new this(finalSettings);

        // set the front in the env.SUGAR.front property
        if (!document.env) document.env = {};
        if (!document.env.SUGAR) document.env.SUGAR = {};
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
    static get(dotpath: string = '.'): any {
        if (!this._defaultFrontspecInstance) {
            this._defaultFrontspecInstance = SFrontspec.init();
        }
        return this._defaultFrontspecInstance.get(dotpath);
    }

    /**
     * @name        _frontspec
     * @type        Object
     * @private
     *
     * Store the actual frontspec object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _frontspec = {};

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
        super(
            __deepMerge({
                metas: {
                    id: 'SFrontspec',
                },
            }),
        );

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
