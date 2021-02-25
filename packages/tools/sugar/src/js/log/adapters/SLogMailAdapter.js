// @ts-nocheck
// @shared
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '../../object/deepMerge';
import __isNode from '../../is/node';
import Email from './vendors/smtp.js';
import __mailHtmlPreset from '../htmlPresets/mail';
/**
 * @name                    SLogMailAdapter
 * @namespace           sugar.js.log
 * @type                    Class
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
export default class SLogMailAdapter {
    /**
     * @name          constructor
     * @type          Function
     *
     * Constructor
     *
     * @param         {Object}        [settings={}]           The settings object to configure your SLogMailAdapter instance. Here's the settings available:
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
    constructor(settings = {}) {
        /**
         * @name          _settings
         * @type          Object
         * @private
         *
         * Store this instance settings
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        // extend settings
        this._settings = __deepMerge({
            subject: '[level] sugar.js.log',
            body: '[content]',
            metas: {}
        }, settings);
    }
    /**
     * @name            log
     * @type            Function
     * @async
     *
     * This is the main method of the logger. It actually log the message passed as parameter to the console
     *
     * @param         {Mixed}          message            The message to log
     * @param         {String}         level              The log level. Can be "log", "info", "error", "debug" or "warn"
     * @return        {Promise}                           A promise that will be resolved once the message has been logged correctly
     *
     * @example         js
     * await consoleAdapter.log('hello world');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    log(message, level) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
                let imageData = null;
                if (!__isNode) {
                    const canvas = yield html2canvas(document.body);
                    imageData = canvas.toDataURL('image/jpeg');
                }
                const list = [];
                Object.keys(this._settings.metas).forEach((metaName) => {
                    list.push(`<li><strong>${metaName}</strong>: ${this._settings.metas[metaName]}</li>`);
                });
                const body = __mailHtmlPreset(this._settings.body.replace('[content]', `
        ${message}
        <br /><br />
        ${list.join('<br />')}
      `));
                const subject = this._settings.subject.replace('[level]', level);
                const keys = Object.keys(this._settings);
                const newobj = {};
                keys.forEach((key) => {
                    if (['host', 'username', 'password', 'to', 'from', 'securetoken'].indexOf(key.toLowerCase()) === -1)
                        return;
                    newobj[key.charAt(0).toUpperCase() + key.slice(1)] = this._settings[key];
                });
                try {
                    const _set = Object.assign({ Body: body, Subject: subject }, newobj);
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
                }
                catch (e) {
                    console.error(e);
                }
            }));
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ01haWxBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7O0FBRVYsT0FBTyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQ3RDLE9BQU8sZ0JBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWU7SUFZbEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUE5QnpCOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQXNCYixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQzFCO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsRUFBRTtTQUNWLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0csR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLOztZQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLE1BQU0sTUFBTSxHQUFHLE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEQsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzVDO2dCQUVELE1BQU0sSUFB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