const __machineIdSync = require('node-machine-id').machineIdSync;

const __deepMerge = require('../object/deepMerge');
const __fs = require('fs');

const __SAuthTerminalAdapter = require('./adapters/SAuthTerminalAdapter');
const __SCache = require('../cache/SCache');
const __cryptObject = require('../crypt/object');

/**
 * @name                            SAuth
 * @namespace           node.auth
 * @type                            Class
 *
 * Base class that gives you the ability to set/ask for some authentification informations like auth token, username-password, etc...
 *
 * @example           js
 * const apiAuth = new SAuth('bitbucket');
 * const token = await apiAuth.ask('token');
 *
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SAuth {
  /**
   * @name                          _name
   * @type                          String
   * @private
   *
   * Store the instance name
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name                          _adapter
   * @type                          SAuthAdapter
   * @private
   *
   * Store the instance adapter
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _adapter = null;

  /**
   * @name                          _settings
   * @type                          Object
   * @private
   *
   * Store the instance settings
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = null;

  /**
   * @name                          constructor
   * @type                          Function
   *
   * Construct the SAuth instance
   *
   * @param           {String}                name                  The name of this SAuth instance
   * @param           {Object}                [settings={}]
   * An object of settings to configure this SAuth instance. Here's the list of available settings:
   * - type (basic) {String}: Specify the auth type wanted. Can be 'basic', 'bearer', 'oauth2', etc...
   * - title (null) {String}: Specify the title to display on top of the form
   * - info (null) {String}: Specify some info to display on top of the form
   * - adapter (SAuthTerminalAdapter) {SAuthAdapter}: The adapter instance you want to use to get the auth informations
   * - cache (null) {SCache}: An SCache instance to use to save the auth infos in. If null, a default filesystem cache instance will be created
   * - validator (null) {Function}: An async function that take as parameters the auth type like "basic" and the auth object to check if the authentification is correct. Has to return a promise that need to be resolved with true if all is ok, and false if not. Can be also an error message to display to the user
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, settings = {}) {
    // store the name
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      throw new Error(
        `The name of an SAuth instance can contain only letters like [a-zA-Z0-9_-]...`
      );
    }
    this._name = name;

    // handle settings
    this._settings = __deepMerge(
      {
        type: 'basic',
        title: null,
        info: null,
        adapter: new __SAuthTerminalAdapter(),
        cache: new __SCache(`SAuth-${name}`, {}),
        validator: null
      },
      settings
    );

    // save the adapter
    this._adapter = this._settings.adapter;

    // process validator
    if (
      this._settings.validator &&
      typeof this._settings.validator === 'string'
    ) {
      if (
        __fs.existsSync(
          `${__dirname}/validators/${this._settings.validator}Validator.js`
        )
      ) {
        this._settings.validator = require(`${__dirname}/validators/${this._settings.validator}Validator.js`);
      }
    }
  }

  /**
   * @name                          type
   * @type                          String
   *
   * Access the auth type like "basic", "bearer", "oauth2", etc...
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get type() {
    return this._settings.type;
  }

  /**
   * @name                          authInfo
   * @type                          Object
   *
   * Get the authInfo object if already saved in memory or ask the user for this
   *
   * @param           {Object}            [settings={}]       An object of settings. Here's the options available:
   * - title (null) {String}: The title to display on top of the form
   * - type (settings.type) {String}: Specify the auth type that you want to ask to the user
   * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
   * - info (null) {String}: An info message to display to the user
   * @return          {Promise}                               A promise resolved with the authInfo object
   *
   * @example         js
   * const authInfo = await myAuth.authInfo();
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async authInfo(settings = {}) {
    settings = __deepMerge(
      {
        type: this.type,
        title: this._settings.title,
        info: this._settings.info,
        error: null
      },
      settings
    );

    // return the cached info in memory
    if (this._authInfo) return this._authInfo;

    // check if we have already the infos in cache
    const cachedInfos = await this._settings.cache.get(settings.type);
    if (cachedInfos) {
      const decryptedValue = __cryptObject.decrypt(
        cachedInfos,
        __machineIdSync()
      );
      return decryptedValue;
    }

    // ask the user for his credentials
    const authInfo = await this.ask(settings);

    // return the getted infos
    return authInfo;
  }

  /**
   * @name                          inject
   * @type                          Function
   *
   * This method take the passed requestConfig object and inject the auth parameters depending on the "injector" wanted that can be one of the described bellow
   *
   * @param           {String|Function}            injector              The injector wanted that can be one of these:
   * - axios: Inject the auth infos into an axio request config object
   * - Function: A function that take as parameters the requestConfig object and the authInfo object and has to return the updated requestConfig
   * @param           {Object}            requestConfig         The request config object into which inject the auth info
   * @param           {Object}            [authInfo=this.authInfo]      The authInfo object to use
   * @return          {Object}                                  The hooked requestConfig
   *
   * @example         js
   * myAuth.inject('axios', requestConfig);
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  inject(injector, requestConfig, authInfo = this._authInfo) {
    // if we don't have any auth info, return the request object untouched
    if (!authInfo) return requestConfig;

    // init the final request config variable that will be hooked
    let finalRequestConfig = {};

    // check if the injector is a string
    if (typeof injector === 'string') {
      if (!__fs.existsSync(`${__dirname}/injectors/${injector}Injector.js`)) {
        throw new Error(
          `You try to inject the auth info using the injector "${injector}" but it does not exists...`
        );
      }
      finalRequestConfig = require(`${__dirname}/injectors/${injector}Injector.js`)(
        Object.assign(requestConfig),
        authInfo
      );
    } else if (typeof injector === 'function') {
      finalRequestConfig = injector(Object.assign(requestConfig), authInfo);
    }

    // process a little bit the final request config object
    delete finalRequestConfig.name;
    delete finalRequestConfig.token;
    delete finalRequestConfig.type;

    // return the requestConfig untouched as fallback
    return finalRequestConfig;
  }

  /**
   * @name                          ask
   * @type                          Function
   * @async
   *
   * Allows you to request for some auth informations to the user.
   *
   * @param           {Object}            [settings={}]       An object of settings. Here's the options available:
   * - title (null) {String}: The title to display on top of the form
   * - type (settings.type) {String}: Specify the auth type that you want to ask to the user
   * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
   * - info (null) {String}: An info message to display to the user
   * @return          {Promise}                         A promise that will be resolved once the user (or the api) has answer with the correct infos
   *
   * @example           js
   * const authInfos = await myAuthInstance.ask();
   * // {
   * //   type: 'basic',
   * //   name: 'maAuth.basic',
   * //   token: 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
   * //   headers: {
   * //     Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
   * //   }
   * // }
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async ask(settings = {}) {
    settings = __deepMerge(
      {
        type: this.type,
        title: this._settings.title,
        info: this._settings.info,
        error: null
      },
      settings
    );

    // check that the requested auth type is handled by the adapter
    if (this._adapter.supportedAuthTypes.indexOf(settings.type) === -1) {
      throw new Error(
        `You try to ask the auth informations of type "${settings.type}" through the "${this._name}" SAuth instance but the setted adapter does not handle this auth type...`
      );
    }

    // ask the adapter for the auth infos
    const rawInfos = await this._adapter.ask(settings);

    // format the auth infos using the corresponsing formater
    let formatedInfos = rawInfos;
    if (__fs.existsSync(`${__dirname}/formaters/${settings.type}Formater.js`)) {
      formatedInfos = require(`${__dirname}/formaters/${settings.type}Formater.js`)(
        rawInfos
      );
    }

    // add the common formated auth object info
    formatedInfos = __deepMerge(
      {
        type: settings.type,
        name: `${this._name}.${settings.type}`
      },
      formatedInfos
    );

    // validate the getted infos if possible
    if (this._settings.validator) {
      // display validation message
      if (this._adapter._validation) {
        this._adapter._validation();
      }

      const validationResult = await this._settings.validator(formatedInfos);
      if (validationResult !== true) {
        const askSettings = Object.assign(settings);
        askSettings.error =
          typeof validationResult === 'string'
            ? validationResult
            : 'Your credentials have been declined. Please try again...';
        return this.ask(askSettings);
      }
    }

    // display validation message
    if (this._adapter._success) {
      await this._adapter._success();
    }

    // crypt the infos before saving them into cache
    const cryptedInfos = __cryptObject.encrypt(
      formatedInfos,
      __machineIdSync()
    );

    // the infos are ok so we save them in cache
    await this._settings.cache.set(settings.type, cryptedInfos, {});

    // save the auth info into memory
    this._authInfo = formatedInfos;

    // return the getted infos
    return formatedInfos;
  }
};
