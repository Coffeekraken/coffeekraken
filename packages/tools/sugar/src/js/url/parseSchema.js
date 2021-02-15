// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var parse_1 = __importDefault(require("../string/parse"));
    /**
     * @name                                parseSchema
     * @namespace           sugar.js.url
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
        var rawSchemaString = schema;
        var rawUrlString = url;
        // remove query string
        url = url.split('?')[0];
        // get the pathname of the url
        var pathname;
        try {
            pathname = new URL(url).pathname;
        }
        catch (e) {
            pathname = url;
        }
        if (pathname.slice(0, 1) === '/')
            pathname = pathname.slice(1);
        // init the params object
        var params = {};
        var errors = {};
        var match = true;
        // split the schema
        var schemaParts = schema.split('/');
        // analyze all the schema parts
        schemaParts = schemaParts
            .map(function (part) {
            // check if is a param
            if (part.slice(0, 1) === '{' && part.slice(-1) === '}') {
                var isOptional = part.slice(0, 2) === '{?' || part.slice(-2) === '?}';
                var isType = part.indexOf(':') !== -1;
                var type = null;
                var name_1 = null;
                if (isType) {
                    name_1 = part.split(':')[0].slice(1);
                    type = part.split(':')[1].slice(0, -1);
                    if (name_1.slice(0, 1) === '?')
                        name_1 = name_1.slice(1);
                    if (type.slice(-1) === '?')
                        type = type.slice(0, -1);
                }
                else {
                    name_1 = part.slice(1, -1);
                    if (name_1.slice(-1) === '?')
                        name_1 = name_1.slice(0, -1);
                    if (name_1.slice(0, 1) === '?')
                        name_1 = name_1.slice(1);
                }
                return {
                    name: name_1,
                    type: type,
                    raw: part,
                    optional: isOptional
                };
            }
            // this is not a parameter so return as is
            return part;
        })
            .filter(function (l) { return l !== ''; });
        schemaParts.forEach(function (part) {
            if (!part.name)
                return;
            params[part.name] = __assign({}, part);
            delete params[part.name].name;
        });
        // loop on the schema to get the params values
        // const pathname = url.pathname.slice(1);
        var splitedPathname = pathname.split('/');
        for (var i = 0; i < schemaParts.length; i++) {
            // get the schema for this part
            var schema_1 = schemaParts[i];
            // get the part to check
            var part = splitedPathname[i];
            // if it's not an object, mean that it's a simple string part
            if (typeof schema_1 !== 'object') {
                if (part !== schema_1)
                    match = false;
                continue;
            }
            if (!part && !schema_1.optional) {
                var errorObj = {
                    type: 'optional',
                    description: "This param \"" + schema_1.name + "\" cannot be null..."
                };
                errors[schema_1.name] = errorObj;
                params[schema_1.name].error = errorObj;
                match = false;
                continue;
            }
            else if (!part && schema_1.optional) {
                params[schema_1.name].value = null;
                continue;
            }
            // check that all correspond to the schema
            if (schema_1.type) {
                var type = schema_1.type;
                if (type !== typeof parse_1.default(part)) {
                    match = false;
                    var errorObj = {
                        type: 'type',
                        requested: type,
                        passed: typeof parse_1.default(part),
                        description: "This param \"" + schema_1.name + "\" has to be a \"" + type + "\" but he's a \"" + typeof parse_1.default(part) + "\"..."
                    };
                    errors[schema_1.name] = errorObj;
                    params[schema_1.name].error = errorObj;
                    params[schema_1.name].value = parse_1.default(part);
                    continue;
                }
            }
            // this part match the schema so we add it to the params
            params[schema_1.name].value = parse_1.default(part);
        }
        // return the schema result
        return {
            errors: !Object.keys(errors).length ? null : errors,
            params: !Object.keys(params).length ? null : params,
            match: match,
            schema: rawSchemaString,
            url: rawUrlString
        };
    }
    exports.default = parseSchema;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZVNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFViwwREFBNEM7SUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkRHO0lBQ0gsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLE1BQU07UUFDOUIsSUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBQy9CLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUV6QixzQkFBc0I7UUFDdEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEIsOEJBQThCO1FBQzlCLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSTtZQUNGLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDbEM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLFFBQVEsR0FBRyxHQUFHLENBQUM7U0FDaEI7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7WUFBRSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRCx5QkFBeUI7UUFDekIsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFakIsbUJBQW1CO1FBQ25CLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEMsK0JBQStCO1FBQy9CLFdBQVcsR0FBRyxXQUFXO2FBQ3RCLEdBQUcsQ0FBQyxV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