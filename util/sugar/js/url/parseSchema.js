"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSchema;

var _parse = _interopRequireDefault(require("../string/parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                                parseSchema
 * @namespace                           sugar.js.url
 * @type                                Function
 *
 * This function take two arguments. The first one is the url to parse and the second is a schema to scan the url with.
 * The schema describe the pathname of an url and tell's how to analyze it.
 * Here's a little description with some example of schemas:
 * - "{param1}/{param2}/{param3}": This schema describe that your Url must have 3 "values" named param1, param2 and param3
 *    - If my Url is "something.com/hello/world/plop", my schema is respected and I can have access to the values through the "schema.params.param1", "schema.params.param2", etc...
 * - "{hello:string}/{world:number}/{?idx:number}": This schema describe that the Url can have 3 "values" but the last one is optional
 *    - If my Url is "something.com/plop/3/1", my schema is respected
 *    - If my Url is "something.com/plop/2", my schema is respected
 *    - If my Url is "something.com/plop/hello/2", my schema is not respected due to the fact that the param named "world" has to be a number
 *
 * @param         {String}              url                 The url to parse
 * @param         {String}              schema              The schema with the one we will analyze the url
 * @return        {Object}                                  An object that describe our parsing process result. Here's the structure of the returned object:
 * - errors (null) {Object}: An object with all the params in error with the description of the error for each
 * - params (null) {Object}: An object containing every params grabed from the url with their values for each
 * - match (true) {Object}: A boolean that tells you if the parsed url match the passed schema or not
 *
 * @example       js
 * import parseSchema from '@coffeekraken/sugar/js/url/parseSchema';
 * parseSchema('https://github.com/myApp/master/3', '{project:string}/{?branch:string}/{?idx:number}');
 * // {
 * //   url: 'https://github.com/myApp/master/3',
 * //   schema: '{project:string}/{?branch:string}/{?idx:number}',
 * //   match: true,
 * //   errors: null,
 * //   params: {
 * //     project: {
 * //       optional: false,
 * //       raw: '{project:string}',
 * //       type: 'string',
 * //       value: 'myApp'
 * //     },
 * //     branch: {
 * //       optional: true,
 * //       raw: '{?branch:string},
 * //       type: 'string',
 * //       value: 'master'
 * //     },
 * //     idx: {
 * //       optional: true,
 * //       raw: '{?idx:number}',
 * //       type: 'number',
 * //       value: 3
 * //     }
 * //   }
 * // }
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function parseSchema(url, schema) {
  const rawSchemaString = schema;
  const rawUrlString = url; // remove query string

  url = url.split('?')[0]; // get the pathname of the url

  let pathname;

  try {
    pathname = new URL(url).pathname;
  } catch (e) {
    pathname = url;
  }

  if (pathname.slice(0, 1) === '/') pathname = pathname.slice(1); // init the params object

  const params = {};
  const errors = {};
  let match = true; // split the schema

  let schemaParts = schema.split('/'); // analyze all the schema parts

  schemaParts = schemaParts.map(part => {
    // check if is a param
    if (part.slice(0, 1) === '{' && part.slice(-1) === '}') {
      const isOptional = part.slice(0, 2) === '{?' || part.slice(-2) === '?}';
      const isType = part.indexOf(':') !== -1;
      let type = null;
      let name = null;

      if (isType) {
        name = part.split(':')[0].slice(1);
        type = part.split(':')[1].slice(0, -1);
        if (name.slice(0, 1) === '?') name = name.slice(1);
        if (type.slice(-1) === '?') type = type.slice(0, -1);
      } else {
        name = part.slice(1, -1);
        if (name.slice(-1) === '?') name = name.slice(0, -1);
        if (name.slice(0, 1) === '?') name = name.slice(1);
      }

      return {
        name,
        type,
        raw: part,
        optional: isOptional
      };
    } // this is not a parameter so return as is


    return part;
  }).filter(l => l !== '');
  schemaParts.forEach(part => {
    if (!part.name) return;
    params[part.name] = { ...part
    };
    delete params[part.name].name;
  }); // loop on the schema to get the params values
  // const pathname = url.pathname.slice(1);

  const splitedPathname = pathname.split('/');

  for (let i = 0; i < schemaParts.length; i++) {
    // get the schema for this part
    const schema = schemaParts[i]; // get the part to check

    const part = splitedPathname[i]; // if it's not an object, mean that it's a simple string part

    if (typeof schema !== 'object') {
      if (part !== schema) match = false;
      continue;
    }

    if (!part && !schema.optional) {
      let errorObj = {
        type: 'optional',
        description: `This param "${schema.name}" cannot be null...`
      };
      errors[schema.name] = errorObj;
      params[schema.name].error = errorObj;
      match = false;
      continue;
    } else if (!part && schema.optional) {
      params[schema.name].value = null;
      continue;
    } // check that all correspond to the schema


    if (schema.type) {
      const type = schema.type;

      if (type !== typeof (0, _parse.default)(part)) {
        match = false;
        const errorObj = {
          type: 'type',
          requested: type,
          passed: typeof (0, _parse.default)(part),
          description: `This param "${schema.name}" has to be a "${type}" but he's a "${typeof (0, _parse.default)(part)}"...`
        };
        errors[schema.name] = errorObj;
        params[schema.name].error = errorObj;
        params[schema.name].value = (0, _parse.default)(part);
        continue;
      }
    } // this part match the schema so we add it to the params


    params[schema.name].value = (0, _parse.default)(part);
  } // return the schema result


  return {
    errors: !Object.keys(errors).length ? null : errors,
    params: !Object.keys(params).length ? null : params,
    match,
    schema: rawSchemaString,
    url: rawUrlString
  };
}

module.exports = exports.default;