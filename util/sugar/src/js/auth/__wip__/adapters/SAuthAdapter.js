/**
 * @name                            SAuthAdapter
 * @namespace           node.auth.adapters
 * @type                            Class
 *
 * Base SAuth adapter class that has to be the base of each SAuthAdapters
 *
 * @example         js
 * const SAuthAdapter = require('@coffeekraken/sugar/node/auth/adapters/SAuthAdapter');
 * class MyCoolAdapter extends SAuthAdapter {
 *    construct() {
 *      super();
 *    }
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SAuthAdapter {
  /**
   * @name                          _supportedAuthTypes
   * @type                          Array
   * @private
   *
   * Store the supported auth types by the current auth adapter
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _supportedAuthTypes = [];

  /**
   * @name                          constructor
   * @type                          Function
   *
   * Construct the SAuthAdapter instance
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(authTypes) {
    // store the supported auth types
    this._supportedAuthTypes = authTypes;
  }

  /**
   * @name                          supportedAuthTypes
   * @type                          Array
   *
   * Access the supported auth types for this adapter
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get supportedAuthTypes() {
    return this._supportedAuthTypes;
  }

  /**
   * @name                            ask
   * @type                            Function
   * @async
   *
   * Ask form some auth informations depending on the auth type you want and the supported auth types of the selected adapter
   *
   * @param         {Object}              [settings={}]
   * - type (settings.type) {String}: Specify the auth type you want to ask like "basic", "bearer", "oauth2", etc...
   * - title (null) {String}: Specify the title to display on top of the form
   * - error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
   * - info (null) {String}: An info message to display to the user
   *
   * @example           js
   * const authInfos = await myAuth.ask({
   *    type: 'basic'
   * });
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async ask(settings = {}) {
    // make sure the adapter support the auth type requested
    if (!this[`_${settings.type}`]) {
      throw new Error(
        `You try to ask the user for "${settings.type}" auth informations but this auth type is not supported by the current adapter...`
      );
    }

    // get the auth info using the adapter
    const infos = await this[`_${settings.type}`](settings);
    return infos;
  }
};
