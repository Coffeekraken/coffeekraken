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
var handleError_exports = {};
__export(handleError_exports, {
  default: () => handleError_default
});
module.exports = __toCommonJS(handleError_exports);
var import_parseHtml = __toESM(require("../../shared/console/parseHtml"));
var import_childProcess = __toESM(require("../../node/is/childProcess"));
var import_toString = __toESM(require("../../shared/string/toString"));
function handleError() {
  if (process.env.NODE_ENV === "test")
    return;
  if ((0, import_childProcess.default)()) {
    process.on("uncaughtException", __handleChildProcessErrors);
    process.on("unhandledRejection", __handleChildProcessErrors);
  } else {
    process.on("uncaughtException", __handleMainProcessErrors);
    process.on("unhandledRejection", __handleMainProcessErrors);
  }
}
function __handleChildProcessErrors(error) {
  if (error.toString().includes(`Cannot read property 'itop' of null`))
    return;
  if (error.instanceId)
    return;
  if (!error)
    return;
  const errorStringArray = [error.stack];
  console.log((0, import_parseHtml.default)(errorStringArray.join("\n")));
}
function __handleMainProcessErrors(error) {
  if (error.toString().includes(`Cannot read property 'itop' of null`))
    return;
  if (error.instanceId)
    return;
  if (error instanceof Buffer) {
    error = error.toString();
  }
  setTimeout(() => {
    if (typeof error === "string") {
      console.log((0, import_parseHtml.default)(error));
    } else if (typeof error === "object" && error.name && error.message) {
      console.log((0, import_parseHtml.default)([error.name, error.message, error.stack].join("\n\n")));
    } else {
      console.log((0, import_parseHtml.default)((0, import_toString.default)(error)));
    }
    process.exit(1);
  }, 50);
}
var handleError_default = handleError;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
