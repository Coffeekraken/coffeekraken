// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var node_1 = __importDefault(require("../../is/node"));
    var smtp_js_1 = __importDefault(require("./vendors/smtp.js"));
    var mail_1 = __importDefault(require("../htmlPresets/mail"));
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
    var SLogMailAdapter = /** @class */ (function () {
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
        function SLogMailAdapter(settings) {
            if (settings === void 0) { settings = {}; }
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
        SLogMailAdapter.prototype.log = function (message, level) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (_a) {
                            var resolve = _a.resolve, reject = _a.reject;
                            return __awaiter(_this, void 0, void 0, function () {
                                var imageData, canvas, list, body, subject, keys, newobj, _set;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            imageData = null;
                                            if (!!node_1.default) return [3 /*break*/, 2];
                                            return [4 /*yield*/, html2canvas(document.body)];
                                        case 1:
                                            canvas = _b.sent();
                                            imageData = canvas.toDataURL('image/jpeg');
                                            _b.label = 2;
                                        case 2:
                                            list = [];
                                            Object.keys(this._settings.metas).forEach(function (metaName) {
                                                list.push("<li><strong>" + metaName + "</strong>: " + _this._settings.metas[metaName] + "</li>");
                                            });
                                            body = mail_1.default(this._settings.body.replace('[content]', "\n        " + message + "\n        <br /><br />\n        " + list.join('<br />') + "\n      "));
                                            subject = this._settings.subject.replace('[level]', level);
                                            keys = Object.keys(this._settings);
                                            newobj = {};
                                            keys.forEach(function (key) {
                                                if (['host', 'username', 'password', 'to', 'from', 'securetoken'].indexOf(key.toLowerCase()) === -1)
                                                    return;
                                                newobj[key.charAt(0).toUpperCase() + key.slice(1)] = _this._settings[key];
                                            });
                                            try {
                                                _set = __assign({ Body: body, Subject: subject }, newobj);
                                                if (imageData) {
                                                    _set['Attachments'] = [
                                                        {
                                                            name: "screenshot.jpg",
                                                            data: imageData
                                                        }
                                                    ];
                                                }
                                                delete _set.metas;
                                                smtp_js_1.default.send(_set)
                                                    .then(function (message) {
                                                    resolve(message);
                                                })
                                                    .catch(function (error) {
                                                    reject(error);
                                                });
                                            }
                                            catch (e) {
                                                console.error(e);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                });
            });
        };
        return SLogMailAdapter;
    }());
    exports.default = SLogMailAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ01haWxBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHFFQUFpRDtJQUNqRCx1REFBcUM7SUFDckMsOERBQXNDO0lBQ3RDLDZEQUFtRDtJQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNIO1FBWUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWtCRztRQUNILHlCQUFZLFFBQWE7WUFBYix5QkFBQSxFQUFBLGFBQWE7WUE5QnpCOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQXNCYixrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEVBQUU7YUFDVixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0osQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7Ozs7V0FlRztRQUNHLDZCQUFHLEdBQVQsVUFBVSxPQUFPLEVBQUUsS0FBSzs7OztvQkFDdEIsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxFQUFtQjtnQ0FBakIsT0FBTyxhQUFBLEVBQUUsTUFBTSxZQUFBOzs7Ozs7OzRDQUNyQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2lEQUNqQixDQUFDLGNBQVEsRUFBVCx3QkFBUzs0Q0FDSSxxQkFBTSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFBOzs0Q0FBekMsTUFBTSxHQUFHLFNBQWdDOzRDQUMvQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7OzRDQUd2QyxJQUFJLEdBQUcsRUFBRSxDQUFDOzRDQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtnREFDakQsSUFBSSxDQUFDLElBQUksQ0FDUCxpQkFBZSxRQUFRLG1CQUFjLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFPLENBQzNFLENBQUM7NENBQ0osQ0FBQyxDQUFDLENBQUM7NENBRUcsSUFBSSxHQUFHLGNBQWdCLENBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FDekIsV0FBVyxFQUNYLGVBQ0EsT0FBTyx3Q0FFUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUN0QixDQUNFLENBQ0YsQ0FBQzs0Q0FDSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzs0Q0FFM0QsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRDQUNuQyxNQUFNLEdBQUcsRUFBRSxDQUFDOzRDQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztnREFDZixJQUNFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQ25FLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FDbEIsS0FBSyxDQUFDLENBQUM7b0RBRVIsT0FBTztnREFDVCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FDakUsR0FBRyxDQUNKLENBQUM7NENBQ0osQ0FBQyxDQUFDLENBQUM7NENBRUgsSUFBSTtnREFDSSxJQUFJLGNBQ1IsSUFBSSxFQUFFLElBQUksRUFDVixPQUFPLEVBQUUsT0FBTyxJQUNiLE1BQU0sQ0FDVixDQUFDO2dEQUNGLElBQUksU0FBUyxFQUFFO29EQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRzt3REFDcEI7NERBQ0UsSUFBSSxFQUFFLGdCQUFnQjs0REFDdEIsSUFBSSxFQUFFLFNBQVM7eURBQ2hCO3FEQUNGLENBQUM7aURBQ0g7Z0RBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO2dEQUVsQixpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7cURBQ2IsSUFBSSxDQUFDLFVBQUMsT0FBTztvREFDWixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0RBQ25CLENBQUMsQ0FBQztxREFDRCxLQUFLLENBQUMsVUFBQyxLQUFLO29EQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnREFDaEIsQ0FBQyxDQUFDLENBQUM7NkNBQ047NENBQUMsT0FBTyxDQUFDLEVBQUU7Z0RBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs2Q0FDbEI7Ozs7O3lCQUNGLENBQUMsRUFBQzs7O1NBQ0o7UUFDSCxzQkFBQztJQUFELENBQUMsQUFoSUQsSUFnSUMifQ==