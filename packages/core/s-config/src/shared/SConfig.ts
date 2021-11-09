// @ts-nocheck

import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __SDuration from '@coffeekraken/s-duration';
import __SEnv from '@coffeekraken/s-env';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __applyScope from '@coffeekraken/sugar/shared/object/applyScope';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
import __SConfigAdapter from './adapters/SConfigAdapter';
import __memoize from '@coffeekraken/sugar/shared/function/memoize';
import __isNode from '@coffeekraken/sugar/shared/is/node';

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
 * const config = new SConfig({
 *   adapters: [
 *    new SConfigLsAdapter()
 *   ]
 * });
 * await config.get('log.frontend.mail.host'); // => gmail.google.com
 * await config.set('log.frontend.mail.host', 'mailchimp.com');
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    env: 'prod' | 'dev' | 'test';
}

export interface ISConfigSettings {
    env: ISConfigEnvObj;
    adapters: any[]; // @TODO     make an interface for adapter
    defaultAdapter: string;
    allowSave: boolean;
    allowSet: boolean;
    allowReset: boolean;
    allowNew: boolean;
    autoLoad: boolean;
    autoSave: boolean;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _name = null;

    /**
     * @name            _adapters
     * @type            {Object}
     * @private
     *
     * Save the registered adapters instances
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _adapters = {};

    /**
     * @name             _settings
     * @type              {Object}
     * @private
     *
     * Store the actual settings object
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _settings = {};

    /**
     * @name             config
     * @type            Object
     *
     * Store the loaded config obect
     *
     * @since   2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    config: any = {};

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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @param                {Object}                    [settings={}]
     * An object to configure your SConfig instance. See the list above
     * The available settings are:
     * - adapters ([]) {Array}: An array of adapters instances to use for this SConfig instance
     * - defaultAdapter (null) {String}: This specify which adapter you want to use as default one. If not set, take the first adapter in the adapters list
     * - allowSave (true) {Boolean}: Specify if this instance can save the updated configs
     * - allowSet (true) {Boolean}: Specify if you can change the configs during the process or not
     * - allowReset (true) {Boolean}: Specify if you can rest the configs during the process or not
     * - allowNew (false) {Boolean}: Specify you can create new configs with this instance or not
     * - autoLoad (true) {Boolean}: Specify if you want the config to be loaded automatically at instanciation
     * - autoSave (true) {Boolean}: Specify if you want the setting to be saved through the adapters directly on "set" action
     * - throwErrorOnUndefinedConfig (true) {Boolean}: Specify if you want the class to throw some errors when get undefined configs
     * - resolvers ([]) {ISConfigResolverObj[]}: Specify some resolvers function to handle special values like "[theme.something....]"
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(name, settings: ISConfigSettings = {}) {
        // store the name
        if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
            throw new Error(
                `The name of an SConfig instance can contain only letters like [a-zA-Z0-9_-]...`,
            );
        }

        // save the settings name
        this.id = name;

        // save the settings
        this._settings = __deepMerge(
            {
                env: {
                    env: __SEnv.get('env') ?? 'dev',
                    platform:
                        __SEnv.get('platform') ?? __isNode()
                            ? 'node'
                            : 'browser',
                },
                adapters: [],
                defaultAdapter: null,
                allowSave: true,
                allowSet: true,
                allowReset: true,
                allowNew: false,
                autoLoad: true,
                autoSave: true,
                updateTimeout: 500,
                throwErrorOnUndefinedConfig: true,
                resolvers: [],
            },
            settings,
        );

        // init all the adapters if needed
        this._settings.adapters.forEach((adapter) => {
            if (!adapter instanceof __SConfigAdapter) {
                throw new Error(
                    `You have specified the adapter "${
                        adapter.name || 'unknown'
                    }" as adapter for your "${
                        this.id
                    }" SConfig instance but this adapter does not extends the SConfigAdapter class...`,
                );
            }

            // make sure we have a name for this adapter
            if (!adapter.name) {
                adapter.name = this.id + ':' + adapter.constructor.name;
            } else {
                adapter.name = this.id + ':' + adapter.name;
            }

            this._adapters[adapter.name] = {
                instance: adapter,
                config: {},
            };
        });

        // set the default get adapter if it has not been specified in the settings
        if (!this._settings.defaultAdapter) {
            this._settings.defaultAdapter = Object.keys(this._adapters)[0];
        }

        function resolveConfig(string, matches, config, path) {
            for (let i = 0; i < matches.length; i++) {
                const match = matches[i];

                const value = __get(
                    config,
                    match.replace('[config.', '').replace(']', ''),
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
            resolve: resolveConfig,
        });

        // register the default resolver "[extends...]"
        this._settings.resolvers.unshift({
            name: 'extends',
            match: /\[extends.[a-zA-Z0-9\.\-_]+\]/gm,
            resolve(string, matches, config, path) {
                for (let i = 0; i < matches.length; i++) {
                    const match = matches[i];

                    const ext = __get(config, path[0] + '._extends');

                    const dotPath = `${ext}.${match
                        .replace('[extends.', '')
                        .replace(']', '')}`;

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

        Object.keys(this._adapters).forEach((adapterName) => {
            const adapterObj = this._adapters[adapterName];
            let timeout;
            if (!adapterObj.instance) return;
            if (!adapterObj.instance._settings.onUpdate) {
                adapterObj.instance._settings.onUpdate = () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        // load the updated config
                        this.load(adapterName, true);
                    }, this._settings.updateTimeout);
                };
            }
        });

        // load the config from the default adapter if the setting "autoLoad" is true
        // if (this._settings.autoLoad) {
        //     throw 'COCO';
        //     console.log('LOAD');
        //     this.load();
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    async load(adapter = this._settings.defaultAdapter, isUpdate = false) {
        const duration = new __SDuration();

        if (!this._adapters[adapter]) {
            throw new Error(
                `You try to load the config from the adapter "${adapter}" but this adapter does not exists...`,
            );
        }

        if (
            !isUpdate &&
            Object.keys(this._adapters[adapter].config).length !== 0
        ) {
            return this._adapters[adapter].config;
        }

        const loadedConfig = await this._adapters[adapter].instance.load(
            isUpdate,
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

        // console.log(
        //     'AAA',
        //     this.config.theme.themes['default-dark']?.color?.main,
        //     this.config.theme.themes,
        // );

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
                this.config[configKey] =
                    await this.constructor._registeredPreprocesses[this.id][
                        configKey
                    ](this._settings.env, this.config[configKey], this.config);
            }
        }

        // console.log('AA', this.config.theme.themes);

        // handle the "extends" global property
        Object.keys(this.config).forEach((configName) => {
            this.config[configName] = extendsConfigIfNeeded(
                this.config[configName],
                configName,
            );
        });

        // console.log('A', this.config.theme.themes['default-dark']?.color?.main);

        // resolve environment properties like @dev
        this._resolveEnvironments();

        // console.log(
        //     'BBB',
        //     this.config.theme.themes['default-dark']?.color?.main,
        //     this.config.theme.themes,
        // );

        this._settings.resolvers.forEach((resolverObj) => {
            // console.log(resolverObj.match);
            this._resolveInternalReferences(resolverObj);
        });
        // this._resolveInternalReferences();

        // console.log(
        //     'BB',
        //     this.config.theme.themes['default-dark']?.color?.main,
        // );

        // console.log(__get(this.config, 'theme.themes'), 'DD');

        // console.log(this._restPaths);

        // this._restPaths
        //     // .sort((first, second) => {
        //     //     if (first.split('.').length < second.split('.').length) return -1;
        //     // })
        //     .forEach((path) => {
        //         let obj = __get(this.config, path);
        //         let newObj = {};
        //         Object.keys(obj).forEach((key) => {
        //             if (key === '...') {
        //                 // console.log('FF', obj['...']);

        //                 const value = obj['...'];
        //                 if (!__isPlainObject(value)) {
        //                     newObj['...'] = value;
        //                     return;
        //                 }

        //                 newObj = {
        //                     ...newObj,
        //                     ...obj['...'],
        //                 };
        //                 delete obj['...'];
        //             } else {
        //                 newObj[key] = obj[key];
        //             }
        //         });
        //         __set(this.config, path, newObj);
        //     });

        // console.log(this.config.themeLightBase.colorSchemas);
        // console.log(this.config.themeDefaultLight.color.main);
        // console.log(__flatten(this.config));

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
                    ](this._settings.env, this.config[configKey], this.config);
            }
        }

        if (this.config instanceof Promise) {
            throw new Error(
                'Promise based SConfig is not already implemented...',
            );
        } else if (__isPlainObject(this.config)) {
            this._adapters[adapter].config = this.config;
            this._adapters[adapter].config.$ = {
                hash: __md5.encrypt(this.config),
                loadedAt: Date.now(),
            };
            return this.config;
        } else if (this.config !== null && this.config !== undefined) {
            throw new Error(
                `SConfig: Your "load" method of the "${adapter}" adapter has to return either a plain object, or a Promise resolved with a plain object. The returned value is "${
                    this.config
                }" which is of type "${typeof this.config}"...`,
            );
        }
    }

    _resolveEnvironments() {
        __applyScope(
            this.config,
            __SEnv.get('env') === 'production'
                ? ['prod', 'production']
                : ['dev', 'development'],
        );
    }

    /**
     * @name                          save
     * @type                          Function
     *
     * Save the config through all the registered adapters or just the one specify in params
     *
     * @param           {String|Array}          [adapters=Object.keys(this._adapters)]        The adapters to save the config through
     * @return          {Promise}                                                             A promise once all the adapters have correctly saved the config
     *
     * @example           js
     * await config.save();
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    save(adapters = Object.keys(this._adapters)) {
        if (!this._settings.allowSave) {
            throw new Error(
                `You try to save the config on the "${this.id}" SConfig instance but this instance does not allow to save configs... Set the "settings.allowSave" property to allow this action...`,
            );
        }

        for (let i = 0; i < adapters.length; i++) {
            const adapter = adapters[i];

            if (adapter && !this._adapters[adapter]) {
                throw new Error(
                    `You try to save the config on the "${this.id}" SConfig instance using the adapter "${adapter}" but this adapter does not exists...`,
                );
            }

            this._adapters[adapter].instance.save(
                this._adapters[adapter].config,
            );
        }

        // all saved correctly
        return true;
    }

    _restPaths = [];

    _resolveInternalReferences(resolverObj, path = [], iteration = 0) {
        let originalValue = __get(this.config, path.join('.'));

        iteration++;

        // if (path.indexOf('coco') !== -1)
        //     console.log(iteration, resolverObj.match, path);

        if (path.indexOf('...') !== -1) {
            const p = path.slice(0, path.indexOf('...'));
            const parentObj = __get(this.config, p.join('.'));
            originalValue = parentObj['...'];
            // if (this._restPaths.indexOf(p.join('.')) === -1) {
            //     this._restPaths.push(p.join('.'));
            // }

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
            // this._settings.resolvers.forEach((resolverObj) => {
            const matches = originalValue.match(resolverObj.match);

            if (matches && matches.length) {
                let resolvedValue = resolverObj.resolve(
                    originalValue,
                    matches,
                    this.config,
                    path,
                );

                if (resolvedValue !== originalValue) {
                    let parentObj = __get(
                        this.config,
                        path.slice(0, -1).join('.'),
                    );
                    // if (path.slice(-1)[0] === 'coco') {
                    //     console.log(path.join('.'), path.slice(-1)[0]);
                    // }

                    if (path.slice(-1)[0] === '...') {
                        __deepMap(
                            Object.assign({}, resolvedValue),
                            ({ object, prop, value, path: localPath }) => {
                                const fullPath = `${path
                                    .slice(0, -1)
                                    .join('.')}.${localPath}`;
                                __set(this.config, fullPath, value);
                            },
                        );
                        delete parentObj['...'];
                    } else {
                        __set(this.config, path.join('.'), resolvedValue);
                        this._resolveInternalReferences(
                            resolverObj,
                            path,
                            iteration,
                        );
                    }
                }
            }
            // });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get(
        path,
        adapter = this._settings.defaultAdapter,
        settings = {},
        _level = 0,
    ) {
        settings = __deepMerge(this._settings, settings);

        if (adapter && !this._adapters[adapter]) {
            throw new Error(
                `You try to get the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`,
            );
        }

        if (Object.keys(this._adapters[adapter].config).length === 0) {
            throw new Error(
                `<red>[${this.constructor.name}]</red> You MUST load the configuration before accessing them by calling the SConfig.load() async instance function`,
            );
        }

        const originalValue = __get(this._adapters[adapter].config, path);

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
     * @name                                set
     * @namespace           node.config.SConfig
     * @type                                Function
     *
     * Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one
     *
     * @param                 {String}                     path                 The dotted object path for the value wanted
     * @param                 {Mixed}                      value                 The value to set
     * @param                 {String|Array}                      [adapters=Object.keys(this._adapters)]       The adapter you want to use or an array of adapters
     * @return                {Promise}                                          A promise resolved once the setting has been correctly set (and save depending on your instance config)
     *
     * @example               js
     * config.set('log.frontend.mail.host', 'coffeekraken.io');
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    set(path, value, adapters = Object.keys(this._adapters)) {
        if (!this._settings.allowSet) {
            throw new Error(
                `You try to set a config value on the "${this.id}" SConfig instance but this instance does not allow to set values... Set the "settings.allowSet" property to allow this action...`,
            );
        }

        // check if we allow new config or not
        if (
            !this._settings.allowNew &&
            __get(
                this._adapters[this._settings.defaultAdapter].config,
                path,
            ) === undefined
        ) {
            throw new Error(
                `You try to set the config "${path}" on the "${this.id}" SConfig instance but this config does not exists and this instance does not allow for new config creation...`,
            );
        }

        adapters.forEach((adapter) => {
            if (adapter && !this._adapters[adapter]) {
                throw new Error(
                    `You try to set the config value "${path}" using the adapter "${adapter}" but this adapter does not exists...`,
                );
            }

            __set(this._adapters[adapter].config, path, value);
        });

        // check if need to autoSave or not
        if (this._settings.autoSave) {
            return this.save(adapters);
        }

        // return true
        return true;
    }
}
