import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __parseString from "../string/parse";
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
      if (type !== typeof __parseString(part)) {
        match = false;
        const errorObj = {
          type: "type",
          requested: type,
          passed: typeof __parseString(part),
          description: `This param "${schema2.name}" has to be a "${type}" but he's a "${typeof __parseString(part)}"...`
        };
        errors[schema2.name] = errorObj;
        params[schema2.name].error = errorObj;
        params[schema2.name].value = __parseString(part);
        continue;
      }
    }
    params[schema2.name].value = __parseString(part);
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
export {
  parseSchema_default as default
};
