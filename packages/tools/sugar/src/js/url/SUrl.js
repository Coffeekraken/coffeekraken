// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "url-parse", "../object/deepMerge", "./parseSchema"], factory);
    }
})(function (require, exports) {
    "use strict";
    var url_parse_1 = __importDefault(require("url-parse"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var parseSchema_1 = __importDefault(require("./parseSchema"));
    return /** @class */ (function () {
        /**
         * @name                    constructor
         * @type                    Function
         *
         * Constructor
         *
         * @param       {String}        [url=window.document.location.href]           The url to parse. If not passed, would take the current browser url as source
         * @param       {Object}        [settings={}]                                 On object of settings to configure your SUrl instance. Here's are the available settings:
         * - schema (null) {String}: Specify a schema to analyze the url and get some info like params back. FOr more info on schema, see the "_parseSchema" method doc...
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        function SUrl(url, settings) {
            if (url === void 0) { url = window.document.location.href; }
            if (settings === void 0) { settings = {}; }
            /**
             * @name                _settings
             * @type                Object
             * @private
             *
             * Store the settings mixed from the default ones and the passed ones
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._settings = {};
            /**
             * @name              _originUrl
             * @type              String
             * @private
             *
             * The origin URL
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._originUrl = null;
            /**
             * @name                   _parsedSchema
             * @type                   Object
             * @private
             *
             * Store the parsed schema if a settings.schema has been provided.
             * This object contain these properties:
             * - params (null) {Object}: Store the path params found like /{client}/{name}
             * - errors (null) {Object}: Store the parsing errors if has some
             * - match (true) {Boolean}: Store if the current url match with the provided schema
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            this._parsedSchema = {
                errors: null,
                params: null,
                match: true
            };
            // save the url
            this._originUrl = url;
            // save the settings
            this._settings = deepMerge_1.default({
                schema: null
            }, settings);
            // parse the passed url using the url-parse npm module
            this._parsedUrl = url_parse_1.default(url, true);
            this._parsedUrlString = url_parse_1.default(url, false);
            // parse the schema if needed
            this._parseSchema();
        }
        /**
         * @name                          _parseSchema
         * @type                          Function
         * @private
         *
         * Parse the url using the schema passed in the settings. A schema is a simple string that describe the pathname structure that the Url can have.
         * Here's some examples:
         * - "{param1}/{param2}/{param3}": This schema describe that your Url must have 3 "values" named param1, param2 and param3
         *    - If my Url is "something.com/hello/world/plop", my schema is respected and I can have access to the values through the "schema.params.param1", "schema.params.param2", etc...
         * - "{hello:string}/{world:number}/{?idx:number}": This schema describe that the Url can have 3 "values" but the last one is optional
         *    - If my Url is "something.com/plop/3/1", my schema is respected
         *    - If my Url is "something.com/plop/2", my schema is respected
         *    - If my Url is "something.com/plop/hello/2", my schema is not respected due to the fact that the param named "world" has to be a number
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SUrl.prototype._parseSchema = function () {
            if (this._settings.schema) {
                this._parsedSchema = parseSchema_1.default(this.href, this._settings.schema);
            }
        };
        Object.defineProperty(SUrl.prototype, "schema", {
            /**
             * @name                            schema
             * @type                            Object
             *
             * Access the schema parsing result if the settings.schema has been provided.
             * This object contain these properties:
             * - params ({}) {Object}: Store the path params found like /{client}/{name}
             * - errors ({}) {Object}: Store the parsing errors if has some
             * - match (true) {Boolean}: Store if the current url match with the provided schema
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            get: function () {
                return this._parsedSchema;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "protocol", {
            get: function () {
                return this._parsedUrl.protocol;
            },
            /**
             * @name                          protocol
             * @type                          String
             *
             * Get/set the protocol
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('protocol', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "slashes", {
            get: function () {
                return this._parsedUrl.slashes;
            },
            /**
             * @name           slashes
             * @type           Boolean
             *
             * A boolean which indicates whether the protocol is followed by two forward slashes (//).
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('slashes', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "auth", {
            get: function () {
                return this._parsedUrl.auth;
            },
            /**
             * @name                 auth
             * @type                 String
             *
             * Authentication information portion (e.g. username:password).
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('auth', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "username", {
            get: function () {
                return this._parsedUrl.username;
            },
            /**
             * @name              username
             * @type              String
             *
             * Get/set username of basic authentication
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('username', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "password", {
            get: function () {
                return this._parsedUrl.password;
            },
            /**
             * @name              password
             * @type              String
             *
             * Get/set password of basic authentication
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('password', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "host", {
            get: function () {
                return this._parsedUrl.host;
            },
            /**
             * @name        host
             * @type        String
             *
             * Get/set Host name with port number
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('host', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "hostname", {
            get: function () {
                return this._parsedUrl.hostname;
            },
            /**
             * @name        hostname
             * @type        String
             *
             * Get/set host name without port number
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('hostname', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "port", {
            get: function () {
                return parseInt(this._parsedUrl.port);
            },
            /**
             * @name           port
             * @type           Number
             *
             * Optional port number
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('port', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "pathname", {
            get: function () {
                return this._parsedUrl.pathname;
            },
            /**
             * @name        pathname
             * @type        String
             *
             * URL path
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('pathname', value);
                this._parseSchema();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "pathnameArray", {
            get: function () {
                return this._parsedUrl.pathname.split('/');
            },
            /**
             * @name        pathnameArray
             * @type        Array
             *
             * URL path in array format
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('pathname', value.join('/'));
                this._parseSchema();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "query", {
            get: function () {
                return this._parsedUrl.query;
            },
            /**
             * @name           query
             * @type           String
             *
             * Parsed object containing query string
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('query', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "queryString", {
            get: function () {
                return this._parsedUrlString.query;
            },
            /**
             * @name           queryString
             * @type           String
             *
             * Origin query string from the URL
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrlString.set('query', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "hash", {
            get: function () {
                return this._parsedUrl.hash;
            },
            /**
             * @name        hash
             * @type        String
             *
             * The "fragment" portion of the URL including the pound-sign (#)
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('hash', value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "href", {
            get: function () {
                return this._parsedUrl.href;
            },
            /**
             * @name           href
             * @type           String
             *
             * The full URL
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('href', value);
                this._parseSchema();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SUrl.prototype, "origin", {
            get: function () {
                return this._parsedUrl.origin;
            },
            /**
             * @name        origin
             * @type        String
             *
             * The origin of the URL
             *
             * @author 		Olivier Bossel<olivier.bossel@gmail.com>
             */
            set: function (value) {
                this._parsedUrl.set('origin', value);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @name      toString
         * @type        Function
         *
         * Return the full URL in string format
         *
         * @return         {String}                   The full string url
         *
         * @example       js
         * console.log(myUrl.toString()); // => https://google.com
         *
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        SUrl.prototype.toString = function () {
            return this._parsedUrl.toString();
        };
        return SUrl;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1VybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNVcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBRVYsd0RBQW1DO0lBQ25DLGtFQUE4QztJQUU5Qyw4REFBMEM7SUF1RDFDO1FBMENFOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsY0FBWSxHQUFtQyxFQUFFLFFBQWE7WUFBbEQsb0JBQUEsRUFBQSxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUk7WUFBRSx5QkFBQSxFQUFBLGFBQWE7WUFyRDlEOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQUVmOzs7Ozs7OztlQVFHO1lBQ0gsZUFBVSxHQUFHLElBQUksQ0FBQztZQUVsQjs7Ozs7Ozs7Ozs7O2VBWUc7WUFDSCxrQkFBYSxHQUFHO2dCQUNkLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxJQUFJO2dCQUNaLEtBQUssRUFBRSxJQUFJO2FBQ1osQ0FBQztZQWVBLGVBQWU7WUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUN0QixvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxNQUFNLEVBQUUsSUFBSTthQUNiLEVBQ0QsUUFBUSxDQUNULENBQUM7WUFDRixzREFBc0Q7WUFDdEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxtQkFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsbUJBQVUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0MsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQ7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsMkJBQVksR0FBWjtZQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFN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