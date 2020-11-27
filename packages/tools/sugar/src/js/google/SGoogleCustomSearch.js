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
        define(["require", "exports", "../http/SRequest"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SRequest_1 = __importDefault(require("../http/SRequest"));
    return /** @class */ (function () {
        /**
         * @name                constructor
         * @type                Function
         *
         * Constructor
         *
         * @param 	        {String} 	        apiKey 		          The google api key to reach the services
         * @param 	        {String}        	cx 		            	The google custom search context
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        function SGoogleCustomSearch(apiKey, cx) {
            /**
             * @name              _apiKey
             * @type              String
             * @private
             *
             * Store the api key used to reach the google services
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._apiKey = null;
            /**
             * @name              _cx
             * @type              String
             * @private
             *
             * Store the context key used to reach the good google search instance
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._cx = null;
            /**
             * @name              _settings
             * @type              Object
             * @private
             *
             * Store the actual query object to be able to call
             * next page etc...
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._settings = {
                /**
                 * @name              num
                 * @type              Number
                 * @default           10
                 *
                 * How many results by page wanted
                 * Can be between 1 and 10
                 *
                 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
                 */
                num: 10,
                /**
                 * @name                page
                 * @type                Number
                 * @default             1
                 *
                 * The page to request
                 *
                 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
                 */
                page: 1
            };
            /**
             * @name            _searchUrl
             * @type            String
             * @private
             *
             * Store the google search url
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._searchUrl = 'https://www.googleapis.com/customsearch/v1';
            /**
             * @name              _page
             * @type              Number
             * @private
             *
             * Store the current page
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._page = 1;
            /**
             * @name        _keywords
             * @type        String
             * @private
             *
             * The keywords searched
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._keywords = null;
            // save the props
            this._apiKey = apiKey;
            this._cx = cx;
        }
        /**
         * @name            _generateSearchUrl
         * @type            Function
         * @private
         *
         * Generate and return the correct search url depending on
         * parameters like the current page, etc...
         *
         * @return 	{String} 	The generated url
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SGoogleCustomSearch.prototype._generateSearchUrl = function () {
            // construct url
            var queryString = '';
            for (var key in this._settings) {
                queryString += "&" + key + "=" + this._settings[key];
            }
            queryString = queryString.substr(1);
            queryString = "?" + queryString;
            // process the url
            return this._searchUrl + queryString;
        };
        /**
         * @name              search
         * @type              Function
         * @async
         *
         * Launch a search
         *
         * @param 	      {String} 	          keywords 	            The keywords to search
         * @param       	{Object} 	          settings            	The settings object
         * @return      	{Promise} 		                        		A promise of results
         */
        SGoogleCustomSearch.prototype.search = function (keywords, settings) {
            if (settings === void 0) { settings = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var num, url, ajx;
                return __generator(this, function (_a) {
                    // save the keywords into the instance
                    this._keywords = keywords;
                    // reset the page count
                    this._page = settings.page || 1;
                    num = settings.num || 10;
                    this._settings = __assign({ key: this._apiKey, cx: this._cx, q: keywords, num: num, start: (this._page - 1) * num + 1 }, settings);
                    url = this._generateSearchUrl();
                    ajx = new SRequest_1.default({
                        method: 'GET',
                        url: url
                    });
                    // launch the request end send back the promise
                    return [2 /*return*/, ajx.send()];
                });
            });
        };
        /**
         * @name            next
         * @type            Function
         * @async
         *
         * Load the next page
         *
         * @return 		{Promise} 		The promise of next page results
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SGoogleCustomSearch.prototype.next = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // update the page count
                    return [2 /*return*/, this.search(this._keywords, __assign(__assign({}, this._settings), { page: this._page + 1 }))];
                });
            });
        };
        /**
         * @name            previous
         * @type            Function
         * @async
         *
         * Load the previous page
         *
         * @return 		{Promise} 		The promise of previous page results
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SGoogleCustomSearch.prototype.previous = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // update the page count
                    return [2 /*return*/, this.search(this._keywords, __assign(__assign({}, this._settings), { page: this._page - (this._page <= 1 ? 0 : 1) }))];
                });
            });
        };
        return SGoogleCustomSearch;
    }());
});
