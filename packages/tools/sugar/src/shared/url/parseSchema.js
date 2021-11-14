// @ts-nocheck
import __parseString from '../string/parse';
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
            if (type !== typeof __parseString(part)) {
                match = false;
                const errorObj = {
                    type: 'type',
                    requested: type,
                    passed: typeof __parseString(part),
                    description: `This param "${schema.name}" has to be a "${type}" but he's a "${typeof __parseString(part)}"...`,
                };
                errors[schema.name] = errorObj;
                params[schema.name].error = errorObj;
                params[schema.name].value = __parseString(part);
                continue;
            }
        }
        // this part match the schema so we add it to the params
        params[schema.name].value = __parseString(part);
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
export default parseSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VTY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZVNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2REc7QUFDSCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTTtJQUM1QixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUM7SUFDL0IsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0lBRXpCLHNCQUFzQjtJQUN0QixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4Qiw4QkFBOEI7SUFDOUIsSUFBSSxRQUFRLENBQUM7SUFDYixJQUFJO1FBQ0EsUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUNwQztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsUUFBUSxHQUFHLEdBQUcsQ0FBQztLQUNsQjtJQUNELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztRQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRS9ELHlCQUF5QjtJQUN6QixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUVqQixtQkFBbUI7SUFDbkIsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVwQywrQkFBK0I7SUFDL0IsV0FBVyxHQUFHLFdBQVc7U0FDcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFF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