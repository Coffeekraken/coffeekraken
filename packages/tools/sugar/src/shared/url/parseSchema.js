// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/parse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parse_1 = __importDefault(require("../string/parse"));
    /**
     * @name                                parseSchema
     * @namespace            js.url
     * @type                                Function
     * @status              wip
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
                    optional: isOptional
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
                    description: `This param "${schema.name}" cannot be null...`
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
                if (type !== typeof parse_1.default(part)) {
                    match = false;
                    const errorObj = {
                        type: 'type',
                        requested: type,
                        passed: typeof parse_1.default(part),
                        description: `This param "${schema.name}" has to be a "${type}" but he's a "${typeof parse_1.default(part)}"...`
                    };
                    errors[schema.name] = errorObj;
                    params[schema.name].error = errorObj;
                    params[schema.name].value = parse_1.default(part);
                    continue;
                }
            }
            // this part match the schema so we add it to the params
            params[schema.name].value = parse_1.default(part);
        }
        // return the schema result
        return {
            errors: !Object.keys(errors).length ? null : errors,
            params: !Object.keys(params).length ? null : params,
            match,
            schema: rawSchemaString,
            url: rawUrlString
        };
    }
    exports.default = parseSchema;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZVNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0REFBNEM7SUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkRHO0lBQ0gsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU07UUFDOUIsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBQy9CLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV6QixzQkFBc0I7UUFDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEIsOEJBQThCO1FBQzlCLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSTtZQUNGLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDbEM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLFFBQVEsR0FBRyxHQUFHLENBQUM7U0FDaEI7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7WUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRCx5QkFBeUI7UUFDekIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFakIsbUJBQW1CO1FBQ25CLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEMsK0JBQStCO1FBQy9CLFdBQVcsR0FBRyxXQUFXO2FBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lB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