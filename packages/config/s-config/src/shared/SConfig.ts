// @ts-nocheck

import __SConfigAdapter from '@coffeekraken/s-config-adapter';
import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import { __isNode, __isPlainObject } from '@coffeekraken/sugar/is';
import {
    __deepMerge,
    __filterObject,
    __get,
    __set,
} from '@coffeekraken/sugar/object';

/**
 * @name                                            SConfig
 * @namespace          shared
 * @type                                            Class
 * @platform            node
 * @platform            js
 * @status              beta
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are:
 * - For node:
 *  - File system adapter: @coffeekraken/s-config/src/node/adapters/SConfigFsAdapter
 * - For js:
 *  - Localstorage adapter: @coffeekraken/s-config/src/js/adapters/SConfigLsAdapter
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      Add a "catch" method that allows to get the saving errors, etc...
 *
 * @snippet         __SConfig($1)
 * new __SConfig($1);
 *
 * @example             js
 * import SConfig, { SConfigLsAdapter } from '@coffeekraken/s-config';
 * const config = new SConfig('my-config', new SConfigLsAdapter();
 * await config.get('log.frontend.mail.host'); // => gmail.google.com
 * await config.set('log.frontend.mail.host', 'mailchimp.com');
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISConfigPostprocessFn {
    (currentConfig: any, config: any): any;
}

export interface ISConfigPreprocessFn {
    (currentRawConfig: any, rawConfig: any): any;
}

export interface ISConfigAfterLoadFn {
    (dotPath: string, originalValue: any, config: any): any;
}

export interface ISConfigResolverFn {
    ();
}

export interface ISConfigResolverObj {
    match: RegExp;
    resolve: ISConfigResolverFn;
}

export interface ISConfigEnvObj {
    platform: 'node' | 'browser';
    env: 'production' | 'development' | 'test';
}

export interface ISConfigLoadSettings {
    isUpdate: boolean;
    clean: boolean;
}

export interface ISConfigSettings {
    env: ISConfigEnvObj;
    cache: boolean;
    updateTimeout: number;
    loadTimeout: number;
    throwErrorOnUndefinedConfig: boolean;
    // resolvers: ISConfigResolverObj[];
}

export default class SConfig {
    /**
     * @name              _name
     * @type              {String}
     * @private
     *
     * The name of the config
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _name = null;

    /**
     * @name            adapter
     * @type            {Object}
     * @private
     *
     * Save the adapter instances
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    adapter;

    /**
     * @name             settings
     * @type              {Object}
     * @private
     *
     * Store the actual settings object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    settings = {};

    /**
     * @name             config
     * @type            Object
     *
     * Store the loaded config obect
     *
     * @since   2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    config: any = {};

    /**
     * @name             integrity
     * @type            Object
     *
     * Store the config integrity
     *
     * @since   2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    integrity: string = 'unkown';

    /**
     * @name        registerPostprocess
     * @type        Function
     * @static
     *
     * This method allows you to register a postprocess function that will be fired once the config is ready so you can make updates as needed
     *
     * @param     {String}      configId        The configuration id you want to proxy
     * @param     {String}      configKey       The root config key you want to prepare with that function. This has to be one of the root config property
     * @param     {ISConfigPostprocessFn}     postprocessFn         The post process function that MUST return the new current config and that take as parameters the current config object and the whole config object
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _registeredPostprocess: any = {};
    static registerPostprocess(
        configId: string,
        configKey: string,
        postprocessFn: ISConfigPostprocessFn,
    ) {
        if (!this._registeredPostprocess[configId])
            this._registeredPostprocess[configId] = {};
        this._registeredPostprocess[configId][configKey] = postprocessFn;
    }

    /**
     * @name        registerPreprocess
     * @type        Function
     * @static
     *
     * This method allows you to register a preprocess function that will be fired once the config is ready so you can make updates as needed
     *
     * @param     {String}      configId        The configuration id you want to proxy
     * @param     {String}      configKey       The root config key you want to preprocess with that function. This has to be one of the root config property
     * @param     {ISConfigPreprocessFn}     preprocessFn         The preprocess function that MUST return the new current config and that take as parameters the current config object and the whole config object
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _registeredPreprocesses: any = {};
    static registerPreprocess(
        configId: string,
        configKey: string,
        preprocessFn: ISConfigPreprocessFn,
    ) {
        if (!this._registeredPreprocesses[configId])
            this._registeredPreprocesses[configId] = {};
        this._registeredPreprocesses[configId][configKey] = preprocessFn;
    }

    /**
     * @name                  constructor
     * @type                  Function
     *
     * Init the config instance by passing a name and a settings object to configure your instance
     *
     * @param                 {String}                   name                  The name of the config
     * @param                   {SConfigAdapter}        adapter                 An SConfigAdapter instance to use
     * @param                {Object}                    [settings={}]
     * An object to configure your SConfig instance. See the list above
     * The available settings are:
     * - throwErrorOnUndefinedConfig (true) {Boolean}: Specify if you want the class to throw some errors when get undefined configs
     * - resolvers ([]) {ISConfigResolverObj[]}: Specify some resolvers function to handle special values like "[theme.something....]"
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(
        name,
        adapter: __SConfigAdapter,
        settings: ISConfigSettings = {},
    ) {
        // store the name
        if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
            throw new Error(
                `The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`,
            );
        }

        // save the settings name
        this.id = name;

        this.adapter = adapter;

        // save the settings
        this.settings = __deepMerge(
            {
                env: {
                    env: __SEnv.get('env') ?? 'development',
                    platform:
                        __SEnv.get('platform') ?? __isNode()
                            ? 'node'
                            : 'browser',
                    target: __SEnv.get('target') ?? 'development',
                    devsCut: __SEnv.get('devsCut'),
                },
                cache: true,
                updateTimeout: 500,
                loadTimeout: 5000,
                throwErrorOnUndefinedConfig: true,
            },
            settings,
        );

        if (!this.adapter instanceof __SConfigAdapter) {
            throw new Error(
                `You have to pass a valid SConfigAdapter instance to use with this SConfig instance`,
            );
        }

        let timeout;
        if (!this.adapter.settings.onUpdate) {
            this.adapter.settings.onUpdate = () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    // load the updated config
                    this.load({
                        isUpdate: true,
                    });
                }, this.settings.updateTimeout);
            };
        }
    }

    /**
     * @name                                load
     * @type                                Function
     *
     * Load the config from the default adapter or from the passed adapter
     *
     * @param           {String}            [adapter=this.settings.defaultAdapter]         The adapter to use to load the config
     * @return          {Promise}                                                           A promise that will be resolved with the loaded config
     *
     * @example           js
     * const config = await config.load();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async load(settings?: Partial<ISConfigLoadSettings>) {
        // wait until the adapter is ready
        await this.adapter.readyPromise;

        const duration = new __SDuration();

        const finalSettings: ISConfigLoadSettings = {
            isUpdate: false,
            clean: false,
            ...(settings ?? {}),
        };

        const loadTimeout = setTimeout(() => {
            throw new Error(
                `[SConfig.load] It seem's that your configuration take too long to load. Either do something about that or increase the SConfig "<yellow>loadTimeout</yellow>" setting...`,
            );
        }, this.settings.loadTimeout);

        // get the config integrity from the adapter
        this.integrity = await this.adapter.integrity();

        // check for cache first
        // if (this.settings.cache && !finalSettings.isUpdate) {
        //     const cachedConfigObj = await this.fromCache();

        //     if (cachedConfigObj?.integrity === this.integrity) {
        //         console.log(
        //             'FROM C',
        //             cachedConfigObj.integrity,
        //             this.integrity,
        //         );
        //         // clear the load timeout
        //         clearTimeout(loadTimeout);
        //         this.config = cachedConfigObj.config;
        //         return this.config;
        //     }
        // }

        // normal loading otherwise
        const loadedConfig = await this.adapter.load({
            env: this.settings.env,
            config: this.config,
        });

        Object.keys(loadedConfig).forEach((configId) => {
            if (!loadedConfig[configId]) return;
            this.config[configId] = loadedConfig[configId];
        });

        // filter depending on platform
        Object.keys(this.config).forEach((configId) => {
            const configObj = this.config[configId];
            if (
                configObj.metas?.platform &&
                configObj.metas.platform.indexOf(__SEnv.get('platform')) === -1
            ) {
                delete this.config[configId];
            }
        });

        if (this.constructor._registeredPreprocesses[this.id]) {
            for (
                let k = 0;
                k <
                Object.keys(this.constructor._registeredPreprocesses[this.id])
                    .length;
                k++
            ) {
                const configKey = Object.keys(
                    this.constructor._registeredPreprocesses[this.id],
                )[k];
                this.config[configKey] =
                    await this.constructor._registeredPreprocesses[this.id][
                        configKey
                    ]({
                        env: this.settings.env,
                        config: this.config,
                        get this() {
                            return this.config[configKey];
                        },
                        get theme() {
                            const themeId = `${this.config.theme.theme}-${this.config.theme.variant}`;
                            return this.config.theme.themes[themeId];
                        },
                        extends: __deepMerge,
                    });
            }
        }

        if (this.constructor._registeredPostprocess[this.id]) {
            for (
                let k = 0;
                k <
                Object.keys(this.constructor._registeredPostprocess[this.id])
                    .length;
                k++
            ) {
                const configKey = Object.keys(
                    this.constructor._registeredPostprocess[this.id],
                )[k];
                this.config[configKey] =
                    await this.constructor._registeredPostprocess[this.id][
                        configKey
                    ]({
                        env: this.settings.env,
                        config: this.config,
                        get this() {
                            return this.config[configKey];
                        },
                        get theme() {
                            const themeId = `${this.config.theme.theme}-${this.config.theme.variant}`;
                            return this.config.theme.themes[themeId];
                        },
                        extends: __deepMerge,
                    });
            }
        }

        if (this.config instanceof Promise) {
            throw new Error(
                'Promise based SConfig is not already implemented...',
            );
        } else if (__isPlainObject(this.config)) {
        } else if (this.config !== null && this.config !== undefined) {
            throw new Error(
                `SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${
                    this.config
                }" which is of type "${typeof this.config}"...`,
            );
        }

        // cache for later
        await this.cache();

        // filter the empty config
        if (finalSettings.clean) {
            this.config = __filterObject(this.config, (key, value) => {
                if (__isPlainObject(value) && !Object.keys(value).length)
                    return false;
                return true;
            });
        }

        // Serialize the config just to be sure all is ok
        try {
            JSON.stringify(this.config);
        } catch (e) {
            console.error(`[SConfig] Your configuration seems to be invalid... This is usually cause of one of these issue:

        - One of your configuration try to access another one that is not available in your current "api.env" which is
            - Platform: ${this.settings.env.platform}
            - Environment: ${this.settings.env.env}
        - One of your configuration does create a cyclic structure...

        Make sure to check these before anything else...
                    `);

            throw e;
        }

        // clear the load timeout
        clearTimeout(loadTimeout);

        // return the config
        return this.config;
    }

    /**
     * @name                          fromCache
     * @type                          Function
     *
     * Get the config from cache if possible. Otherwise it will resolve to undefined
     *
     * @return          {Promise}                                                             A promise resolved once the caching process has been done
     *
     * @example           js
     * await config.fromCache();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    fromCache(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            // different caching method for node or browser
            if (__isNode()) {
                const __fs = await import('fs');
                const { __packageRootDir } = await import(
                    '@coffeekraken/sugar/path'
                );
                const folderPath = `${__packageRootDir()}/.local/cache/config`,
                    filePath = `${folderPath}/${this.id}.${this.settings.env.env}.${this.settings.env.platform}.json`;
                if (!__fs.existsSync(folderPath) || !__fs.existsSync(filePath))
                    return resolve({});
                const jsonStr = __fs.readFileSync(filePath).toString();
                if (!jsonStr) return resolve({});
                resolve(JSON.parse(jsonStr));
            } else {
                // @TODO            implement browser cache
                throw new Error(
                    'Cache is not implemented in the browser for now...',
                );
            }
        });
    }

    /**
     * @name                          cache
     * @type                          Function
     *
     * Save the config in the cache to load it faster next time
     *
     * @return          {Promise}                                                             A promise resolved once the caching process has been done
     *
     * @example           js
     * await config.cache();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    cache() {
        return new Promise(async (resolve, reject) => {
            // different caching method for node or browser
            if (__isNode()) {
                const __fs = await import('fs');
                const { __packageRootDir } = await import(
                    '@coffeekraken/sugar/path'
                );

                const folderPath = `${__packageRootDir()}/.local/cache/config`;
                __fs.mkdirSync(folderPath, { recursive: true });
                __fs.writeFileSync(
                    `${folderPath}/${this.id}.${this.settings.env.env}.${this.settings.env.platform}.json`,
                    JSON.stringify(
                        {
                            integrity:
                                this.integrity ??
                                this.adapter.integrity?.() ??
                                'unknown',
                            config: this.toJson(),
                        },
                        null,
                        4,
                    ),
                );
                resolve(
                    `${folderPath}/${this.id}.${this.settings.env.env}.${this.settings.env.platform}.json`,
                );
            } else {
            }
        });
    }

    /**
     * @name                                get
     * @type                                Function
     *
     * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
     *
     * @param                 {String}                     path                 The dotted object path for the value wanted
     * @param                 {Object}                      [settings={}]         The same object settings that you can pass in the constructor but just for this get process
     * @return                {Mixed}                                            The value getted
     *
     * @example               js
     * await config.get('log.frontend.mail.host'); // => gmail.google.com
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(path: string, settings: Partial<ISConfigSettings> = {}) {
        settings = __deepMerge(this.settings, settings);

        if (Object.keys(this.config).length === 0) {
            throw new Error(
                `<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async static method`,
            );
        }

        let finalValue = __get(this.config, path);

        if (settings.throwErrorOnUndefinedConfig && finalValue === undefined) {
            throw new Error(
                `You try to get the config "${path}" on the "${this.id}" SConfig instance but this config does not exists...`,
            );
        }

        return finalValue;
    }

    /**
     * @name                                set
     * @type                                Function
     *
     * Set a config depending on the dotted object path passed and the value to set
     *
     * @param                 {String}                     path                 The dotted object path for the value wanted
     * @param               {Any}                       value          The value to set
     * @param                 {Object}                      [settings={}]         The same object settings that you can pass in the constructor but just for this get process
     * @return                {Mixed}                                            The value setted
     *
     * @example               js
     * await config.get('log.frontend.mail.host'); // => gmail.google.com
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set(path: string, value: any, settings = {}) {
        settings = __deepMerge(this.settings, settings);

        if (Object.keys(this.config).length === 0) {
            throw new Error(
                `<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async static method`,
            );
        }
        __set(this.config, path, value);
        return value;
    }

    /**
     * @name                                toObject
     * @type                    Function
     *
     * This method allows you to get the config in a simple object format
     *
     * @return      {Any}               The configuration in object format
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toObject() {
        return this.get('.');
    }

    /**
     * @name                                toJson
     * @type                    Function
     *
     * This method allows you to get the config in a simple json object format
     *
     * @return      {Any}               The configuration in object format
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toJson() {
        return JSON.parse(JSON.stringify(this.get('.')));
    }
}
