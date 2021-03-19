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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../object/deepMerge", "../../is/node", "./vendors/smtp.js", "../htmlPresets/mail"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    const node_1 = __importDefault(require("../../is/node"));
    const smtp_js_1 = __importDefault(require("./vendors/smtp.js"));
    const mail_1 = __importDefault(require("../htmlPresets/mail"));
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
    class SLogMailAdapter {
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
    }
    exports.default = SLogMailAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ01haWxBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHVFQUFpRDtJQUNqRCx5REFBcUM7SUFDckMsZ0VBQXNDO0lBQ3RDLCtEQUFtRDtJQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILE1BQXFCLGVBQWU7UUFZbEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWtCRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUE5QnpCOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQXNCYixrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEVBQUU7YUFDVixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7Ozs7V0FlRztRQUNHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSzs7Z0JBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO29CQUMvQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxjQUFRLEVBQUU7d0JBQ2IsTUFBTSxNQUFNLEdBQUcsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNoRCxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDNUM7b0JBRUQsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQ1AsZUFBZSxRQUFRLGNBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDM0UsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FBQztvQkFFSCxNQUFNLElBQUksR0FBRyxjQUFnQixDQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ3pCLFdBQVcsRUFDWDtVQUNBLE9BQU87O1VBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7T0FDdEIsQ0FDRSxDQUNGLENBQUM7b0JBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFakUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUNuQixJQUNFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQ25FLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FDbEIsS0FBSyxDQUFDLENBQUM7NEJBRVIsT0FBTzt3QkFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FDakUsR0FBRyxDQUNKLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7b0JBRUgsSUFBSTt3QkFDRixNQUFNLElBQUksbUJBQ1IsSUFBSSxFQUFFLElBQUksRUFDVixPQUFPLEVBQUUsT0FBTyxJQUNiLE1BQU0sQ0FDVixDQUFDO3dCQUNGLElBQUksU0FBUyxFQUFFOzRCQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRztnQ0FDcEI7b0NBQ0UsSUFBSSxFQUFFLGdCQUFnQjtvQ0FDdEIsSUFBSSxFQUFFLFNBQVM7aUNBQ2hCOzZCQUNGLENBQUM7eUJBQ0g7d0JBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUVsQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7NkJBQ2IsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7NEJBQ2hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbkIsQ0FBQyxDQUFDOzZCQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDaEIsQ0FBQyxDQUFDLENBQUM7cUJBQ047b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbEI7Z0JBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUNMLENBQUM7U0FBQTtLQUNGO0lBaElELGtDQWdJQyJ9