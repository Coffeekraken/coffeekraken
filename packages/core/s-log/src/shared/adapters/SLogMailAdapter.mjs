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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLWxvZy9zcmMvc2hhcmVkL2FkYXB0ZXJzL1NMb2dNYWlsQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBQ3RDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQW1DMUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGFBQWE7SUFDeEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDeEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILFlBQVksUUFBZ0Q7UUFDMUQsa0JBQWtCO1FBQ2xCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxjQUFjLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxFQUFFO2FBQ1Y7U0FDRixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0csR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLOztZQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtnQkFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLE1BQU0sTUFBTSxHQUFH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