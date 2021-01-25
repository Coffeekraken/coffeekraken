"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const node_1 = __importDefault(require("../../is/node"));
const smtp_js_1 = __importDefault(require("./vendors/smtp.js"));
const mail_1 = __importDefault(require("../htmlPresets/mail"));
module.exports = class SLogMailAdapter {
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
        this._settings = deepMerge_1.default({
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
                if (!node_1.default) {
                    const canvas = yield html2canvas(document.body);
                    imageData = canvas.toDataURL('image/jpeg');
                }
                const list = [];
                Object.keys(this._settings.metas).forEach((metaName) => {
                    list.push(`<li><strong>${metaName}</strong>: ${this._settings.metas[metaName]}</li>`);
                });
                const body = mail_1.default(this._settings.body.replace('[content]', `
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
                    smtp_js_1.default.send(_set)
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ01haWxBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7OztBQUVWLHVFQUFpRDtBQUNqRCx5REFBcUM7QUFDckMsZ0VBQXNDO0FBQ3RDLCtEQUFtRDtBQTRCbkQsaUJBQVMsTUFBTSxlQUFlO0lBWTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBOUJ6Qjs7Ozs7Ozs7V0FRRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFzQmIsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLElBQUksRUFBRSxXQUFXO1lBQ2pCLEtBQUssRUFBRSxFQUFFO1NBQ1YsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUs7O1lBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO2dCQUMvQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxjQUFRLEVBQUU7b0JBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNoRCxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDNUM7Z0JBRUQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQ1AsZUFBZSxRQUFRLGNBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDM0UsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQztnQkFFSCxNQUFNLElBQUksR0FBRyxjQUFnQixDQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ3pCLFdBQVcsRUFDWDtVQUNBLE9BQU87O1VBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7T0FDdEIsQ0FDRSxDQUNGLENBQUM7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFakUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNuQixJQUNFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQ25FLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FDbEIsS0FBSyxDQUFDLENBQUM7d0JBRVIsT0FBTztvQkFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FDakUsR0FBRyxDQUNKLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSTtvQkFDRixNQUFNLElBQUksbUJBQ1IsSUFBSSxFQUFFLElBQUksRUFDVixPQUFPLEVBQUUsT0FBTyxJQUNiLE1BQU0sQ0FDVixDQUFDO29CQUNGLElBQUksU0FBUyxFQUFFO3dCQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRzs0QkFDcEI7Z0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtnQ0FDdEIsSUFBSSxFQUFFLFNBQVM7NkJBQ2hCO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUVsQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ2IsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQ2hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEIsQ0FBQyxDQUFDLENBQUM7aUJBQ047Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbEI7WUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0YsQ0FBQyJ9