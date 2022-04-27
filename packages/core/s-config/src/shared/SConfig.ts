// @ts-nocheck

import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __applyScope from '@coffeekraken/sugar/shared/object/applyScope';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __SConfigAdapter from './adapters/SConfigAdapter';

/**
 * @name                                            config
 * @namespace           s-config.shared
 * @type                                            Class
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
}

export interface ISConfigSettings {
    env: ISConfigEnvObj;
    cache: boolean;
    updateTimeout: number;
    throwErrorOnUndefinedConfig: boolean;
    resolvers: ISConfigResolverObj[];
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
     * @name             _settings
     * @type              {Object}
     * @private
     *
     * Store the actual settings object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _settings = {};

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
        this._settings = __deepMerge(
            {
                env: {
                    env: __SEnv.get('env') ?? 'development',
                    platform:
                        __SEnv.get('platform') ?? __isNode()
                            ? 'node'
                            : 'browser',
                },
                cache: true,
                updateTimeout: 500,
                throwErrorOnUndefinedConfig: true,
                resolvers: [],
            },
            settings,
        );

        if (!this.adapter instanceof __SConfigAdapter) {
            throw new Error(
                `You have to pass a valid SConfigAdapter instance to use with this SConfig instance`,
            );
        }

        function resolveConfig(string, matches, config, path) {
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];

                const value = __get(
                    config,
                    this.resolveDotPath(match, config, path),
                );

                if (value === undefined) {
                    throw new Error(
                        `<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" config value does not exiats...`,
                    );
                }

                if (string === match) return value;
                string = string.replace(match, value);
            }

            return string;
        }

        // register the default resolver "[config...]"
        this._settings.resolvers.unshift({
            match: /\[config.[a-zA-Z0-9.\-_]+\]/gm,
            resolveDotPath(match, config, path) {
                if (!match.match(/^\[config\./)) return;
                const dotPath = match.replace('[config.', '').replace(']', '');
                return dotPath;
            },
            resolve: resolveConfig,
        });

        // register the default resolver "[extends...]"
        this._settings.resolvers.unshift({
            name: 'extends',
            match: /\[extends.[a-zA-Z0-9\.\-_]+\]/gm,
            resolveDotPath(match, config, path) {
                const ext = __get(config, [path[0], '_extends']);
                if (!ext) return;
                const dotPath = `${ext}.${match
                    .replace('[extends.', '')
                    .replace(']', '')}`;

                return dotPath;
            },
            resolve(string, matches, config, path) {
                for (let i = 0; i < matches.length; i++) {
                    const match = matches[i];

                    const dotPath = this.resolveDotPath(match, config, path);

                    let value = __get(config, dotPath);

                    if (value === undefined) {
                        throw new Error(
                            `<red>[${this.constructor.name}]</red> Sorry but the referenced "<yellow>${match}</yellow>" extends config value does not exiats...`,
                        );
                    }

                    if (string === match) {
                        return value;
                    }
                    string = string.replace(match, value);
                }
                return string;
            },
        });

        // let timeout;
        // if (!adapterObj.instance._settings.onUpdate) {
        //     adapterObj.instance._settings.onUpdate = () => {
        //         clearTimeout(timeout);
        //         timeout = setTimeout(() => {
        //             // load the updated config
        //             this.load({
        //                 adapter: adapterName,
        //                 isUpdate: true,
        //             });
        //         }, this._settings.updateTimeout);
        //     };
        // }
    }

    /**
     * @name                                load
     * @type                                Function
     *
     * Load the config from the default adapter or from the passed adapter
     *
     * @param           {String}            [adapter=this._settings.defaultAdapter]         The adapter to use to load the config
     * @return          {Promise}                                                           A promise that will be resolved with the loaded config
     *
     * @example           js
     * const config = await config.load();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async load(settings?: Partial<ISConfigLoadSettings>) {
        const duration = new __SDuration();

        const finalSettings: ISConfigLoadSettings = {
            isUpdate: false,
            ...(settings ?? {}),
        };

        // get the config integrity from the adapter
        this.integrity = await this.adapter.integrity();

        // check for cache first
        // if (this._settings.cache && !finalSettings.isUpdate) {
        //     const cachedConfigObj = await this.fromCache();
        //     if (cachedConfigObj?.integrity === this.integrity) {
        //         this.config = cachedConfigObj.config;
        //         return this.config;
        //     }
        // }

        // normal loading otherwise
        const loadedConfig = await this.adapter.load(
            finalSettings.isUpdate,
            this._settings.env,
            this.config,
        );

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

        const extendsConfigIfNeeded = (configToExtends, configName) => {
            if (
                configToExtends.extends &&
                typeof configToExtends.extends === 'string'
            ) {
                const extend = configToExtends.extends;

                if (!this.config[extend]) {
                    throw new Error(
                        `<red>[SConfig]</red> You have set an "<yellow>extends</yellow>" property to "<magenta>${extend}</magenta>" inside the "<cyan>${configName}</cyan>" config but this configuration you want to extends does not exists...`,
                    );
                }

                const extendsConfig = extendsConfigIfNeeded(
                    Object.assign({}, this.config[extend]),
                    extend,
                );

                const newExtendedConfig = __deepMerge(
                    extendsConfig,
                    configToExtends,
                );
                Object.defineProperty(newExtendedConfig, '_extends', {
                    enumerable: false,
                    value: newExtendedConfig.extends,
                });
                delete newExtendedConfig.extends;

                return newExtendedConfig;
            } else {
                return configToExtends;
            }
        };

        // make a simple [] correspondance check
        __deepMap(this.config, ({ prop, value, path }) => {
            if (
                typeof value === 'string' &&
                value.split('[').length !== value.split(']').length
            ) {
                throw new Error(
                    `<red>[${this.constructor.name}]</red> We think that you've made a mistake in your config file at path "<yellow>${path}</yellow>" with the value "<cyan>${value}</cyan>"`,
                );
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
                this.config[
                    configKey
                ] = await this.constructor._registeredPreprocesses[this.id][
                    configKey
                ](this._settings.env, this.config[configKey], this.config);
            }
        }

        // handle the "extends" global property
        Object.keys(this.config).forEach((configName) => {
            this.config[configName] = extendsConfigIfNeeded(
                this.config[configName],
                configName,
            );
        });

        // resolve environment properties like @dev
        this._resolveEnvironments();

        this._settings.resolvers.forEach((resolverObj) => {
            this._resolveInternalReferences(resolverObj);
        });

        Object.keys(this._restPaths).forEach((dotPath) => {
            const actualConfig = __get(this.config, dotPath),
                extendsConfig = __get(this.config, this._restPaths[dotPath]);
            __set(
                this.config,
                dotPath,
                __deepMerge(
                    Object.assign({}, extendsConfig),
                    Object.assign({}, actualConfig),
                ),
            );
        });

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
                this.config[
                    configKey
                ] = await this.constructor._registeredPostprocess[this.id][
                    configKey
                ](this._settings.env, this.config[configKey], this.config);
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

        // @TODO        Support prop resolving
        // __deepMap(this.config, ({ object, prop, value, path }) => {
        //     if (path.match(/\[.*\]/)) {
        //         this._settings.resolvers.forEach((resolverObj) => {
        //             const matches = path.match(resolverObj.match);

        //             if (matches && matches.length) {
        //                 let resolvedValue = resolverObj.resolve(
        //                     path,
        //                     matches,
        //                     this.config,
        //                     path,
        //                 );

        //                 console.log('DDD', path, resolvedValue);
        //             }
        //         });
        //     }
        // });

        // cache for later
        this.cache();

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
    fromCache() {
        return new Promise(async (resolve, reject) => {
            // different caching method for node or browser
            if (__isNode()) {
                const __fs = await import('fs');
                const __packageRoot = await import(
                    '@coffeekraken/sugar/node/path/packageRoot'
                );
                const folderPath = `${__packageRoot.default()}/.local/cache/config`;
                if (!__fs.existsSync(folderPath)) return resolve();
                const jsonStr = __fs
                    .readFileSync(
                        `${folderPath}/${this.id}.${this._settings.env.env}.${this._settings.env.platform}.json`,
                    )
                    .toString();
                if (!jsonStr) return resolve();
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
                const __packageRoot = await import(
                    '@coffeekraken/sugar/node/path/packageRoot'
                );
                const folderPath = `${__packageRoot.default()}/.local/cache/config`;
                __fs.mkdirSync(folderPath, { recursive: true });
                __fs.writeFileSync(
                    `${folderPath}/${this.id}.${this._settings.env.env}.${this._settings.env.platform}.json`,
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
                    `${folderPath}/${this.id}.${this._settings.env.env}.${this._settings.env.platform}.json`,
                );
            } else {
            }
        });
    }

    _resolveEnvironments() {
        // __applyScope(
        //     this.config,
        //     __SEnv.get('env') === 'production'
        //         ? ['prod', 'production']
        //         : ['dev', 'development'],
        //     {
        //         prefix: 'env:'
        //     }
        // );
    }

    _restPaths = {};

    _resolveInternalReferences(resolverObj, path = [], iteration = 0) {
        let originalValue = __get(this.config, path);

        // if (path.includes('/.local')) {
        //     console.log(path, originalValue);
        // }

        iteration++;

        if (path.includes('...')) {
            const p = path.slice(0, path.indexOf('...'));
            const parentObj = __get(this.config, p);

            for (let i = 0; i < this._settings.resolvers.length; i++) {
                const resolver = this._settings.resolvers[i];
                if (!resolver.resolveDotPath) continue;
                const dotPath = resolver.resolveDotPath(
                    parentObj['...'],
                    this.config,
                    path,
                );
                if (dotPath) {
                    if (!this._restPaths[p.join('.')]) {
                        this._restPaths[p.join('.')] = dotPath;
                    }
                    break;
                }
            }

            return;

            // console.log(path);
        }

        if (__isPlainObject(originalValue)) {
            Object.keys(originalValue).forEach((key) => {
                this._resolveInternalReferences(
                    resolverObj,
                    [...path, key],
                    iteration,
                );
            });
        } else if (Array.isArray(originalValue)) {
            originalValue.forEach((v, i) => {
                this._resolveInternalReferences(
                    resolverObj,
                    [...path, i],
                    iteration,
                );
            });
        } else if (typeof originalValue === 'string') {
            const matches = originalValue.match(resolverObj.match);

            if (matches && matches.length) {
                let resolvedValue = resolverObj.resolve(
                    originalValue,
                    matches,
                    this.config,
                    path,
                );

                if (resolvedValue !== originalValue) {
                    let parentObj = __get(this.config, path.slice(0, -1));

                    if (path.slice(-1)[0] === '...') {
                        __deepMap(
                            Object.assign({}, resolvedValue),
                            ({ object, prop, value, path: localPath }) => {
                                __set(
                                    this.config,
                                    [...path.slice(0, -1), localPath],
                                    value,
                                );
                            },
                        );
                        delete parentObj['...'];
                    } else {
                        __set(this.config, path, resolvedValue);
                        this._resolveInternalReferences(
                            resolverObj,
                            path,
                            iteration,
                        );
                    }
                }
            }
        }
    }

    /**
     * @name                                get
     * @type                                Function
     *
     * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
     *
     * @param                 {String}                     path                 The dotted object path for the value wanted
     * @param                 {String}                      [adapter=null]       The data adapter that you want to use to retreive this value
     * @param                 {Object}                      [settings={}]         The same object settings that you can pass in the constructor but just for this get process
     * @return                {Mixed}                                            The value getted
     *
     * @example               js
     * await config.get('log.frontend.mail.host'); // => gmail.google.com
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(path, settings = {}, _level = 0) {
        settings = __deepMerge(this._settings, settings);

        if (Object.keys(this.config).length === 0) {
            throw new Error(
                `<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async instance function`,
            );
        }

        const originalValue = __get(this.config, path);

        if (
            settings.throwErrorOnUndefinedConfig &&
            originalValue === undefined
        ) {
            throw new Error(
                `You try to get the config "${path}" on the "${this.id}" SConfig instance but this config does not exists...`,
            );
        }

        return originalValue;
    }

    /**
     * @name                                toObject
     * @type                    Function
     *
     * This method allows you to get the config in a simple object format
     *
     * @return      {Any}               The configuration in object format
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
     * @return      {Any}               The configuration in object format
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toJson() {
        return JSON.parse(JSON.stringify(this.get('.')));
    }
}
