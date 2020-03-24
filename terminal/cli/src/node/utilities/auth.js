const __fs = require("fs");

const __Cryptr = require("cryptr");
const { machineIdSync } = require("node-machine-id");
const __tmpDir = require("@coffeekraken/sugar/node/fs/tmpDir");
const __writeFileSync = require("@coffeekraken/sugar/node/fs/writeFileSync");
const __list = require('@coffeekraken/sugar/node/terminal/list');

const machineId = machineIdSync();
const authFilepath = `${__tmpDir()}/@coffeekraken.cli.${machineId}.json`;
const cryptr = new __Cryptr(machineId);

/**
 * @name                                auth
 * @namespace                           cli.node.utilities
 * @type                                Object
 *
 * Provide some functions usefull to store and get back passwords saved on the local system of the cli user
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class AuthUtilities {
  /**
   * @name                    get
   * @type                    Function
   *
   * Get back an authentification object
   *
   * @param         {String}          name          The name of the auth service you want to get back
   *
   * @example           js
   * const auth = require('cli/node/utilities/auth');
   * auth.get('bitbucket'); // => { password: 'hello', username: 'world' }
   *
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async get(name) {
    let currentAuthObj = {};
    if (__fs.existsSync(authFilepath)) {
      const encryptedString = __fs.readFileSync(authFilepath, "utf8");
      currentAuthObj = JSON.parse(cryptr.decrypt(encryptedString));
    }

    if (!currentAuthObj[name]) {
      return this.ask(name);
    }

    // return the requested auth object
    return currentAuthObj[name];
  }

  /**
   * @name                    set
   * @type                    Function
   *
   * Set an authentification object
   *
   * @param         {String}          name          The name of the auth service you want to get back
   * @param         {Object}          auth          The authentification object you want to save
   *
   * @example           js
   * const auth = require('cli/node/utilities/auth');
   * auth.set('bitbucket', { password: 'hello', username: 'world' });
   *
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async set(name, auth) {
    let currentAuthObj = {};
    if (__fs.existsSync(authFilepath)) {
      const encryptedString = __fs.readFileSync(authFilepath, "utf8");
      currentAuthObj = JSON.parse(cryptr.decrypt(encryptedString));
    }
    // save the new auth
    currentAuthObj[name] = auth;
    // encrypt the auth object
    const encryptedObj = cryptr.encrypt(JSON.parse(currentAuthObj));
    // save the auth file
    __writeFileSync(authFilepath, encryptedObj);

    return true;
  }

  /**
   * @name                    ask
   * @type                    Function
   *
   * Ask for some authentification informations
   *
   * @param         {String}          name          The name of the auth service you want to get back
   * @param         {Array}           fields        An array of fields names that will be asked to the user
   * @return        {Promise}                       A promise that will be resolved with the requested infos in object format
   *
   * @example           js
   * const auth = require('cli/node/utilities/auth');
   * auth.ask('bitbucket', ['password','username']); // => { password: 'hello', username: 'world' }
   *
   * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async ask(name, fields) {
    console.log(__list([
      'hello',
      'world',
      'coco'
    ]));
  }
};

module.exports = new AuthUtilities();