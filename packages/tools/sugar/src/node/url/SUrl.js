"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_parse_1 = __importDefault(require("url-parse"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parseSchema_1 = __importDefault(require("./parseSchema"));
/**
 * @name            SUrl
 * @namespace           sugar.js.url
 * @type            Class
 * @status              wip
 *
 * Simple class that is useful to parse a URL (or the current browser URL) and gives you back
 * an instance that has all these values availables as well as functions to modify the instancied URL:
 * - protocol: The protocol scheme of the URL (e.g. http:).
 * - slashes: A boolean which indicates whether the protocol is followed by two forward slashes (//).
 * - auth: Authentication information portion (e.g. username:password).
 * - username: Username of basic authentication.
 * - password: Password of basic authentication.
 * - host: Host name with port number.
 * - hostname: Host name without port number.
 * - port: Optional port number.
 * - pathname: URL path.
 * - query: Parsed object containing query string
 * - queryString: Origin query string from the URL
 * - hash: The "fragment" portion of the URL including the pound-sign (#).
 * - href: The full URL.
 * - origin: The origin of the URL.
 * - schema: The schema property gives you access to an object containing these properties (only if you have provided the settings.schema setting):
 *    - match (true) {Boolean}: Tells you if your current url match the passed schema
 *    - errors (null) {Object}: Gives you access to which param(s) is/are in error
 *    - params (null) {Object}: Gives you access to each params specified in the schema with their values, etc...
 *
 * This class use internally the `url-parse` npm module that you can find here: https://www.npmjs.com/package/url-parse
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import SUrl from '@coffeekraken/js/url/SUrl';
 * const url = new SUrl('https://github.com/foo/bar');
 * console.log(url.hostname); // => github.com
 * url.hostname = 'youtube.com';
 *
 * const urlWithSchema = new SUrl('https://github.com/hello/world/2', {
 *    schema: '{param1:string}/{param2}/{?param3:number}'
 * });
 * console.log(urlWithSchema.schema);
 * // {
 * //    match: true,
 * //    errors: {},
 * // }
 *
 *
 * @see        https://www.npmjs.com/package/url-parse
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SUrl {
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
    constructor(url = window.document.location.href, settings = {}) {
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
    _parseSchema() {
        if (this._settings.schema) {
            this._parsedSchema = parseSchema_1.default(this.href, this._settings.schema);
        }
    }
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
    get schema() {
        return this._parsedSchema;
    }
    /**
     * @name                          protocol
     * @type                          String
     *
     * Get/set the protocol
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set protocol(value) {
        this._parsedUrl.set('protocol', value);
    }
    get protocol() {
        return this._parsedUrl.protocol;
    }
    /**
     * @name           slashes
     * @type           Boolean
     *
     * A boolean which indicates whether the protocol is followed by two forward slashes (//).
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set slashes(value) {
        this._parsedUrl.set('slashes', value);
    }
    get slashes() {
        return this._parsedUrl.slashes;
    }
    /**
     * @name                 auth
     * @type                 String
     *
     * Authentication information portion (e.g. username:password).
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set auth(value) {
        this._parsedUrl.set('auth', value);
    }
    get auth() {
        return this._parsedUrl.auth;
    }
    /**
     * @name              username
     * @type              String
     *
     * Get/set username of basic authentication
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set username(value) {
        this._parsedUrl.set('username', value);
    }
    get username() {
        return this._parsedUrl.username;
    }
    /**
     * @name              password
     * @type              String
     *
     * Get/set password of basic authentication
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set password(value) {
        this._parsedUrl.set('password', value);
    }
    get password() {
        return this._parsedUrl.password;
    }
    /**
     * @name        host
     * @type        String
     *
     * Get/set Host name with port number
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set host(value) {
        this._parsedUrl.set('host', value);
    }
    get host() {
        return this._parsedUrl.host;
    }
    /**
     * @name        hostname
     * @type        String
     *
     * Get/set host name without port number
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set hostname(value) {
        this._parsedUrl.set('hostname', value);
    }
    get hostname() {
        return this._parsedUrl.hostname;
    }
    /**
     * @name           port
     * @type           Number
     *
     * Optional port number
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set port(value) {
        this._parsedUrl.set('port', value);
    }
    get port() {
        return parseInt(this._parsedUrl.port);
    }
    /**
     * @name        pathname
     * @type        String
     *
     * URL path
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set pathname(value) {
        this._parsedUrl.set('pathname', value);
        this._parseSchema();
    }
    get pathname() {
        return this._parsedUrl.pathname;
    }
    /**
     * @name        pathnameArray
     * @type        Array
     *
     * URL path in array format
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set pathnameArray(value) {
        this._parsedUrl.set('pathname', value.join('/'));
        this._parseSchema();
    }
    get pathnameArray() {
        return this._parsedUrl.pathname.split('/');
    }
    /**
     * @name           query
     * @type           String
     *
     * Parsed object containing query string
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set query(value) {
        this._parsedUrl.set('query', value);
    }
    get query() {
        return this._parsedUrl.query;
    }
    /**
     * @name           queryString
     * @type           String
     *
     * Origin query string from the URL
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set queryString(value) {
        this._parsedUrlString.set('query', value);
    }
    get queryString() {
        return this._parsedUrlString.query;
    }
    /**
     * @name        hash
     * @type        String
     *
     * The "fragment" portion of the URL including the pound-sign (#)
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set hash(value) {
        this._parsedUrl.set('hash', value);
    }
    get hash() {
        return this._parsedUrl.hash;
    }
    /**
     * @name           href
     * @type           String
     *
     * The full URL
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set href(value) {
        this._parsedUrl.set('href', value);
        this._parseSchema();
    }
    get href() {
        return this._parsedUrl.href;
    }
    /**
     * @name        origin
     * @type        String
     *
     * The origin of the URL
     *
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    set origin(value) {
        this._parsedUrl.set('origin', value);
    }
    get origin() {
        return this._parsedUrl.origin;
    }
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
    toString() {
        return this._parsedUrl.toString();
    }
}
exports.default = SUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1VybC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNVcmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLDBEQUFtQztBQUNuQyxvRUFBOEM7QUFFOUMsZ0VBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0RHO0FBQ0gsTUFBcUIsSUFBSTtJQTBDdkI7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFyRDlEOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7OztXQVFHO1FBQ0gsZUFBVSxHQUFHLElBQUksQ0FBQztRQUVsQjs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxrQkFBYSxHQUFHO1lBQ2QsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQztRQWVBLGVBQWU7UUFDZixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN0QixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtZQUNFLE1BQU0sRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxtQkFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxZQUFZO1FBQ1YsSUFB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