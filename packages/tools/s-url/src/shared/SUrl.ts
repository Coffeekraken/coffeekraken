// @ts-nocheck

import __urlParse from 'url-parse';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __parseString from '@coffeekraken/sugar/shared/string/parse';
import __parseSchema from '@coffeekraken/sugar/shared/url/parseSchema';
import __SClass from '@coffeekraken/s-class';

/**
 * @name            SUrl
 * @namespace           sugar.js.url
 * @type            Class
 * @extends       SClass
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

export interface ISUrlCtorSettings {
  url: Partial<ISUrlSettings>;
}
export interface ISUrlSettings {}

export default class SUrl extends __SClass {
  /**
   * @name              _originUrl
   * @type              String
   * @private
   *
   * The origin URL
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  _originUrl = null;

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
  _parsedSchema = {
    errors: null,
    params: null,
    match: true
  };

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
  constructor(
    url: string = window.document.location.href,
    settings?: Partial<ISUrlCtorSettings>
  ) {
    // save the settings
    super(
      __deepMerge(
        {
          url: {
            schema: null
          }
        },
        settings ?? {}
      )
    );
    // save the url
    this._originUrl = url;
    // parse the passed url using the url-parse npm module
    this._parsedUrl = __urlParse(url, true);
    this._parsedUrlString = __urlParse(url, false);
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
      this._parsedSchema = __parseSchema(this.href, this._settings.schema);
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
