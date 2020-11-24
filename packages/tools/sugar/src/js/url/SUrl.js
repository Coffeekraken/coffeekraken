// @ts-nocheck
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
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
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
            this._settings = deepMerge_2.default({
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
