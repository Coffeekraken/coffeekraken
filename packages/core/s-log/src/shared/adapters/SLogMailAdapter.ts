// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __isNode from '../../is/node';
import Email from './vendors/smtp.js';
import __SLogAdapter from './SLogAdapter';

/**
 * @name                    SLogMailAdapter
 * @namespace           shared.adapters
 * @type                    Class
 * @extends               SLogAdapter
 * @status              wip
 *
 * This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
 * "mail", "slack", etc...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import SLog from '@coffeekraken/sugar/js/log/SLog';
 * import SLogMailAdapter from '@coffeekraken/sugar/js/log/adapters/SLogMailAdapter';
 * const logger = new SLog({
 *    adapters: {
 *      mail: new SLogMailAdapter()
 *    }
 * });
 * logger.log('Something cool happend...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISLogMailAdapterCtorSettings {
  logMailAdapter: Partial<ISLogMailAdapterSettings>;
}
export interface ISLogMailAdapterSettings {}

export default class SLogMailAdapter extends __SLogAdapter {
  /**
   * @name      logMailAdapterSettings
   * @type      ISLogMailAdapterSettings
   * @get
   *
   * Access the logMail adapter settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get logMailAdapterSettings(): ISLogMailAdapterSettings {
    return (<any>this)._settings.logMailAdapter;
  }

  /**
   * @name          constructor
   * @type          Function
   *
   * Constructor
   *
   * @param         {Object}        [settings={}]           The settings object to configure your SLogMailAdapter instance. Here's the settings available:
   * - host (null) {String}: Your smtp server hostname
   * - username (null) {String}: Your smtp username if needed
   * - password (null) {String}: Your smtp password if needed
   * - secureToken (null) {String}: An SmtpJS secure token to avoid delivering your password online
   * - to (null) {String}: The email address where you want to send the logs
   * - from (null) {String}: The email address from which you want to send the logs
   * - subject ('[level] sugar.js.log') {String}: The mail title. You can use the [level] placeholder to be replaced with the actual log level
   * - body ('[content]') {String}: The mail body. You can use the [content] placeholder to be replaced with the actual log
   * - metas ({}) {Object}: An object that will be transformed into a list and place inside the mail [content]
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings?: Partial<ISLogMailAdapterCtorSettings>) {
    // extend settings
    super(
      __deepMerge(
        {
          logMailAdapter: {
            subject: '[level] sugar.js.log',
            body: '[content]',
            metas: {}
          }
        },
        settings ?? {}
      )
    );
  }

  /**
   * @name            log
   * @type            Function
   * @async
   *
   * This is the main method of the logger. It actually log the message passed as parameter to the console
   *
   * @param         {Mixed}          message            The message to log
   * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
   * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
   *
   * @example         js
   * await consoleAdapter.log('hello world');
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async log(message, level) {
    return new Promise(async ({ resolve, reject }) => {
      let imageData = null;
      if (!__isNode) {
        const canvas = await html2canvas(document.body);
        imageData = canvas.toDataURL('image/jpeg');
      }

      const list = [];
      Object.keys(this.logMailAdapterSettings.metas).forEach((metaName) => {
        list.push(
          `<li><strong>${metaName}</strong>: ${this.logMailAdapterSettings.metas[metaName]}</li>`
        );
      });

      const body = this.logMailAdapterSettings.body.replace(
        '[content]',
        `
        ${message}
        <br /><br />
        ${list.join('<br />')}
      `
      );
      const subject = this.logMailAdapterSettings.subject.replace(
        '[level]',
        level
      );

      const keys = Object.keys(this._settings);
      const newobj = {};
      keys.forEach((key) => {
        if (
          ['host', 'username', 'password', 'to', 'from', 'securetoken'].indexOf(
            key.toLowerCase()
          ) === -1
        )
          return;
        newobj[key.charAt(0).toUpperCase() + key.slice(1)] = this._settings[
          key
        ];
      });

      try {
        const _set = {
          Body: body,
          Subject: subject,
          ...newobj
        };
        if (imageData) {
          _set['Attachments'] = [
            {
              name: `screenshot.jpg`,
              data: imageData
            }
          ];
        }
        delete _set.metas;

        Email.send(_set)
          .then((message) => {
            resolve(message);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (e) {
        console.error(e);
      }
    });
  }
}
