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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ01haWxBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVix1RUFBaUQ7SUFDakQseURBQXFDO0lBQ3JDLGdFQUFzQztJQUN0QywrREFBbUQ7SUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxNQUFxQixlQUFlO1FBWWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FrQkc7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBOUJ6Qjs7Ozs7Ozs7ZUFRRztZQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7WUFzQmIsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7Z0JBQ0UsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxFQUFFO2FBQ1YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDRyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUs7O2dCQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtvQkFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNyQixJQUFJLENBQUMsY0FBUSxFQUFFO3dCQUNiLE1BQU0sTUFBTSxHQUFHLE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDaEQsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQzVDO29CQUVELE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUNyRCxJQUFJLENBQUMsSUFBSSxDQUNQLGVBQWUsUUFBUSxjQUFjLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQzNFLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7b0JBRUgsTUFBTSxJQUFJLEdBQUcsY0FBZ0IsQ0FDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUN6QixXQUFXLEVBQ1g7VUFDQSxPQUFPOztVQUVQLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO09BQ3RCLENBQ0UsQ0FDRixDQUFDO29CQUNGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBRWpFLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDbkIsSUFDRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUNuRSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQ2xCLEtBQUssQ0FBQyxDQUFDOzRCQUVSLE9BQU87d0JBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQ2pFLEdBQUcsQ0FDSixDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUk7d0JBQ0YsTUFBTSxJQUFJLG1CQUNSLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUFFLE9BQU8sSUFDYixNQUFNLENBQ1YsQ0FBQzt3QkFDRixJQUFJLFNBQVMsRUFBRTs0QkFDYixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUc7Z0NBQ3BCO29DQUNFLElBQUksRUFBRSxnQkFBZ0I7b0NBQ3RCLElBQUksRUFBRSxTQUFTO2lDQUNoQjs2QkFDRixDQUFDO3lCQUNIO3dCQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFFbEIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzZCQUNiLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzRCQUNoQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ25CLENBQUMsQ0FBQzs2QkFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDZixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2hCLENBQUMsQ0FBQyxDQUFDO3FCQUNOO29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2xCO2dCQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDTCxDQUFDO1NBQUE7S0FDRjtJQWhJRCxrQ0FnSUMifQ==