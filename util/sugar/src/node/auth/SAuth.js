const __machineIdSync = require('node-machine-id').machineIdSync;

const __deepMerge = require('../object/deepMerge');

const __SAuthTerminalAdapter = require('./adapters/SAuthTerminalAdapter');
const __SCache = require('../cache/SCache');
const __cryptObject = require('../crypt/object');

/**
 * @name                            SAuth
 * @namespace                       sugar.node.auth
 * @type                            Class
 * 
 * Base class that gives you the ability to set/ask for some authentification informations like auth token, username-password, etc...
 * 
 * @example           js
 * const apiAuth = new SAuth('bitbucket');
 * const token = await apiAuth.ask('token');
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SAuth {

  /**
   * @name                          _name
   * @type                          String
   * @private
   * 
   * Store the instance name
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name                          _adapter
   * @type                          SAuthAdapter
   * @private
   * 
   * Store the instance adapter
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _adapter = null;

  /**
   * @name                          _settings
   * @type                          Object
   * @private
   * 
   * Store the instance settings
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * - adapter (SAuthTerminalAdapter) {SAuthAdapter}: The adapter instance you want to use to get the auth informations
   * - cache (null) {SCache}: An SCache instance to use to save the auth infos in. If null, a default filesystem cache instance will be created
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, settings = {}) {

    // store the name
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      throw new Error(`The name of an SAuth instance can contain only letters like [a-zA-Z0-9_-]...`);
    }
    this._name = name;

    // handle settings
    this._settings = __deepMerge({
      adapter: new __SAuthTerminalAdapter(),
      cache: new __SCache(`SAuth-${name}`, {

      })
    }, settings);

    // save the adapter
    this._adapter = this._settings.adapter;

  }

  /**
   * @name                          ask
   * @type                          Function
   * @async
   * 
   * Allows you to request for some auth informations to the user.
   * 
   * @param           {String}            type                
   * Specify the type of auth informations you want to ask. Here's the list of available options:
   * - basic: Request for a username:password info to the user and return the base64 encoded header
   * - bearer: Request for a bearer token to the user
   * @param           {Function}          validateCallback            An async function that has to validate getted auth infos and return true or false
   * @return          {Promise}                         A promise that will be resolved once the user (or the api) has answer with the correct infos
   * 
   * @example           js
   * const authInfos = await myAuthInstance.ask('basic');
   * // {
   * //   type: 'basic',
   * //   name: 'maAuth.basic',
   * //   value: 'QWxhZGRpbjpvcGVuIHNlc2FtZQ==',
   * //   ttl: 0,
   * //   headers: {
   * //     Authorization: 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
   * //   }
   * // }
   * 
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async ask(type, validateCallback = null) {

    // check that the requested auth type is handled by the adapter
    if (this._adapter.supportedAuthTypes.indexOf(type) === -1) {
      throw new Error(`You try to ask the auth informations of type "${type}" through the "${this._name}" SAuth instance but the setted adapter does not handle this auth type...`);
    }

    // check if we have already the infos in cache
    const cachedInfos = await this._settings.cache.get(type);
    if (cachedInfos) {
      const decryptedValue = __cryptObject.decrypt(cachedInfos, __machineIdSync());
      return decryptedValue;
    }

    // ask the adapter for the auth infos
    const infos = await this._adapter.ask(type);

    // validate the getted infos if possible
    if (validateCallback && ! await validateCallback(infos)) {
      return this.ask(type, validateCallback);
    }

    // crypt the infos before saving them into cache
    const cryptedInfos = __cryptObject.encrypt(infos, __machineIdSync());

    // the infos are ok so we save them in cache
    await this._settings.cache.set(type, cryptedInfos, {});

    // return the getted infos
    return infos;

  }

}