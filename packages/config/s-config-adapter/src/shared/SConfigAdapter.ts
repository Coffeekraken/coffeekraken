import type { ISConfigEnvObj } from '@coffeekraken/s-config';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid } from '@coffeekraken/sugar/string';

/**
 * @name                                SConfigAdapter
 * @namespace           shared
 * @type                                Class
 * @platform            node
 * @platform            js
 * @status              beta
 *
 * Base class for SConfig adapters
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __SConfigAdapter
 * class $1 extends __SConfigAdapter {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 *      async load() {
 *          return {};
 *      }
 * }
 *
 * @example             js
 * import __SConfigAdapter from '@coffeekraken/s-config-adapter';
 * class SConfigCoolAdapter extends SConfigAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this.settings
 *    }
 *    async load() {
 *      // load the config the way you want and return it in Object format
 *      return {};
 *    }
 * }
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISConfigAdapterSettings {
    name: string;
    onUpdate: typeof Function;
}

export interface ISConfigAdapterLoadParams {
    env: ISConfigEnvObj;
    config: any;
}

export interface ISConfigAdapterLoadFn {
    (params: ISConfigAdapterLoadParams): Promise<any>;
}

export interface ISConfigAdapter {
    load: ISConfigAdapterLoadFn;
}

export default class SConfigAdapter {
    readyPromise;
    _readyPromiseResolve;

    /**
     * @name        settings
     * @type          ISConfigAdapterSettings
     *
     * Access the config adapter settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    settings: ISConfigAdapterSettings;

    /**
     * @name            name
     * @type            String
     * @get
     *
     * Access the adapter name. You can specify it through settings.configAdapter.name, otherwise it will be a randon string generated
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get name(): string {
        return this.settings.name;
    }

    /**
     * @name                              constructor
     * @type                              Function
     *
     * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
     *
     * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
     * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
     * - ...others: All the settings you need for your specific adapter
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings: Partial<ISConfigAdapterSettings>) {
        this.settings = __deepMerge(
            {
                name: `s-config-adapter-${__uniqid()}`,
            },
            settings ?? {},
        );

        this.readyPromise = new Promise((resolve) => {
            this._readyPromiseResolve = resolve;
        });
    }

    /**
     * @name        ready
     * @type        Function
     *
     * Call this method from your adapter when it is ready.
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    ready(): void {
        this._readyPromiseResolve();
    }

    /**
     * @name        update
     * @type        Function
     *
     * Function that you have to call when some configs have been updated
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _updateTimeout;
    update(): void {
        // calling the "onUpdate" setting callback if exists
        clearTimeout(this._updateTimeout);
        this._updateTimeout = setTimeout(() => {
            this.settings.onUpdate?.();
        }, 1000);
    }

    /**
     * @name        load
     * @type        Function
     *
     * Function that you have to override in your own adapter to load the configurations
     *
     * @param      {ISConfigAdapterLoadParams}         params           The parameters passed by the SConfig instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async load(params: ISConfigAdapterLoadParams): Promise<any> {
        return {};
    }
}
