/**
*
* @name                                parseSchema
* @namespace            js.url
* @type                                Function
* @platform          js
* @platform          ts
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