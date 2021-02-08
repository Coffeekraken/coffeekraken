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
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var node_1 = __importDefault(require("../../is/node"));
    var smtp_js_1 = __importDefault(require("./vendors/smtp.js"));
    var mail_1 = __importDefault(require("../htmlPresets/mail"));
    return /** @class */ (function () {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ01haWxBZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0xvZ01haWxBZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYscUVBQWlEO0lBQ2pELHVEQUFxQztJQUNyQyw4REFBc0M7SUFDdEMsNkRBQW1EO0lBNEJuRDtRQVlFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FrQkc7UUFDSCx5QkFBWSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBOUJ6Qjs7Ozs7Ozs7ZUFRRztZQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7WUFzQmIsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7Z0JBQ0UsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxFQUFFO2FBQ1YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNKLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7O1dBZUc7UUFDRyw2QkFBRyxHQUFULFVBQVUsT0FBTyxFQUFFLEtBQUs7Ozs7b0JBQ3RCLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQU8sRUFBbUI7Z0NBQWpCLE9BQU8sYUFBQSxFQUFFLE1BQU0sWUFBQTs7Ozs7Ozs0Q0FDckMsU0FBUyxHQUFHLElBQUksQ0FBQztpREFDakIsQ0FBQyxjQUFRLEVBQVQsd0JBQVM7NENBQ0kscUJBQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQTs7NENBQXpDLE1BQU0sR0FBRyxTQUFnQzs0Q0FDL0MsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs0Q0FHdkMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0Q0FDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7Z0RBQ2pELElBQUksQ0FBQyxJQUFJLENBQ1AsaUJBQWUsUUFBUSxtQkFBYyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBTyxDQUMzRSxDQUFDOzRDQUNKLENBQUMsQ0FBQyxDQUFDOzRDQUVHLElBQUksR0FBRyxjQUFnQixDQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQ3pCLFdBQVcsRUFDWCxlQUNBLE9BQU8sd0NBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFDdEIsQ0FDRSxDQUNGLENBQUM7NENBQ0ksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7NENBRTNELElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs0Q0FDbkMsTUFBTSxHQUFHLEVBQUUsQ0FBQzs0Q0FDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0RBQ2YsSUFDRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUNuRSxHQUFHLENBQUMsV0FBVyxFQUFFLENBQ2xCLEtBQUssQ0FBQyxDQUFDO29EQUVSLE9BQU87Z0RBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQ2pFLEdBQUcsQ0FDSixDQUFDOzRDQUNKLENBQUMsQ0FBQyxDQUFDOzRDQUVILElBQUk7Z0RBQ0ksSUFBSSxjQUNSLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUFFLE9BQU8sSUFDYixNQUFNLENBQ1YsQ0FBQztnREFDRixJQUFJLFNBQVMsRUFBRTtvREFDYixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUc7d0RBQ3BCOzREQUNFLElBQUksRUFBRSxnQkFBZ0I7NERBQ3RCLElBQUksRUFBRSxTQUFTO3lEQUNoQjtxREFDRixDQUFDO2lEQUNIO2dEQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztnREFFbEIsaUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3FEQUNiLElBQUksQ0FBQyxVQUFDLE9BQU87b0RBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dEQUNuQixDQUFDLENBQUM7cURBQ0QsS0FBSyxDQUFDLFVBQUMsS0FBSztvREFDWCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0RBQ2hCLENBQUMsQ0FBQyxDQUFDOzZDQUNOOzRDQUFDLE9BQU8sQ0FBQyxFQUFFO2dEQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NkNBQ2xCOzs7Ozt5QkFDRixDQUFDLEVBQUM7OztTQUNKO1FBQ0gsc0JBQUM7SUFBRCxDQUFDLEFBaElRLElBZ0lQIn0=