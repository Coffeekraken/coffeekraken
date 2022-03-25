import __urlParse from "url-parse";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __parseSchema from "@coffeekraken/sugar/shared/url/parseSchema";
import __SClass from "@coffeekraken/s-class";
class SUrl extends __SClass {
  constructor(url = window.document.location.href, settings) {
    super(__deepMerge({
      url: {
        schema: null
      }
    }, settings != null ? settings : {}));
    this._originUrl = null;
    this._parsedSchema = {
      errors: null,
      params: null,
      match: true
    };
    this._originUrl = url;
    this._parsedUrl = __urlParse(url, true);
    this._parsedUrlString = __urlParse(url, false);
    this._parseSchema();
  }
  _parseSchema() {
    if (this._settings.schema) {
      this._parsedSchema = __parseSchema(this.href, this._settings.schema);
    }
  }
  get schema() {
    return this._parsedSchema;
  }
  set protocol(value) {
    this._parsedUrl.set("protocol", value);
  }
  get protocol() {
    return this._parsedUrl.protocol;
  }
  set slashes(value) {
    this._parsedUrl.set("slashes", value);
  }
  get slashes() {
    return this._parsedUrl.slashes;
  }
  set auth(value) {
    this._parsedUrl.set("auth", value);
  }
  get auth() {
    return this._parsedUrl.auth;
  }
  set username(value) {
    this._parsedUrl.set("username", value);
  }
  get username() {
    return this._parsedUrl.username;
  }
  set password(value) {
    this._parsedUrl.set("password", value);
  }
  get password() {
    return this._parsedUrl.password;
  }
  set host(value) {
    this._parsedUrl.set("host", value);
  }
  get host() {
    return this._parsedUrl.host;
  }
  set hostname(value) {
    this._parsedUrl.set("hostname", value);
  }
  get hostname() {
    return this._parsedUrl.hostname;
  }
  set port(value) {
    this._parsedUrl.set("port", value);
  }
  get port() {
    return parseInt(this._parsedUrl.port);
  }
  set pathname(value) {
    this._parsedUrl.set("pathname", value);
    this._parseSchema();
  }
  get pathname() {
    return this._parsedUrl.pathname;
  }
  set pathnameArray(value) {
    this._parsedUrl.set("pathname", value.join("/"));
    this._parseSchema();
  }
  get pathnameArray() {
    return this._parsedUrl.pathname.split("/");
  }
  set query(value) {
    this._parsedUrl.set("query", value);
  }
  get query() {
    return this._parsedUrl.query;
  }
  set queryString(value) {
    this._parsedUrlString.set("query", value);
  }
  get queryString() {
    return this._parsedUrlString.query;
  }
  set hash(value) {
    this._parsedUrl.set("hash", value);
  }
  get hash() {
    return this._parsedUrl.hash;
  }
  set href(value) {
    this._parsedUrl.set("href", value);
    this._parseSchema();
  }
  get href() {
    return this._parsedUrl.href;
  }
  set origin(value) {
    this._parsedUrl.set("origin", value);
  }
  get origin() {
    return this._parsedUrl.origin;
  }
  toString() {
    return this._parsedUrl.toString();
  }
}
export {
  SUrl as default
};
