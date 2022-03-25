var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var parseSchema_exports = {};
__export(parseSchema_exports, {
  default: () => parseSchema_default
});
module.exports = __toCommonJS(parseSchema_exports);
var import_parse = __toESM(require("../string/parse"));
function parseSchema(url, schema) {
  const rawSchemaString = schema;
  const rawUrlString = url;
  url = url.split("?")[0];
  let pathname;
  try {
    pathname = new URL(url).pathname;
  } catch (e) {
    pathname = url;
  }
  if (pathname.slice(0, 1) === "/")
    pathname = pathname.slice(1);
  const params = {};
  const errors = {};
  let match = true;
  let schemaParts = schema.split("/");
  schemaParts = schemaParts.map((part) => {
    if (part.slice(0, 1) === "{" && part.slice(-1) === "}") {
      const isOptional = part.slice(0, 2) === "{?" || part.slice(-2) === "?}";
      const isType = part.indexOf(":") !== -1;
      let type = null;
      let name = null;
      if (isType) {
        name = part.split(":")[0].slice(1);
        type = part.split(":")[1].slice(0, -1);
        if (name.slice(0, 1) === "?")
          name = name.slice(1);
        if (type.slice(-1) === "?")
          type = type.slice(0, -1);
      } else {
        name = part.slice(1, -1);
        if (name.slice(-1) === "?")
          name = name.slice(0, -1);
        if (name.slice(0, 1) === "?")
          name = name.slice(1);
      }
      return {
        name,
        type,
        raw: part,
        optional: isOptional
      };
    }
    return part;
  }).filter((l) => l !== "");
  schemaParts.forEach((part) => {
    if (!part.name)
      return;
    params[part.name] = __spreadValues({}, part);
    delete params[part.name].name;
  });
  const splitedPathname = pathname.split("/");
  for (let i = 0; i < schemaParts.length; i++) {
    const schema2 = schemaParts[i];
    const part = splitedPathname[i];
    if (typeof schema2 !== "object") {
      if (part !== schema2)
        match = false;
      continue;
    }
    if (!part && !schema2.optional) {
      const errorObj = {
        type: "optional",
        description: `This param "${schema2.name}" cannot be null...`
      };
      errors[schema2.name] = errorObj;
      params[schema2.name].error = errorObj;
      match = false;
      continue;
    } else if (!part && schema2.optional) {
      params[schema2.name].value = null;
      continue;
    }
    if (schema2.type) {
      const type = schema2.type;
      if (type !== typeof (0, import_parse.default)(part)) {
        match = false;
        const errorObj = {
          type: "type",
          requested: type,
          passed: typeof (0, import_parse.default)(part),
          description: `This param "${schema2.name}" has to be a "${type}" but he's a "${typeof (0, import_parse.default)(part)}"...`
        };
        errors[schema2.name] = errorObj;
        params[schema2.name].error = errorObj;
        params[schema2.name].value = (0, import_parse.default)(part);
        continue;
      }
    }
    params[schema2.name].value = (0, import_parse.default)(part);
  }
  return {
    errors: !Object.keys(errors).length ? null : errors,
    params: !Object.keys(params).length ? null : params,
    match,
    schema: rawSchemaString,
    url: rawUrlString
  };
}
var parseSchema_default = parseSchema;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
