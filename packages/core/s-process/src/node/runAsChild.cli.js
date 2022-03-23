var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_parseArgs = __toESM(require("@coffeekraken/sugar/shared/cli/parseArgs.js"), 1);
var import_s_process = __toESM(require("@coffeekraken/s-process"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
(async () => {
  var _a, _b, _c;
  await import_s_sugar_config.default.load();
  const stringArgs = process.argv.slice(1).map((arg) => {
    if (arg.slice(0, 2) !== "--" && arg.slice(0, 1) !== "-") {
      return `"${arg}"`;
    }
    return arg;
  }).join(" ") || "";
  const args = (0, import_parseArgs.default)(stringArgs);
  delete args[-1];
  if (!args._settings.processPath) {
    throw `Sorry but to use this endpoint you have to specify at least a "--processPath" parameter...`;
  }
  const settings = Object.assign({}, args._settings);
  const processPath = settings.processPath;
  delete settings.processPath;
  delete args["0"];
  delete args._settings;
  const pro = await import_s_process.default.from(processPath, {
    process: __spreadProps(__spreadValues({}, settings), {
      runAsChild: false
    })
  });
  if (pro && pro.run) {
    const proPromise = pro.run(args);
    const res = await proPromise;
    try {
      console.log(JSON.stringify(res.value));
    } catch (e) {
      console.log((_c = (_b = (_a = res.value) == null ? void 0 : _a.toString) == null ? void 0 : _b.call(_a)) != null ? _c : res.value);
    }
    process.exit(0);
  }
})();
