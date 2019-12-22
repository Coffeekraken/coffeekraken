import __urlParse from 'url-parse';

/**
 * @name            SUrl
 * @namespace       sugar.js.class
 * @type            Class
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
 *
 * This class use internally the `url-parse` npm module that you can find here: https://www.npmjs.com/package/url-parse
 *
 * @example     js
 * import SUrl from '@coffeekraken/js/class/SUrl';
 * const url = new SUrl('https://github.com/foo/bar');
 * console.log(url.hostname); // => github.com
 * url.hostname = 'youtube.com';
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SUrl {

  /**
   * The origin URL
   * @type      String
   */
  _originUrl = null;

  /**
   * @constructor
   * @param       {String}        [url=window.document.location.href]           The url to parse. If not passed, would take the current browser url as source
   *
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(url = window.document.location.href) {
    // save the url
    this._originUrl = url;
    // parse the passed url using the url-parse npm module
    this._parsedUrl = __urlParse(url, true);
    this._parsedUrlString = __urlParse(url, false);
  }

  /**
   * The protocol
   * @type      String
   */
  set protocol(value) {
    this._parsedUrl.set('protocol', value);
  }
  get protocol() {
    return this._parsedUrl.protocol;
  }

  /**
   * A boolean which indicates whether the protocol is followed by two forward slashes (//).
   * @type      Boolean
   */
  set slashes(value) {
     this._parsedUrl.set('slashes', value);
  }
  get slashes() {
     return this._parsedUrl.slashes;
  }

  /**
   * Authentication information portion (e.g. username:password).
   * @type      String
   */
  set auth(value) {
     this._parsedUrl.set('auth', value);
  }
  get auth() {
     return this._parsedUrl.auth;
  }

  /**
   * Username of basic authentication
   * @type      string
   */
  set username(value) {
     this._parsedUrl.set('username', value);
  }
  get username() {
     return this._parsedUrl.username;
  }

  /**
   * Password of basic authentication
   * @type      String
   */
  set password(value) {
     this._parsedUrl.set('password', value);
  }
  get password() {
     return this._parsedUrl.password;
  }

  /**
   * Host name with port number
   * @type      String
   */
  set host(value) {
     this._parsedUrl.set('host', value);
  }
  get host() {
     return this._parsedUrl.host;
  }

  /**
   * Host name without port number
   * @type      String
   */
  set hostname(value) {
     this._parsedUrl.set('hostname', value);
  }
  get hostname() {
     return this._parsedUrl.hostname;
  }

  /**
   * Optional port number
   * @type      Number
   */
  set port(value) {
     this._parsedUrl.set('port', value);
  }
  get port() {
     return this._parsedUrl.port;
  }

  /**
   * URL path
   * @type      String
   */
  set pathname(value) {
     this._parsedUrl.set('pathname', value);
  }
  get pathname() {
     return this._parsedUrl.pathname;
  }

  /**
   * URL path in array format
   * @type        Array
   */
  set pathnameArray(value) {
    this._parsedUrl.set('pathname', value.join('/'));
  }
  get pathnameArray() {
    return this._parsedUrl.pathname.split('/');
  }

  /**
   * Parsed object containing query string
   * @type        Object
   */
  set query(value) {
     this._parsedUrl.set('query', value);
  }
  get query() {
     return this._parsedUrl.query;
  }

  /**
   * Origin query string from the URL
   * @type      String
   */
  set queryString(value) {
    this._parsedUrlString.set('query', value);
  }
  get queryString() {
    return this._parsedUrlString.query;
  }

  /**
   * The "fragment" portion of the URL including the pound-sign (#)
   * @type      String
   */
  set hash(value) {
     this._parsedUrl.set('hash', value);
  }
  get hash() {
     return this._parsedUrl.hash;
  }

  /**
   * The full URL
   * @type      String
   */
  set href(value) {
     this._parsedUrl.set('href', value);
  }
  get href() {
     return this._parsedUrl.href;
  }

  /**
   * The origin of the URL
   * @type      String
   */
  set origin(value) {
     this._parsedUrl.set('origin', value);
  }
  get origin() {
     return this._parsedUrl.origin;
  }

  /**
   * @name      toString
   * @namespace       sugar.js.class
   * @type        Function
   *
   * Return the full URL in string format
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

export default SUrl;
