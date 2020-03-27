const __parse = require('url-parse');
const __parseString = require('../string/parse');

/**
 * @name                                  parse
 * @namespace                             sugar.js.url
 * @type                                  Function
 *
 * Allows you to parse urls and get back some informations like:
 * - hostname
 * - protocol
 * - slashes
 * - auth
 * - username
 * - password
 * - etc...
 * But allows you also to parse url like "my/cool/{something}/{other:number}" urls and get back the infos in object format like:
 * - hostname
 * - protocol
 * - And all the "standard" informations
 * - params.something
 * - params.other
 *
 * @param           {String}                url                     The url to parse
 * @param           {Object}                [settings={}]
 * Some settings described bellow:
 * - [schema](#schema) {String} (optional): An url schema to analyze by passing some params, optional params, etc...
 * 
 * ## (#shema) Schema setting
 * You can specify some parameters to find in the url by using the {paramName} syntax. Here's some examples:
 * - {param1}/hello/{param2}
 * - {param1:number}/hello/{param2?} : The "?" at the end means that this parameter is optional 
 * 
 * @return          {Object}                                        An object representing your parsed url
 *
 * @example           js
 * import parseUrl from '@coffeekraken/js/url/parse';
 * parseUrl('https://google.com/hello/world', {
 *  schema: '{param1}/{param2:string}'
 * }); // => {
 *    protocol: 'https',
 *    host: 'google.com',
 *    params: {
 *      param1: 'hello',
 *      param2: 'world'
 *    }
 * }
 *
 * @see       https://www.npmjs.com/package/url-parse
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function parse(url, settings = {}) {

  // first, parse the passed url:
  const parsedUrlObj = __parse(url);

  // init the params object
  const params = {};
  const errors = {};
  let match = true;

  // check if there's a schema specified
  if (settings.schema) {

    // split the schema
    let schemaParts = settings.schema.split('/');

    // analyze all the schema parts
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
          type = type.split('|');
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

      }

      // this is not a parameter so return as is
      return part;

    });

    // loop on the schema to get the params values
    const pathname = parsedUrlObj.pathname.slice(1);
    const splitedPathname = pathname.split('/');
    for (let i = 0; i < schemaParts.length; i++) {

      // get the schema for this part
      const schema = schemaParts[i];

      // if it's not an object, mean that it's a simple string part
      if (typeof schema !== 'object') {
        continue;
      }

      // get the part to check
      const part = splitedPathname[i];
      if (!part && !schema.optional) {
        match = false;
        break;
      };

      // check that all correspond to the schema
      if (schema.type) {
        const types = schema.type;
        if (types.indexOf(typeof __parseString(part)) === -1) {
          match = false;
          errors[schema.name] = {
            error: 'type',
            requested: schema.type,
            passed: typeof __parseString(part)
          };
          break;
        };

      }

      // this part match the schema so we add it to the params
      params[schema.name] = __parseString(part);

    }

    return {
      match,
      params,
      errors,
      ...parsedUrlObj
    };

  }

}