"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = __importDefault(require("../string/parse"));
/**
 * @name                                parseSchema
 * @namespace            shared.url
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        wip
 * @private
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
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __parseSchema } from '@coffeekraken/sugar/url';
 * __parseSchema('https://github.com/myApp/master/3', '{project:string}/{?branch:string}/{?idx:number}');
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
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function __parseSchema(url, schema) {
    const rawSchemaString = schema;
    const rawUrlString = url;
    // remove query string
    url = url.split('?')[0];
    // get the pathname of the url
    let pathname;
    try {
        pathname = new URL(url).pathname;
    }
    catch (e) {
        pathname = url;
    }
    if (pathname.slice(0, 1) === '/')
        pathname = pathname.slice(1);
    // init the params object
    const params = {};
    const errors = {};
    let match = true;
    // split the schema
    let schemaParts = schema.split('/');
    // analyze all the schema parts
    schemaParts = schemaParts
        .map((part) => {
        // check if is a param
        if (part.slice(0, 1) === '{' && part.slice(-1) === '}') {
            const isOptional = part.slice(0, 2) === '{?' || part.slice(-2) === '?}';
            const isType = part.indexOf(':') !== -1;
            let type = null;
            let name = null;
            if (isType) {
                name = part.split(':')[0].slice(1);
                type = part.split(':')[1].slice(0, -1);
                if (name.slice(0, 1) === '?')
                    name = name.slice(1);
                if (type.slice(-1) === '?')
                    type = type.slice(0, -1);
            }
            else {
                name = part.slice(1, -1);
                if (name.slice(-1) === '?')
                    name = name.slice(0, -1);
                if (name.slice(0, 1) === '?')
                    name = name.slice(1);
            }
            return {
                name,
                type,
                raw: part,
                optional: isOptional,
            };
        }
        // this is not a parameter so return as is
        return part;
    })
        .filter((l) => l !== '');
    schemaParts.forEach((part) => {
        if (!part.name)
            return;
        params[part.name] = Object.assign({}, part);
        delete params[part.name].name;
    });
    // loop on the schema to get the params values
    // const pathname = url.pathname.slice(1);
    const splitedPathname = pathname.split('/');
    for (let i = 0; i < schemaParts.length; i++) {
        // get the schema for this part
        const schema = schemaParts[i];
        // get the part to check
        const part = splitedPathname[i];
        // if it's not an object, mean that it's a simple string part
        if (typeof schema !== 'object') {
            if (part !== schema)
                match = false;
            continue;
        }
        if (!part && !schema.optional) {
            const errorObj = {
                type: 'optional',
                description: `This param "${schema.name}" cannot be null...`,
            };
            errors[schema.name] = errorObj;
            params[schema.name].error = errorObj;
            match = false;
            continue;
        }
        else if (!part && schema.optional) {
            params[schema.name].value = null;
            continue;
        }
        // check that all correspond to the schema
        if (schema.type) {
            const type = schema.type;
            if (type !== typeof (0, parse_1.default)(part)) {
                match = false;
                const errorObj = {
                    type: 'type',
                    requested: type,
                    passed: typeof (0, parse_1.default)(part),
                    description: `This param "${schema.name}" has to be a "${type}" but he's a "${typeof (0, parse_1.default)(part)}"...`,
                };
                errors[schema.name] = errorObj;
                params[schema.name].error = errorObj;
                params[schema.name].value = (0, parse_1.default)(part);
                continue;
            }
        }
        // this part match the schema so we add it to the params
        params[schema.name].value = (0, parse_1.default)(part);
    }
    // return the schema result
    return {
        errors: !Object.keys(errors).length ? null : errors,
        params: !Object.keys(params).length ? null : params,
        match,
        schema: rawSchemaString,
        url: rawUrlString,
    };
}
exports.default = __parseSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4REc7QUFDSCxTQUF3QixhQUFhLENBQUMsR0FBRyxFQUFFLE1BQU07SUFDN0MsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDO0lBQy9CLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztJQUV6QixzQkFBc0I7SUFDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEIsOEJBQThCO0lBQzlCLElBQUksUUFBUSxDQUFDO0lBQ2IsSUFBSTtRQUNBLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7S0FDcEM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLFFBQVEsR0FBRyxHQUFHLENBQUM7S0FDbEI7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7UUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvRCx5QkFBeUI7SUFDekIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFFakIsbUJBQW1CO0lBQ25CLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFcEMsK0JBQStCO0lBQy9CLFdBQVcsR0FBRyxXQUFXO1NBQ3BCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1Ysc0JBQXNCO1FBQ3RC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