// @ts-nocheck
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
import __SLogAdapter from './SLogAdapter';
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
    get logMailAdapterSettings() {
        return this._settings.logMailAdapter;
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
    constructor(settings) {
        // extend settings
        super(__deepMerge({
            logMailAdapter: {
                subject: '[level] sugar.js.log',
                body: '[content]',
                metas: {}
            }
        }, settings !== null && settings !== void 0 ? settings : {}));
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
    log(message, level) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
                let imageData = null;
                if (!__isNode) {
                    const canvas = yield html2canvas(document.body);
                    imageData = canvas.toDataURL('image/jpeg');
                }
                const list = [];
                Object.keys(this.logMailAdapterSettings.metas).forEach((metaName) => {
                    list.push(`<li><strong>${metaName}</strong>: ${this.logMailAdapterSettings.metas[metaName]}</li>`);
                });
                const body = this.logMailAdapterSettings.body.replace('[content]', `
        ${message}
        <br /><br />
        ${list.join('<br />')}
      `);
                const subject = this.logMailAdapterSettings.subject.replace('[level]', level);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ01haWxBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFdBQVcsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxLQUFLLE1BQU0sbUJBQW1CLENBQUM7QUFDdEMsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBbUMxQyxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsYUFBYTtJQUN4RDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHNCQUFzQjtRQUN4QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsWUFBWSxRQUFnRDtRQUMxRCxrQkFBa0I7UUFDbEIsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLGNBQWMsRUFBRTtnQkFDZCxPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEVBQUU7YUFDVjtTQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUs7O1lBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUMvQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRCxTQUFTLEdBQUcsTUFBTSxDQUFDLFNB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