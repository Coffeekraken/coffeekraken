"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = __importDefault(require("../string/parse"));
/**
 * @name                                parseSchema
 * @namespace            js.url
 * @type                                Function
 * @platform          js
 * @platform          node
 * @status        wip
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
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function parseSchema(url, schema) {
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
exports.default = parseSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZERztBQUNILFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxNQUFNO0lBQzVCLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQztJQUMvQixNQUFNLFlBQVksR0FBRyxHQUFHLENBQUM7SUFFekIsc0JBQXNCO0lBQ3RCLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXhCLDhCQUE4QjtJQUM5QixJQUFJLFFBQVEsQ0FBQztJQUNiLElBQUk7UUFDQSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQ3BDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixRQUFRLEdBQUcsR0FBRyxDQUFDO0tBQ2xCO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO1FBQUUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0QseUJBQXlCO0lBQ3pCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBRWpCLG1CQUFtQjtJQUNuQixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXBDLCtCQUErQjtJQUMvQixXQUFXLEdBQUcsV0FBVztTQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNWLHNCQUFzQjtRQUN0QixJ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