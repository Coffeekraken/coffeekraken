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
    var parse_1 = __importDefault(require("../string/parse"));
    /**
     * @name                                parseSchema
     * @namespace           sugar.js.url
     * @type                                Function
     * @wip
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
    return parseSchema;
});
//# sourceMappingURL=parseSchema.js.map