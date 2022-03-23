var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SUrl_exports = {};
__export(SUrl_exports, {
  default: () => SUrl
});
module.exports = __toCommonJS(SUrl_exports);
var import_url_parse = __toESM(require("url-parse"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_parseSchema = __toESM(require("@coffeekraken/sugar/shared/url/parseSchema"), 1);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
class SUrl extends import_s_class.default {
  constructor(url = window.document.location.href, settings) {
    super((0, import_deepMerge.default)({
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
    this._parsedUrl = (0, import_url_parse.default)(url, true);
    this._parsedUrlString = (0, import_url_parse.default)(url, false);
    this._parseSchema();
  }
  _parseSchema() {
    if (this._settings.schema) {
      this._parsedSchema = (0, import_parseSchema.default)(this.href, this._settings.schema);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
