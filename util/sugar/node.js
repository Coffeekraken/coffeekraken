// require('module-alias/register');
const __ensureExists = require('./src/node/object/ensureExists');
const api = {};

/**
 * @name        queryStringToObject
 * @namespace       sugar.node.url
 * @type      Function
 *
 * Transform a query string into his object (key => pairs) representation
 *
 * @param 	{String}  	queryString  	The query string to process
 * @return 	{Object} 					The object representation of the query string
 *
 * @example    js
 * import queryStringToObject from '@coffeekraken/sugar/node/string/queryStringToObject'
 * queryStringToObject('?var1=value1&var2=value2') // { var1: 'value1', var2: 'value2' }
 *
 * @snippet     js
 * Sugar.node.url.queryStringToObject($1)
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see  	http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
 */
__ensureExists(api, 'node.url.queryStringToObject', null);
api.node.url.queryStringToObject = (...args) => {
  return require('./src/node/url/queryStringToObject.js').call(null, ...args);
};

/**
 * @name                                parseSchema
 * @namespace                           sugar.node.url
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
 * import parseSchema from '@coffeekraken/sugar/node/url/parseSchema';
 * parseSchema('https://github.com/myApp/master/3', '{project:string}/{?branch:string}/{?idx:number}');
 * // {
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
__ensureExists(api, 'node.url.parseSchema', null);
api.node.url.parseSchema = (...args) => {
  return require('./src/node/url/parseSchema.js').call(null, ...args);
};

/**
 * @name            gravatarUrl
 * @namespace       sugar.node.url
 * @type            Function
 *
 * Return a gravatar url depending on the passed user email and size
 *
 * @param           {String}            email             The user email
 * @param           {Number}            [size=200]        The wanted image size. From 1 to 2048
 * @return          {String}                              The generated gravatar url
 *
 * @example       js
 * import gravatarUrl from '@coffeekraken/sugar/node/util/gravatarUrl';
 * console.log(gravatarUrl('olivier.bossel@gmail.com')); // https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.url.gravatarUrl', null);
api.node.url.gravatarUrl = (...args) => {
  return require('./src/node/url/gravatarUrl.js').call(null, ...args);
};

/**
 * @name            SUrl
 * @namespace       sugar.node.url
 * @type            Class
 *
 * Simple class that is useful to parse a URL (or the current browser URL) and gives you back
 * an instance that has all these values availables as well as functions to modify the instancied URL:
 * - protocol: The protocol scheme of the URL (e.g. http:).
 * - slashes: A boolean which indicates whether the protocol is followed by two forward slashes (//).
 * - auth: Authentication information portion (e.g. username:password).
 * - username: Username of basic authentication.
 * - password: Password of basic authentication.
 * - host: Host name with port number.
 * - hostname: Host name without port number.
 * - port: Optional port number.
 * - pathname: URL path.
 * - query: Parsed object containing query string
 * - queryString: Origin query string from the URL
 * - hash: The "fragment" portion of the URL including the pound-sign (#).
 * - href: The full URL.
 * - origin: The origin of the URL.
 * - schema: The schema property gives you access to an object containing these properties (only if you have provided the settings.schema setting):
 *    - match (true) {Boolean}: Tells you if your current url match the passed schema
 *    - errors (null) {Object}: Gives you access to which param(s) is/are in error
 *    - params (null) {Object}: Gives you access to each params specified in the schema with their values, etc...
 *
 * This class use internally the `url-parse` npm module that you can find here: https://www.npmjs.com/package/url-parse
 *
 * @example     js
 * import SUrl from '@coffeekraken/js/url/SUrl';
 * const url = new SUrl('https://github.com/foo/bar');
 * console.log(url.hostname); // => github.com
 * url.hostname = 'youtube.com';
 *
 * const urlWithSchema = new SUrl('https://github.com/hello/world/2', {
 *    schema: '{param1:string}/{param2}/{?param3:number}'
 * });
 * console.log(urlWithSchema.schema);
 * // {
 * //    match: true,
 * //    errors: {},
 * // }
 *
 *
 * @see        https://www.npmjs.com/package/url-parse
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
__ensureExists(api, 'node.url.SUrl', null);
Object.defineProperty(api.node.url, 'SUrl', {
  get: function () {
    return require('./src/node/url/SUrl.js');
  }
});

/**
 * @name                                  convert
 * @namespace                             sugar.node.time
 * @type                                  Function
 *
 * This function allows you to convert time like seconds, ms, hours, minutes, etc... from one format to another
 *
 * @param           {String|Number}             from                  The value to start from like "10s", "20ms", "2h", etc...
 * @param           {String}                    [to='ms']             The format you want to get back
 * @return          {Number}                                          The converted value
 *
 * @example           js
 * import convert from '@coffeekraken/sugar/node/time/convert';
 * convert('10s', 'ms'); // => 10000
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.time.convert', null);
api.node.time.convert = (...args) => {
  return require('./src/node/time/convert.js').call(null, ...args);
};

/**
 * @name 		            STimer
 * @namespace           sugar.node.time
 * @type                  Class
 *
 * Class that let you create and handle timer with ease.
 * With this class you can set some callback function that will be
 * called each x ms or tell that you want your callbacks to be called
 * a certain number of time during the timer time.
 *
 * @example 	js
 * const STimer = require('@coffeekraken/sugar/node/time/STimer');
 * const myTimer = new STimer(2000, {
 * 		tickCount : 5
 * })
 * myTimer.onTick((myTimer) => {
 * 		// do something here...
 * })
 * myTimer.start()
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
__ensureExists(api, 'node.time.STimer', null);
Object.defineProperty(api.node.time, 'STimer', {
  get: function () {
    return require('./src/node/time/STimer.js');
  }
});

/**
 * @name                                parseHtml
 * @namespace                           sugar.node.terminal
 * @type                                Function
 *
 * Parse the simple html tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.terminal.parseHtml', null);
api.node.terminal.parseHtml = (...args) => {
  return require('./src/node/terminal/parseHtml.js').call(null, ...args);
};

/**
 * @name                                      cursorPos
 * @namespace                                 sugar.node.terminal
 * @type                                      Function
 *
 * Return the terminal cursor position in {x,y} format.
 *
 * @return              {Promise}                         A promise resolved once the position has been getted
 *
 * @example             js
 * const cursorPos = require('@coffeekraken/sugar/node/terminal/cursorPos');
 * await cursorPos(); // => { x: 10, y: 20 }
 *
 * @see       https://www.npmjs.com/package/terminal-kit
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.terminal.cursorPos', null);
api.node.terminal.cursorPos = (...args) => {
  return require('./src/node/terminal/cursorPos.js').call(null, ...args);
};

/**
 * @name                                          columns
 * @namespace                                     sugar.node.terminal
 * @type                                          Function
 *
 * Display your content using columns. The number of columns is defined by the number of items in the content array
 *
 * @param                 {Array}                       content                     The columns content stored in an Array
 * @param                 {Object}                      [settings={}]               An object of settings descripbed above
 * - width (process.env.STDOUT_COLUMNS || process.stdout.columns) {Number}: The base width on which to calculate the columns
 * - padding (process.env.STDOUT_PADDING || 3) {Number}: The padding to apply on the sides
 * @return                {String}                                                  The string to log in the terminal
 *
 * @example               js
 * const columns = require('@coffeekraken/sugar/node/terminal/columns');
 * columns([
 *  'Hello world',
 *  'How are you?'
 * ]);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.terminal.columns', null);
api.node.terminal.columns = (...args) => {
  return require('./src/node/terminal/columns.js').call(null, ...args);
};

/**
 * @name                                    center
 * @namespace                               sugar.node.terminal
 * @type                                    Function
 *
 * Allow to center one or more lines in the terminal depending on the process.env.STDOUT_PADDING environment variable
 * Settings:
 * - spaceChar (~) {String}: Which character to consider as a space that will be replaced by an actual space
 *
 * @param                 {String|Array}                  text                    The text to center or array of strings to center
 * @param                 {Object}                  [settings={}]           An object of settings
 * @return                {String}                                          The centered text
 *
 * @example             js
 * const center = require('@coffeekraken/sugar/node/terminal/center');
 * center('Hello world'); // => '                 Hello world'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.terminal.center', null);
api.node.terminal.center = (...args) => {
  return require('./src/node/terminal/center.js').call(null, ...args);
};

/**
 * @name        upperFirst
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Upper first
 *
 * @param    {String}    string    The string to process
 * @return    {String}    The processed string with first letter uppercase
 *
 * @example    js
 * import upperFirst from '@coffeekraken/sugar/node/string/upperFirst'
 * upperFirst('hello world') // Hello world
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.upperFirst', null);
api.node.string.upperFirst = (...args) => {
  return require('./src/node/string/upperFirst.js').call(null, ...args);
};

/**
 * @name        unquote
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Remove the quotes of a string
 * Types of quotes removed :
 * - `"`, `'`, `”`, '`'
 *
 * @param    {String}    string    The string to process
 * @param    {Array<String>}    [quotesToRemove=['"','\'','”','`']]    The quotes to removes
 * @return    {String}    The unquoted string
 *
 * @example    js
 * import unquote from '@coffeekraken/sugar/node/string/unquote'
 * unquote("'Hello world'") // "Hello world"
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.unquote', null);
api.node.string.unquote = (...args) => {
  return require('./src/node/string/unquote.js').call(null, ...args);
};

/**
 * @name          uniqid
 * @namespace       sugar.node.string
 * @type          Function
 *
 * Generate a uniqid string of 8 bytes. Work using the [uniqid](https://www.npmjs.com/package/uniqid) npm package under the hood.
 *
 * @return          {String}                A 8 bytes uniqid string
 *
 * @example       js
 * import uniqid from '@coffeekraken/sugar/node/string/uniqid';
 * console.log(uniqid()); // => 4n5pxq24
 *
 * @see       https://www.npmjs.com/package/uniqid
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.uniqid', null);
api.node.string.uniqid = (...args) => {
  return require('./src/node/string/uniqid.js').call(null, ...args);
};

/**
 * @name        uncamelize
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Uncamelize a string
 *
 * @param    {String}    string    The string to uncamelize
 * @param    {String}    [separator='-']    The separator to use
 * @return    {String}    The uncamelized string
 *
 * @example    js
 * import uncamelize from '@coffeekraken/sugar/node/string/uncamelize'
 * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.uncamelize', null);
api.node.string.uncamelize = (...args) => {
  return require('./src/node/string/uncamelize.js').call(null, ...args);
};

/**
 * @name        toString
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Convert passed value to a string
 *
 * @param    {Mixed}    value    The value to convert to string
 * @return    {String}    The resulting string
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/node/string/toString'
 * toString({
 * 	id:'hello'
 * }) // '{"id":"hello"}'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.toString', null);
api.node.string.toString = (...args) => {
  return require('./src/node/string/toString.js').call(null, ...args);
};

/**
 * @name        sprintf
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Javascript implementation of the sprintf php function.
 * >For more infos, check [this github repository](https://github.com/alexei/sprintf.js)
 *
 * @param    {String}    format    The format of the string wanted as output
 * @param    {Mixed}    ...replacements    The replacement tokens to apply to the string
 * @return    {String}    The processed string
 *
 * @example    js
 * import sprintf from '@coffeekraken/sugar/node/string/sprintf'
 * sprintf('Hello %s', 'world') // Hello World
 * const user = { name: 'Dolly' }
 * sprintf('Hello %(name)s', user) // Hello Dolly
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/alexei/sprintf.js
 */
__ensureExists(api, 'node.string.sprintf', null);
api.node.string.sprintf = (...args) => {
  return require('./src/node/string/sprintf.js').call(null, ...args);
};

/**
 * @name                          splitEvery
 * @namespace                     sugar.node.string
 * @type                          Function
 *
 * Split a string every n chars either by taking care of not spliting the words, or by simply spliting without any attention to that...
 *
 * @param               {String}                  text                      The text to split
 * @param               {Number}                  every                     How many characters to split the text
 * @param               {Boolean}                 [splitWords=false]        If you want to split the words or not...
 * @return              {Array}                                             An array of the splited text parts
 *
 * @example           js
 * const splitEvery = require('@coffeekraken/node/string/splitEvery');
 * splitEvery('Hello World', 2, true); // => ['He','ll','o ','Wo','rl','d']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.splitEvery', null);
api.node.string.splitEvery = (...args) => {
  return require('./src/node/string/splitEvery.js').call(null, ...args);
};

/**
 * @name        rtrim
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Trim right a specified string
 *
 * @param    {String}    string    The string to trim
 * @param    {String}    needle    The string to find an cut out if found
 * @param     {Boolean}     [trimResult=true]       Specify if you want to trim the trimed string
 * @return    {String}    The trimed string
 *
 * @example    js
 * import rtrim from '@coffeekraken/sugar/node/string/rtrim'
 * rtrim('Hello World', 'ld') // Hello Wor
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.rtrim', null);
api.node.string.rtrim = (...args) => {
  return require('./src/node/string/rtrim.js').call(null, ...args);
};

/**
 * @name        printf
 * @namespace       sugar.node.string
 * @type      Function
 *
 * printf php equavalent
 *
 * @param 		{String} 						source 			The source in which to replace the tokens
 * @param 		{Miyed} 			values... 			  Any number of arguments to replace the placeholders in the string
 * @return 	{String} 										The resulting string
 *
 * @example     js
 * import printf from '@coffeekraken/sugar/node/string/printf';
 * printf('Hello %s', 'world'); // => Hello world
 * printf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
 * printf('Hello %(first)s, I\'m %(name)s', { first : 'world', name : 'John Doe'}); // Hello world, I'm John Doe
 *
 * @see 				https://www.npmjs.com/package/sprintf-js
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.printf', null);
api.node.string.printf = (...args) => {
  return require('./src/node/string/printf.js').call(null, ...args);
};

/**
 * @name                                  parse
 * @namespace                             sugar.node.string
 * @type                                  Function
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @example           js
 * import parse from '@coffeekraken/sugar/node/string/parse';
 * parse('10'); // => 10
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.parse', null);
api.node.string.parse = (...args) => {
  return require('./src/node/string/parse.js').call(null, ...args);
};

/**
 * @name        ltrim
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Trim left a specified string
 *
 * @param    {String}    string    The string to trim
 * @param    {String}    needle    The string to find an cut out if found
 * @param    {Boolean}  [trimResult=true]       If you want to trim the resulted ltrim
 * @return    {String}    The trimed string
 *
 * @example    js
 * import ltrim from '@coffeekraken/sugar/node/string/ltrim'
 * ltrim('Hello World', 'Hello') // World
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.ltrim', null);
api.node.string.ltrim = (...args) => {
  return require('./src/node/string/ltrim.js').call(null, ...args);
};

/**
 * @name        lowerFirst
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Lower first letter
 *
 * @param    {String}    string    The string to lower the first letter
 * @return    {String}    The string with the first letter lowered
 *
 * @example    js
 * import lowerFirst from '@coffeekraken/sugar/node/string/lowerFirst'
 * lowerFirst('Hello world') // hello world
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.lowerFirst', null);
api.node.string.lowerFirst = (...args) => {
  return require('./src/node/string/lowerFirst.js').call(null, ...args);
};

/**
 * @name        includes
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Same as the native String.includes function but accept either an array of items
 * or a simple comma separated string like "something,cool,hello,world"
 *
 * @param    {String}    string    The string to check
 * @param     {Array|String}    values      An array or comma separated string to check
 * @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match
 *
 * @example    js
 * import includes from '@coffeekraken/sugar/node/string/includes'
 * includes('Hello world', 'world,coco') // ['world']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.includes', null);
api.node.string.includes = (...args) => {
  return require('./src/node/string/includes.js').call(null, ...args);
};

/**
 * @name                                        crop
 * @namespace                                   sugar.node.string
 * @type                                        Function
 *
 * Allows you to crop a string at a certain length (this length take care of the croping characters like "...")
 *
 * @param               {String}                  text                      The text to crop
 * @param               {Number}                  length                    The text length to have after the croping process
 * @param               {Object}                  [settings={}]             An object of settings described bellow:
 * - chars (...) {String}: The characters to use to signal the crop
 * - splitWords (false) {Boolean}: Specify if you want to split words or not. If not, the function will make sure the final text does not exceeds the wanted length
 * @return              {String}                                            The cropped text
 *
 * @example         js
 * import crop from '@coffeekraken/sugar/node/string/crop';
 * crop('Hello World', 10); // => Hello w...
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.crop', null);
api.node.string.crop = (...args) => {
  return require('./src/node/string/crop.js').call(null, ...args);
};

/**
 * @name                                  countLine
 * @namespace                             sugar.node.string
 * @type                                  Function
 *
 * Count how many characters their is in the passed line.
 * This function will exclude the characters like the html tags like <red>, etc...
 *
 * @param           {String}              line              The line to count
 * @param           {Object}              [count={}]        Specify what you want to count outside of the normal characters of yourse. Here's the list of available options:
 * - htmlTags (false) {Boolean}: Specify if you want to count the html tags or not
 * - terminalSpecialChars (false) {Boolean}: Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
 * - newLineChars (false) {Boolean}: Specify if you want to count the new line special char "\n" or not
 * @return          {Number}                                How many characters their is in the line
 *
 * @example         js
 * const countLine = require('@coffeekraken/sugar/node/string/countLine');
 * countLine('Hello <red>World</red>'); // 11
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.countLine', null);
api.node.string.countLine = (...args) => {
  return require('./src/node/string/countLine.js').call(null, ...args);
};

/**
 * @name        camelize
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Camelize a string
 *
 * @param         {String}          text        The string to camelize
 * @param         {String}          [charsRange='_-\\s']      The regex chars range to remove and camelize the next character
 * @return        {String}                      The camelized string
 *
 * @example     js
 * import camelize from '@coffeekraken/sugar/node/string/camelize';
 * camelize('hello world'); // => helloWorld
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.camelize', null);
api.node.string.camelize = (...args) => {
  return require('./src/node/string/camelize.js').call(null, ...args);
};

/**
 * @name        autoCast
 * @namespace       sugar.node.string
 * @type      Function
 *
 * Auto cast the string into the correct variable type
 *
 * @param    {String}    string    The string to auto cast
 * @return    {Mixed}    The casted value
 *
 * @example    js
 * import autoCast from '@coffeekraken/sugar/node/strings/autoCast'
 * autoCast('12') // => 12
 * autoCast('window.HTMLElement') // => HTMLElement
 * autoCast('{"hello":"world"}') // {hello:'world'}
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.string.autoCast', null);
api.node.string.autoCast = (...args) => {
  return require('./src/node/string/autoCast.js').call(null, ...args);
};

/**
 * @name                  SPromise
 * @namespace             sugar.node.promise
 * @type                  Class
 *
 * This class works the same as the default Promise one. The difference is that you have more control on this one like
 * the possibility to resolve it multiple times. Here's a list of the "differences" and the "features" that this class provide:
 *
 * - Pass the normal "resolve" and "reject" function to the passed executor
 * - Pass a new function to the passed executor called "trigger" that let you launch your registered callbacks like "then", "catch", etc... but without resolving the master promise. Here's some examples:
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then', 'myCoolValue'); }).then(value => { ... });
 *    - new SPromise((resolve, reject, trigger, cancel) => { trigger('then,catch', 'myCoolValue') }).then(value => { ... });
 * - Pass a new function to the passed executor called "cancel" that let you stop/cancel the promise execution without triggering your registered callbacks unless the "cancel" once...
 * - Expose the normal "then" and "catch" methods to register your callbacks
 * - Expose some new callbacks registration functions described here:
 *    - Expose a method called "resolved" that let you register callbacks called only when the "resolve" function has been called
 *    - Expose a method called "rejected" that let you register callbacks called only when the "reject" function has been called
 *    - Expose a method called "finally" that let you register callbacks called when the "resolve" or "reject" function has been called
 *    - Expose a method called "cancel" that let you register callbacks called only when the "cancel" function has been called
 * - Every callbacks registration methods accept as first argument the number of time that your callback will be called at max. Here's some examples:
 *    - new SPromise((...)).then(value => { // do something... }).catch(error => { // do something... }).start();
 *    - new SPromise((...)).then(1, value => { // do something... }).catch(3, error => { // do something... }).start();
 * - Expose a method called "on" that can be used to register callbacks the same as the "then", "catch", etc... methods but you can register a same callback function to multiple callbacks type at once:
 *    - new SPromise((...)).on('then', value => { ... }).on('then,catch', value => { ... }).start();
 *    - Specify the max number of time to call your callback function like so: new SPromise((...)).on('then:2', value => { ... }).on('then:1,catch', value => { ... }).start();
 * - A new method called "start" is exposed. This method is useful when you absolutely need that your executor function is launched right after the callbacks registrations.
 *    - If you don't call the "start" method, the executor function passed to the SPromise constructor will be called on the next javascript execution loop
 * - Support the Promises chaining through the callbacks like to:
 *    ```js
 *      const result = await new SPromise((resolve, reject, trigger, cancel) => {
 *        resolve('hello');
 *      }).then(value => {
 *        return new Promise((resolve) => {
 *          setTimeout(() => {
 *            resolve(value + 'World');
 *          }, 1000);
 *        });
 *      }).then(value => {
 *        return value + 'Promise';
 *      }).start();
 *      console.log(result); // => helloWorldPromise
 *    ```
 *
 * @example         js
 * import SPromise from '@coffeekraken/sugar/node/promise/SPromise';
 * function myCoolFunction() {
 *    return new SPromise((resolve, reject, trigger, cancel) => {
 *        // do something...
 *        setInterval(() => {
 *            // resolve the promise
 *            resolve('something'); *
 *        }, 1000);
 *    });
 * }
 *
 * // calling the function and get back the SPromise instance
 * myCoolFunction().then(value => {
 *    // do something here...
 * }).then(1, value => {
 *    // do something just once...
 * }).catch(error => {
 *    // do something with the returned reason of failure...
 * }).start();
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
__ensureExists(api, 'node.promise.SPromise', null);
Object.defineProperty(api.node.promise, 'SPromise', {
  get: function () {
    return require('./src/node/promise/SPromise.js');
  }
});

/**
 * @name        whenProperty
 * @namespace       sugar.node.object
 * @type      Function
 *
 * Resolve a promise when the wanted property on the passed object exist or pass the check function provided
 *
 * @param 		{Object} 					object 				The object on which to monitor the property
 * @param 		{String} 					property 			The property to monitor
 * @param 		{Function} 					[checkFn=null] 		An optional function to check the property. The promise is resolved when this function return true
 * @return 		(Promise) 										The promise that will be resolved when the property exist on the object (and that it passes the checkFn)
 *
 * @example 	js
 * import whenProperty from '@coffeekraken/sugar/node/object/whenProperty'
 *
 * const myObj = {
 *  	title : 'Hello'
 * };
 *
 * whenProperty(myObj, 'title').then((value) => {
 * 		// the object has a title property now
 * });
 *
 * // with a checkFn
 * whenProperty(myObj, 'title', (newVal, oldVal) => {
 * 		// when the property is 'Hello World'
 * 		return newVal === 'Hello World';
 * }).then((value) => {
 * 		// do something with your Hello World
 * });
 *
 * setTimeout(() => {
 * 		// this will resolve the promise
 * 		myObj.title = 'Hello World';
 * },1000);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.whenProperty', null);
api.node.object.whenProperty = (...args) => {
  return require('./src/node/object/whenProperty.js').call(null, ...args);
};

/**
 * @name                      watch
 * @namespace                 sugar.node.object
 * @type                      Function
 *
 * This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays
 *
 * @param       {Object|Array}        target          The array or object to watch
 * @param       {String|Array}        globs           A glob or array of glob patterns to tell which propertie(s) you want to watch
 * @param       {Function}            handlerFn       A function that will be called every time an update is made on the target. This function will receive an object as parameter that describe the update
 * @return      {Object}                              Return the proxied object on which you can make all the updates that you want
 *
 * @example       js
 * import watch from '@coffeekraken/sugar/node/object/watch';
 * let myObj = watch({
 *    hello: 'world'
 * }, '**', (event) => {
 *    // do something when an event appends
 *    console.log(event.action); // => Object.set
 * });
 * myObj.hello = 'plop';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.watch', null);
api.node.object.watch = (...args) => {
  return require('./src/node/object/watch.js').call(null, ...args);
};

/**
 * @name                            uid
 * @namespace                       sugar.node.object
 * @type                            Function
 *
 * This function allows you to generate a uniqid based on the objects you pass as parameters.
 * The uid is hashed into a SHA256 32bits string but you can specify it using the "format" parameter described above
 *
 * @param       {Object}            objects...          The objects you want use to generate the uniqid
 * @param       {String}            [format='sha256']    The uid format that you want. Here's the available values:
 * - sha256: return a SHA256 64 characters formated string
 * - full: return the full length uid. The length can vary depending on the objects passed
 * @param       {String}            [key='sugar.node.object.uid']     The key used to encrypt the object
 * @return      {String}                                The uniqid generate based on the objects passed
 *
 * @example       js
 * const uid = require('@coffeekraken/sugar/node/object/uid');
 * uid({ hello: 'world' }, { plop: 'coco' }); // => ijfw89uf98jhw9ef8whef87hw7e8q87wegfh78wgf87gw8fgw8e7fzghwz8efgw8fwzuheihgbweuzf
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.uid', null);
api.node.object.uid = (...args) => {
  return require('./src/node/object/uid.js').call(null, ...args);
};

/**
 * @name        toQueryString
 * @namespace       sugar.node.object
 * @type      Function
 *
 * Transform an object (key => pairs) to a query string like "?var1=value1&var2"
 *
 * @param 		{Object} 		obj 		The object to serialize
 * @return 		{String} 					The query string
 *
 * @example 	js
 * import toQueryString from '@coffeekraken/sugar/node/object/toQueryString'
 * console.log(toQueryString({
 * 	value1 : 'coco',
 * 	value1 : 'plop'
 * }));
 * // => ?value1=coco&value2=plop
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.toQueryString', null);
api.node.object.toQueryString = (...args) => {
  return require('./src/node/object/toQueryString.js').call(null, ...args);
};

/**
 * @name                                sort
 * @namespace                           sugar.node.object
 * @type                                Function
 *
 * Sort an object properties the same way as the Array.sort do it
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @example               js
 * import sortObject from '@coffeekraken/sugar/node/object/sort';
 * sortObject({
 *    coco: { weight: 10 },
 *    lolo: { weight: 2 },
 *    plop: { weight: 5 }
 * }, (a, b) => {
 *   return a.weight - b.weight;
 * });
 * // {
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * //   coco: { weight: 10 }
 * // }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.sort', null);
api.node.object.sort = (...args) => {
  return require('./src/node/object/sort.js').call(null, ...args);
};

/**
 * @name                                        set
 * @namespace                                   sugar.node.object
 * @type                                        Function
 *
 * Set an object value using a dotted object path like "myObject.myProperty.myValue" to set his position
 *
 * @param                         {Object}                         obj                      The object in which to set the value
 * @param                         {String}                        path                      The object path where to set the value
 * @param                         {Mixed}                         value                     The value to set
 * @return                        {Mixed}                                                   Return the setted value if setted correctly, or undefined if something goes wrong...
 *
 * @example               js
 * import set from '@coffeekraken/sugar/node/object/set';
 * set('myObject.cool.value', 'Hello world'); // => Hello world
 *
 */
__ensureExists(api, 'node.object.set', null);
api.node.object.set = (...args) => {
  return require('./src/node/object/set.js').call(null, ...args);
};

/**
 * @name        propertyProxy
 * @namespace       sugar.node.object
 * @type      Function
 *
 * Create a proxy for and object property.
 * This gives you the possibility to process the data of the property
 * when it is getted or setted.
 *
 * @param 		{Object} 		obj 			The object on which to create the proxy
 * @param 		{String} 		property 		The property name that will be proxied
 * @param 		{Object} 		descriptor 		A descriptor object that contains at least a get or a set method, or both
 * @param 		{Boolean} 		[applySetterAtStart=false] 	If need to apply the descriptor setter directly on the current value or not
 *
 * @example 	js
 * import propertyProxy from '@coffeekraken/sugar/node/object/propertyProxy';
 * const myObject = {
 * 		title : 'World'
 * };
 * // create the proxy
 * propertyProxy(myObject, 'title', {
 * 		get : (value) => {
 * 			return `Hello ${value}`;
 * 		},
 * 		set : (value) => {
 * 			return `Youhou ${value}`;
 * 		}
 * });
 * console.log(myObject.title) => 'Hello World';
 * myObject.title = 'Universe';
 * console.log(myObject.title) => 'Hello Youhou Universe';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.propertyProxy', null);
api.node.object.propertyProxy = (...args) => {
  return require('./src/node/object/propertyProxy.js').call(null, ...args);
};

/**
 * @name                map
 * @namespace           sugar.node.object
 * @type                Function
 *
 * This is the same function as the "Array.map" but for objects. It will iterate over all the properties
 * of the passed object and pass the value to your process function. It will then save the property
 * with your processed value
 *
 * @param           {Object}            object          The object to process
 * @param           {Function}          processor       The processor function that will take as parameters the current property value and the property name
 * @return          {Object}                            The processed object
 *
 * @example         js
 * import map from '@coffeekraken/sugar/node/object/map';
 * const myObject = {
 *    hello: 'world',
 *    cat: 'Nelson'
 * };
 * map(myObject, (value, prop) => {
 *    return prop === 'hello' ? 'universe' : value;
 * });
 * {
 *    hello: 'universe',
 *    cat: 'Nelson'
 * }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.map', null);
api.node.object.map = (...args) => {
  return require('./src/node/object/map.js').call(null, ...args);
};

/**
 * @name          getKeyByValue
 * @namespace     sugar.node.object
 * @type          Function
 *
 * Return the key that correspond to the passed value in the passed object
 *
 * @param         {Object}        object        The object in which to search for the value
 * @param         {Mixed}         value         The value to find in the object
 * @return        {String}                      The key of the wanted value or false if not found
 *
 * @example       js
 * import getKeyByValue from '@coffeekraken/sugar/node/object/getKeyByValue';
 * console.log(getKeyByValue({ hello: 'world' }, 'world')); // => hello
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.getKeyByValue', null);
api.node.object.getKeyByValue = (...args) => {
  return require('./src/node/object/getKeyByValue.js').call(null, ...args);
};

/**
 * @name                          get
 * @namespace                     sugar.node.object
 * @type                          Function
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue"
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @example             js
 * import get from '@coffeekraken/sugar/node/object/get';
 * get('myObject.cool.value'); // => 'Hello world'
 *
 */
__ensureExists(api, 'node.object.get', null);
api.node.object.get = (...args) => {
  return require('./src/node/object/get.js').call(null, ...args);
};

/**
 * @name                              flatten
 * @namespace                         sugar.node.object
 * @type                              Function
 *
 * Transform the passed multiple level object into a single level one
 *
 * @param               {Object}                          object                    The object to flatten
 * @param               {String}                          [separation="."]          The separation character to use for preperty names
 * @param 							{Boolean}													[flattenArrays=false] 		Specify if you want to flatten arrays or not
 * @return              {Object}                                                    The flatten object
 *
 * @example             js
 * import flatten from '@coffeekraken/sugar/node/object/flatten';
 * flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.flatten', null);
api.node.object.flatten = (...args) => {
  return require('./src/node/object/flatten.js').call(null, ...args);
};

/**
 * @name                        filter
 * @namespace                   sugar.node.object
 * @type                        Function
 *
 * Allow to filter an object using a function. It works the same as the filter method on the Array object type.
 * The passed filter function will have as parameter each object properties and must return true or false depending if you want the
 * passed property in the filtered object
 *
 * @param               {Object}                object                The object to filter
 * @param               {Function}              filter                The filter function that take as parameter the property itself, and the property name
 * @return              {Object}                                      The filtered object
 *
 * @example           js
 * import filter from '@coffeekraken/sugar/node/object/filter';
 * filter({
 *    coco: 'hello',
 *    plop: true
 * }, (item, name) => typeof item === 'string');
 * // { coco: 'hello' }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.filter', null);
api.node.object.filter = (...args) => {
  return require('./src/node/object/filter.js').call(null, ...args);
};

/**
 * @name                        ensureExists
 * @namespace                   sugar.node.object
 * @type                        Function
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {Object}            obj                           The object on which to check the path existence
 * @param           {String}            path                           The dotted object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @example           js
 * import ensureExists from '@coffeekraken/sugar/node/object/ensureExists';
 * const myObj = { hello: 'world' }«
 * ensureExists(myObj, 'cool.object', {});
 * // { hello: 'world', cool: { object: {} } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.ensureExists', null);
api.node.object.ensureExists = (...args) => {
  return require('./src/node/object/ensureExists.js').call(null, ...args);
};

/**
 * @name                      diff
 * @namespace                 sugar.node.object
 * @type                      Function
 *
 * This function take two objects and return an object that contains only what has been changed between the two.
 * This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff
 *
 * @param         {Object}          object1            The first object used for the diff process
 * @param         {Object}          object2            The second object used for the diff process
 * @param         {Object}          [settings={}]      An object of settings to configure the diff process:
 * - deep (true) {Boolean}: Specify if you want a deep diff or a simple one level diff
 * - added (true) {Boolean}: Specify if you want to include the props that does not exist on the object1 but exists on the object2
 * - deleted (false) {Boolean}: Specify if you want to include the props that exists on the object1 but no more on the object2
 * - equals (false) {Boolean}: Specify if you want to include the props that are equals from the object1 to the object2
 * - emptyObject (false) {Boolean}: Specify if you want to keep the empty objects in the resulting one
 * - updated (true) {Boolean}: Specify if you want to include the updated values
 * @return        {Object}                             The object that contains only the differences between the two
 *
 * @example         js
 * import diff from '@coffeekraken/sugar/node/object/diff';
 * const myObject1 = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * const myObject2 = {
 *    coco: 'plop',
 *    hello: 'hey!',
 *    plop: 'yop'
 * };
 * diff(myObject1, myObject2);
 * {
 *    coco: 'plop',
 *    hello: 'hey!'
 * }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.diff', null);
api.node.object.diff = (...args) => {
  return require('./src/node/object/diff.js').call(null, ...args);
};

/**
 * @name                      delete
 * @namespace                 sugar.node.object
 * @type                      Function
 *
 * Delete an object property using a dotPath like "something.else"
 *
 * @param         {Object}          object            The object on which you want to delete the property
 * @param         {String}          dotPath           The dotpath to the property you want to delete
 *
 * @example         js
 * import delete from '@coffeekraken/sugar/node/object/delete';
 * const myObject = {
 *    hello: 'world',
 *    plop: 'yop'
 * };
 * delete(myObject, 'plop');
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.delete', null);
api.node.object.delete = (...args) => {
  return require('./src/node/object/delete.js').call(null, ...args);
};

/**
 * @name                            deepProxy
 * @namespace                       sugar.node.object
 * @type                            Function
 *
 * This function allows you to add Proxy to an object in deep fashion.
 * Normally the Proxy process only the level on which it has been added. Here we add Proxy to all the
 * object levels and to new properties as well.
 *
 * @param          {Object}                 object            The object on which to add the proxy
 * @param           {Function}                handlerFn       The handler function that will be called with the update object. It can be a property deleted, an array item added, a property updated, etc...:
 * - Object.set: An object property added or updated
 * - Object.delete: An object property deleted
 * - Array.push: An item has been added inside an array
 * - Array.{methodName}: Every array actions
 * @return          {Object}                                  The proxied object
 *
 * @example           js
 * import deepProxy from '@coffeekraken/sugar/node/object/deepProxy';
 * const a = deepProxy({
 *    hello: 'world'
 * }, {
 *    set: (obj) => {
 *      // do something with the update object
 *    }
 * });
 * a.hello = 'coco';
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.deepProxy', null);
api.node.object.deepProxy = (...args) => {
  return require('./src/node/object/deepProxy.js').call(null, ...args);
};

/**
 * @name                              deepMergeErase
 * @namespace                         sugar.node.object
 * @type                              Function
 *
 * This function allows you to tell the deepMerge one to use ONLY the passed value as final value and to not merge it as normal...
 * This seemd maybe a little bit weird but it will be more understandable in the example bellow...
 *
 * @param                 {Object}            obj             The object to keep as final value. It will erase the object of the other object
 * @return                {Object}                            Return the object with the indication that it need to erase the other ones...
 *
 * @example               js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * import deepMergeErase from '@coffeekraken/sugar/node/object/deepMergeErase';
 * const obj1 = {
 *    value: {
 *      hello: 'world',
 *      coco: 'plop'
 *    }
 * };
 * const obj2 = {
 *    value: deepMergeErase({
 *      yop: 'cool value'
 *    })
 * };
 * deepMerge(obj1, obj2);
 * {
 *    value: {
 *      yop: 'cool value'
 *    }
 * }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.deepMergeErase', null);
api.node.object.deepMergeErase = (...args) => {
  return require('./src/node/object/deepMergeErase.js').call(null, ...args);
};

/**
 * @name                deepMerge
 * @namespace           sugar.node.object
 * @type                Function
 *
 * Deep merge one object with another and return the merged object result
 *
 * @param           {Object}            objects...        Pass all the objects you want to merge
 * @return          {Object}                              The merged object result
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.deepMerge', null);
api.node.object.deepMerge = (...args) => {
  return require('./src/node/object/deepMerge.js').call(null, ...args);
};

/**
 * @name        constructorName
 * @namespace       sugar.node.object
 * @type      Function
 *
 * Return the constructor name of the passed object
 *
 * @param 		{Object} 			obj 		The object to get the constructor name from
 * @return 		{String}						The constructor name
 *
 * @example 	js
 * import constructorName from '@coffeekraken/sugar/node/object/constructorName';
 * class MyCoolClass {
 * 		// class implementation...
 * }
 * const myObj = new MyCoolClass();
 * console.log(constructorName(myObj)); => MyCoolClass
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.constructorName', null);
api.node.object.constructorName = (...args) => {
  return require('./src/node/object/constructorName.js').call(null, ...args);
};

/**
 * @name 		            SWatch
 * @namespace           sugar.node.object
 * @type                Class
 *
 * This class allows you to easily monitor some object properties and get the new and old value of it
 *
 * @example 	js
 * // create the watcher instance
 * const watcher = new SWatch();
 *
 * // object to watch
 * let myObject = {
 * 		title : 'Hello World'
 * };
 *
 * // watch the object
 * watcher.watch(myObject, 'title', (newVal, oldVal) => {
 *  	// do something when the title changes
 * });
 *
 * // update the title
 * myObject.title = 'Hello Universe';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.object.SWatch', null);
Object.defineProperty(api.node.object, 'SWatch', {
  get: function () {
    return require('./src/node/object/SWatch.js');
  }
});

/**
 * @name        pad
 * @namespace       sugar.node.number
 * @type      Function
 *
 * Pad a number n of x 0 or another passed character
 *
 * @param    {Number}    number    The number to pad
 * @param    {Integer}    width    The width of pad to apply
 * @param    {String}    [character="0"]    The character to use
 *
 * @example    js
 * import pad from '@coffeekraken/sugar/node/numbers/pad'
 * pad(123, 4) // 0123
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.number.pad', null);
api.node.number.pad = (...args) => {
  return require('./src/node/number/pad.js').call(null, ...args);
};

/**
 * @name        constrain
 * @namespace       sugar.node.number
 * @type      Function
 *
 * Constrain a value between a min and a max value
 *
 * @param    {Number}    value    The value to constraint
 * @param    {Number}    [min=null]    The min value possible
 * @param    {Number}    [max=null]    The max value possible
 * @return    {Number}    The constrained value
 *
 * @example    js
 * import constrain from '@coffeekraken/sugar/node/numbers/constrain'
 * constrain(100, 0, 50) // 50
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.number.constrain', null);
api.node.number.constrain = (...args) => {
  return require('./src/node/number/constrain.js').call(null, ...args);
};

/**
 * @name              warn
 * @namespace         sugar.node.warn
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the warn features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import warn from '@coffeekraken/sugar/node/log/warn';
 * warn('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.warn', null);
api.node.log.warn = (...args) => {
  return require('./src/node/log/warn.js').call(null, ...args);
};

/**
 * @name              log
 * @namespace         sugar.node.log
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the log features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import log from '@coffeekraken/sugar/node/log/log';
 * log('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.log', null);
api.node.log.log = (...args) => {
  return require('./src/node/log/log.js').call(null, ...args);
};

/**
 * @name              info
 * @namespace         sugar.node.info
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the info features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly infoged
 *
 * @example         js
 * import info from '@coffeekraken/sugar/node/log/info';
 * info('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.info', null);
api.node.log.info = (...args) => {
  return require('./src/node/log/info.js').call(null, ...args);
};

/**
 * @name                              mail
 * @namespace                         sugar.node.log.htmlPresets
 * @type                              Function
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for mail formating
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.htmlPresets.mail', null);
api.node.log.htmlPresets.mail = (...args) => {
  return require('./src/node/log/htmlPresets/mail.js').call(null, ...args);
};

/**
 * @name                              files
 * @namespace                         sugar.node.log.htmlPresets
 * @type                              Function
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the files
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.htmlPresets.files', null);
api.node.log.htmlPresets.files = (...args) => {
  return require('./src/node/log/htmlPresets/files.js').call(null, ...args);
};

/**
 * @name                              console
 * @namespace                         sugar.node.log.htmlPresets
 * @type                              Function
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the terminal
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.htmlPresets.console', null);
api.node.log.htmlPresets.console = (...args) => {
  return require('./src/node/log/htmlPresets/console.js').call(null, ...args);
};

/**
 * @name              error
 * @namespace         sugar.node.error
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the error features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import error from '@coffeekraken/sugar/node/log/error';
 * error('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.error', null);
api.node.log.error = (...args) => {
  return require('./src/node/log/error.js').call(null, ...args);
};

/**
 * @name              debug
 * @namespace         sugar.node.debug
 * @type              Function
 *
 * This function is a simple wrapper around the SLog class that let you use the debug features quickly
 *
 * @param           {Mixed}             message           The message to log
 * @return          {Promise}                             A promise resolved once your message has been correctly logged
 *
 * @example         js
 * import debug from '@coffeekraken/sugar/node/log/debug';
 * debug('Hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.debug', null);
api.node.log.debug = (...args) => {
  return require('./src/node/log/debug.js').call(null, ...args);
};

/**
 * @name                    SLogFilesAdapter
 * @namespace               sugar.js.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily and store them in some files where you want on your file system.
 *
 * @example               js
 * conse SLog = require('@coffeekraken/sugar/js/log/SLog');
 * const SLogFilesAdapter = require('@coffeekraken/sugar/node/log/adapters/SLogFilesAdapter');
 * const logger = new SLog({
 *    adapters: [
 *      new SLogFilesAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'js.log.SLogFilesAdapter', null);
Object.defineProperty(api.js.log, 'SLogFilesAdapter', {
  get: function () {
    return require('./src/node/log/adapters/SLogFilesAdapter.js');
  }
});

/**
 * @name                    SLogConsoleAdapter
 * @namespace               sugar.node.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
 * "mail", "slack", etc...
 *
 * @example               js
 * import SLog from '@coffeekraken/sugar/node/log/SLog';
 * import SLogConsoleAdapter from '@coffeekraken/sugar/js/log/adapters/SLogConsoleAdapter';
 * const logger = new SLog({
 *    adapters: [
 *      new SLogConsoleAdapter()
 *    ]
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.adapters.SLogConsoleAdapter', null);
Object.defineProperty(api.node.log.adapters, 'SLogConsoleAdapter', {
  get: function () {
    return require('./src/node/log/adapters/SLogConsoleAdapter.js');
  }
});

/**
 * @name                    SLog
 * @namespace               sugar.node.log
 * @type                    Class
 *
 * This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
 * "mail", "slack", etc...
 *
 * @example               js
 * import SLog from '@coffeekraken/sugar/node/log/SLog';
 * import SLogConsoleAdapter from '@coffeekraken/sugar/js/log/adapters/SLogConsoleAdapter';
 * const logger = new SLog({
 *    adapters: {
 *      console: new SLogConsoleAdapter()
 *    }
 * });
 * logger.log('Something cool happend...');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.log.SLog', null);
Object.defineProperty(api.node.log, 'SLog', {
  get: function () {
    return require('./src/node/log/SLog.js');
  }
});

/**
 * @name        isYyyymmddDate
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if is a valid yyyy.mm.dd date
 * This will match : yyyy.mm.dd | yyyy/mm/dd | yyyy-mm-dd | yyyy mm dd
 *
 * @param    {String}    date    The date to check
 * @return    {Boolean}    true if is valid, false if not
 *
 * @example    js
 * import isYyyymmddDate from '@coffeekraken/sugar/node/is/yyyymmddDate'
 * if (isYyyymmddDate('2018.12.25')) {
 *     // do something cool
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isYyyymmddDate', null);
api.node.is.isYyyymmddDate = (...args) => {
  return require('./src/node/is/yyyymmddDate.js').call(null, ...args);
};

/**
 * @name                            windows
 * @namespace                       sugar.node.is
 * @type                            Function
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/node/is/windows';
 * isWindows(); // => true
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.windows', null);
api.node.is.windows = (...args) => {
  return require('./src/node/is/windows.js').call(null, ...args);
};

/**
 * @name        isUrl
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a valid url
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isUrl from '@coffeekraken/sugar/node/is/url';
 * isUrl('http://google.com') => true
 * isUrl('ftp://web.coco.com:2222') => true
 * isUrl('hello') => false
 */
__ensureExists(api, 'node.is.isUrl', null);
api.node.is.isUrl = (...args) => {
  return require('./src/node/is/url.js').call(null, ...args);
};

/**
 * @name        isUcBrowser
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is the UC stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example    js
 * import isUcBrowser from '@coffeekraken/sugar/node/is/ucBrowser'
 * if (isUcBrowser()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isUcBrowser', null);
api.node.is.isUcBrowser = (...args) => {
  return require('./src/node/is/ucBrowser.js').call(null, ...args);
};

/**
 * @name        isTablet
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is a tablet device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @return    {Boolean}    true if is a tablet, false if not
 *
 * @example 	js
 * import isTablet from '@coffeekraken/sugar/node/is/tablet'
 * if (isTablet()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isTablet', null);
api.node.is.isTablet = (...args) => {
  return require('./src/node/is/tablet.js').call(null, ...args);
};

/**
 * @name        isString
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a js String
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a String, false if not
 *
 * @example    js
 * import isString from '@coffeekraken/sugar/node/is/String'
 * if (isString({}) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isString', null);
api.node.is.isString = (...args) => {
  return require('./src/node/is/string.js').call(null, ...args);
};

/**
 * @name        isSamsumgBrowser
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is the samsung stock browser that is running the page
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example    js
 * import isSamsumgBrowser from '@coffeekraken/sugar/node/is/samsungBrowser'
 * if (isSamsumgBrowser()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isSamsumgBrowser', null);
api.node.is.isSamsumgBrowser = (...args) => {
  return require('./src/node/is/samsungBrowser.js').call(null, ...args);
};

/**
 * @name        isSafari
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is safari
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isSafari from '@coffeekraken/sugar/node/is/safari'
 * if (isSafari()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is safari, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isSafari', null);
api.node.is.isSafari = (...args) => {
  return require('./src/node/is/safari.js').call(null, ...args);
};

/**
 * @name        isRegexp
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a js Regexp
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Regexp}   true if it's a Regexp, false if not
 *
 * @example    js
 * import isRegexp from '@coffeekraken/sugar/node/is/regexp'
 * if (isRegexp(/^hello$/g) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isRegexp', null);
api.node.is.isRegexp = (...args) => {
  return require('./src/node/is/regexp.js').call(null, ...args);
};

/**
 * @name                      plainObject
 * @namespace                 sugar.node.is
 * @type                      Function
 *
 * Check if the passed object (or array of objects) is/are plain object(s)
 *
 * @param         {Object|Array}            object                  The object(s) to check
 * @return        {Boolean}                                         true if is plain object(s), false if not
 *
 * @example           js
 * const isPlainObject = require('@coffeekraken/sugar/node/is/plainObject');
 * isPlainObject({ hello: 'world'}); // => true
 *
 * @see       https://www.npmjs.com/package/is-plain-object
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.plainObject', null);
api.node.is.plainObject = (...args) => {
  return require('./src/node/is/plainObject.js').call(null, ...args);
};

/**
 * @name        isPhone
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is a phone device
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @return    {Boolean}    true if is a phone, false if not
 *
 * @example 	js
 * import isPhone from '@coffeekraken/sugar/node/is/phone'
 * if (isPhone()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isPhone', null);
api.node.is.isPhone = (...args) => {
  return require('./src/node/is/phone.js').call(null, ...args);
};

/**
 * @name                            path
 * @namespace                       sugar.node.is
 * @type                            Function
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @example       js
 * const isPath = require('@coffeekraken/sugar/node/is/path');
 * isPath('hello/world'); // => true
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.path', null);
api.node.is.path = (...args) => {
  return require('./src/node/is/path.js').call(null, ...args);
};

/**
 * @name                            osx
 * @namespace                       sugar.node.is
 * @type                            Function
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/node/is/osx';
 * isOsx(); // => true
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.osx', null);
api.node.is.osx = (...args) => {
  return require('./src/node/is/osx.js').call(null, ...args);
};

/**
 * @name        isOpera
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is opera
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isOpera from '@coffeekraken/sugar/node/is/opera'
 * if (isOpera()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is opera, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isOpera', null);
api.node.is.isOpera = (...args) => {
  return require('./src/node/is/opera.js').call(null, ...args);
};

/**
 * @name        isOdd
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if a number is odd or not
 *
 * @param    {Number}    value    The value to check
 * @return    {Boolean}    true if odd, false if not
 *
 * @example    js
 * import isOdd from '@coffeekraken/sugar/node/is/odd'
 * isOdd(1) // true
 * isOdd(2) // false
 */
__ensureExists(api, 'node.is.isOdd', null);
api.node.is.isOdd = (...args) => {
  return require('./src/node/is/odd.js').call(null, ...args);
};

/**
 * @name        isObject
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a js object
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a object, false if not
 *
 * @example    js
 * import isObject from '@coffeekraken/sugar/node/is/object'
 * if (isObject({}) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isObject', null);
api.node.is.isObject = (...args) => {
  return require('./src/node/is/object.js').call(null, ...args);
};

/**
 * @name        isNumber
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a number
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isNumber from '@coffeekraken/sugar/node/is/number';
 * isNumber(12) => true
 * isNumber(22.3) => true
 * isNumber('20') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isNumber', null);
api.node.is.isNumber = (...args) => {
  return require('./src/node/is/number.js').call(null, ...args);
};

/**
 * @name                                      isNode
 * @namespace                                 sugar.node.is
 * @type                                      Function
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @example               js
 * import isNode from '@coffeekraken/sugar/node/is/node';
 * isNode(); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isNode', null);
api.node.is.isNode = (...args) => {
  return require('./src/node/is/node.js').call(null, ...args);
};

/**
 * @name        isMobile
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is a mobile device (phone or tablet)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test *
 * @return    {Boolean}    true if is a mobile, false if not
 *
 * @example 	js
 * import isMobile from 'coffeekraken-sugar/node/is/mobile'
 * if (isMobile()) {
 *   // do something cool...
 * }
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isMobile', null);
api.node.is.isMobile = (...args) => {
  return require('./src/node/is/mobile.js').call(null, ...args);
};

/**
 * @name        isMmddyyyyDate
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if is a valid mm.dd.yyyy date
 * This will match : mm.dd.yyyy | mm/dd/yyyy | mm-dd-yyyy | mm dd yyyy
 *
 * @param    {String}    date    The date to check
 * @return    {Boolean}    true if is valid, false if not
 *
 * @example    js
 * import isMmddyyyyDate from '@coffeekraken/sugar/node/is/mmddyyyyDate'
 * if (isMmddyyyyDate('12.25.2018')) {
 *     // do something cool
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isMmddyyyyDate', null);
api.node.is.isMmddyyyyDate = (...args) => {
  return require('./src/node/is/mmddyyyyDate.js').call(null, ...args);
};

/**
 * @name                            linux
 * @namespace                       sugar.node.is
 * @type                            Function
 *
 * Check if the app run on linux
 *
 * @return        {Boolean}                             true if linux, false if not
 *
 * @example       js
 * import isLinux from '@coffeekraken/sugar/node/is/linux';
 * isLinux(); // => true
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.linux', null);
api.node.is.linux = (...args) => {
  return require('./src/node/is/linux.js').call(null, ...args);
};

/**
 * @name        isJson
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a valid json
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a valid json, false if not
 *
 * @example    js
 * import isJson from '@coffeekraken/sugar/node/is/json'
 * if (isJson('[{id:10}]')) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isJson', null);
api.node.is.isJson = (...args) => {
  return require('./src/node/is/json.js').call(null, ...args);
};

/**
 * @name                                      isJs
 * @namespace                                 sugar.node.is
 * @type                                      Function
 *
 * Check if the current script is running under javascript runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @example               js
 * import isJs from '@coffeekraken/sugar/node/is/js';
 * isJs(); // => true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isJs', null);
api.node.is.isJs = (...args) => {
  return require('./src/node/is/js.js').call(null, ...args);
};

/**
 * @name        isInteger
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is an integer
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isInteger from '@coffeekraken/sugar/node/is/integer';
 * isInteger(10) => true
 * isInteger('hello') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isInteger', null);
api.node.is.isInteger = (...args) => {
  return require('./src/node/is/integer.js').call(null, ...args);
};

/**
 * @name        isIe
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is ie (internet explorer)
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isIe from '@coffeekraken/sugar/node/is/ie'
 * if (isIe()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is ie, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isIe', null);
api.node.is.isIe = (...args) => {
  return require('./src/node/is/ie.js').call(null, ...args);
};

/**
 * @name        isFunction
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a js function
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a function, false if not
 *
 * @example    js
 * import isFunction from '@coffeekraken/sugar/node/is/function'
 * if (isFunction(function() {})) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isFunction', null);
api.node.is.isFunction = (...args) => {
  return require('./src/node/is/function.js').call(null, ...args);
};

/**
 * @name        isFirefox
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is firefox
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isFirefox from '@coffeekraken/sugar/node/is/firefox'
 * if (isFirefox()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is firefox, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isFirefox', null);
api.node.is.isFirefox = (...args) => {
  return require('./src/node/is/firefox.js').call(null, ...args);
};

/**
 * @name        isEven
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if a number is even or not
 *
 * @param    {Number}    value    The value to check
 * @return    {Boolean}    true if even, false if not
 *
 * @example    js
 * import isEven from '@coffeekraken/sugar/node/is/even'
 * isEven(1) // false
 * isEven(2) // true
 */
__ensureExists(api, 'node.is.isEven', null);
api.node.is.isEven = (...args) => {
  return require('./src/node/is/even.js').call(null, ...args);
};

/**
 * @name        isEmail
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a valid email address
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isEmail from '@coffeekraken/sugar/node/is/email';
 * isEmail('john.doe@gmail.com') => true
 * isEmail('plop@yop.com') => true
 * isEmail('hello') => false
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isEmail', null);
api.node.is.isEmail = (...args) => {
  return require('./src/node/is/email.js').call(null, ...args);
};

/**
 * @name        isEdge
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is edge
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isEdge from '@coffeekraken/sugar/node/is/edge'
 * if (isEdge()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is edge, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isEdge', null);
api.node.is.isEdge = (...args) => {
  return require('./src/node/is/edge.js').call(null, ...args);
};

/**
 * @name        isDdmmyyyyDate
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if is a valid dd.mm.yyyy date
 * This will match : dd.mm.yyyy | dd/mm/yyyy | dd-mm-yyyy | dd mm yyyy
 *
 * @param    {String}    date    The date to check
 * @return    {Boolean}    true if is valid, false if not
 *
 * @example    js
 * import isDdmmyyyyDate from '@coffeekraken/sugar/node/is/ddmmyyyyDate'
 * if (isDdmmyyyyDate('20.12.2018')) {
 *     // do something cool
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isDdmmyyyyDate', null);
api.node.is.isDdmmyyyyDate = (...args) => {
  return require('./src/node/is/ddmmyyyyDate.js').call(null, ...args);
};

/**
 * @name        isColor
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a color
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @example 	js
 * import isColor from '@coffeekraken/sugar/node/is/color';
 * isColor('red') => true
 * isColor('#fff') => true
 * isColor('hello') => false
 *
 * @see 		http://stackoverflow.com/questions/6386090/validating-css-color-names
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isColor', null);
api.node.is.isColor = (...args) => {
  return require('./src/node/is/color.js').call(null, ...args);
};

/**
 * @name                      class
 * @namespace                 sugar.node.is
 * @type                      Function
 *
 * Check if the passed variable (or array of variables) is/are plain variable(s)
 *
 * @param         {Mixed|Array}            variable                  The variable(s) to check
 * @return        {Boolean}                                         true if is class(es), false if not
 *
 * @example           js
 * import isClass = from '@coffeekraken/sugar/node/is/class';
 * isClass({ hello: 'world'}); // => false
 * const myCoolClass = class Coco{};
 * isClass(myCoolClass); // => true
 *
 * @see       https://www.npmjs.com/package/is-class
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.class', null);
api.node.is.class = (...args) => {
  return require('./src/node/is/class.js').call(null, ...args);
};

/**
 * @name        isChrome
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Detect if is chrome
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isChrome from '@coffeekraken/sugar/node/is/chrome'
 * if (isChrome()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is chrome, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isChrome', null);
api.node.is.isChrome = (...args) => {
  return require('./src/node/is/chrome.js').call(null, ...args);
};

/**
 * @name        isBoolean
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a js Boolean
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @example    js
 * import isBoolean from '@coffeekraken/sugar/node/is/boolean'
 * if (isBoolean(true) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isBoolean', null);
api.node.is.isBoolean = (...args) => {
  return require('./src/node/is/boolean.js').call(null, ...args);
};

/**
 * @name        isBase64
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a base 64 string
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @example    js
 * import isBase64 from '@coffeekraken/sugar/node/is/base64'
 * if (isBase64(true) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isBase64', null);
api.node.is.isBase64 = (...args) => {
  return require('./src/node/is/base64.js').call(null, ...args);
};

/**
 * @name        isArray
 * @namespace       sugar.node.is
 * @type      Function
 *
 * Check if the passed value is a js Array
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Array, false if not
 *
 * @example    js
 * import isArray from '@coffeekraken/sugar/node/is/array'
 * if (isArray([]) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.is.isArray', null);
api.node.is.isArray = (...args) => {
  return require('./src/node/is/array.js').call(null, ...args);
};

/**
 * @name                              request
 * @namespace                          sugar.node.http
 * @type                              Function
 *
 * Easily create and send an http request. This will return an instance of the SAjax class.
 *
 * @param           {Object}              [settings={}]             The request settings. This support these settings and all the axio ones:
 * - url (null) {String}: The url on which to make the request
 * - baseURL (null) {String}: The base url on which to make the request.
 * - method (get) {String}: The method with the one to make the request. Can be GET,DELETE,HEAD,OPTIONS,POST,PUT,PATCH
 * - headers ({}) {Object}: An object to send through the headers
 * - params ({}) {Object}: Specify some params to be sent through the URL. Must be a plain object or a URLSearchParams object
 * - data ({}) {Object}: Specify some data you want to send with the request. This setting is available only for 'PUT', 'POST', and 'PATCH' requests...
 * - timeout (0) {Number}: Specify time to wait before aborting the actual request. If setted in number format, this will mean milliseconds. You can also specify this settings using string format like so: '2s', '1h', '4m', etc...
 * - sendInterval (1000) {Number}: Set the interval time between each requests if the sendCount setting is specified. If setted in number format, this is taken as millisenconds. You can also set the interval in string format like '34s', '1h', '10ms', '2d', etc...
 * - sendCount (1) {Number}: Set how many times the request has to be sent
 * - responseType (json) {String}: Indicates the type of data that the server will respond with
 *
 * @example               js
 * import request from '@coffeekraken/sugar/node/http/request';
 * request({
 *    url: 'https://api.github.com/something/cool',
 *    method: 'get'
 * }).then(response => {
 *    // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.http.request', null);
api.node.http.request = (...args) => {
  return require('./src/node/http/request.js').call(null, ...args);
};

/**
 * @name 	              	SRequestConfig
 * @namespace              sugar.node.http
 * @type                  Class
 *
 * Class that represent an ajax request that will be passed to an SRequest instance.
 * All the axios settings are supported by this class
 *
 * @example 	js
 * const request = new SRequestConfig({
 *  	url : '/api/...',
 *  	method : 'GET',
 *  	data : {
 *  		myVar : 'myVal'
 *  	}
 * });
 *
 * @see       https://github.com/axios/axios
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
__ensureExists(api, 'node.http.SRequestConfig', null);
Object.defineProperty(api.node.http, 'SRequestConfig', {
  get: function () {
    return require('./src/node/http/SRequestConfig.js');
  }
});

/**
 * @name 		                    SRequest
 * @namespace                   sugar.node.http
 * @type                        Class
 *
 * Class that allows to simply handle ajax requests with ease.
 * This class give some useful features like :
 * - Promise support
 * - Recursive requests
 *
 * @example 	js
 * const request = new SRequest({
 * 		url : 'api/...',
 * 		method : 'GET',
 * 		data : {
 * 			myVar : 'myVal'
 * 		}
 * });
 *
 * // send and listen for data
 * request.send().then((response) => {
 * 		// do something with response here...
 * }).catch((error) => {
 * 		// something went wrong...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.http.SRequest', null);
Object.defineProperty(api.node.http, 'SRequest', {
  get: function () {
    return require('./src/node/http/SRequest.js');
  }
});

/**
 * @name            toString
 * @namespace       sugar.node.html
 * @type      Function
 *
 * Return the string version of a dom node or the dom node and his children
 *
 * @param    {HTMLElement}    html    The HTMLElement to convert to string
 * @param    {Boolean}    [deep=true]    Include or not his children
 * @return    {String}    The string version of the dom node
 *
 * @example    js
 * import toString from '@coffeekraken/sugar/node/string/toString'
 * const myDomNode = document.querySelector('.my-dom-node')
 * toString(myDomNode, false) // <div class="my-dom-node"></div>
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.html.toString', null);
api.node.html.toString = (...args) => {
  return require('./src/node/html/toString.js').call(null, ...args);
};

/**
 * @name        striptags
 * @namespace       sugar.node.html
 * @type      Function
 *
 * Strip tags of an html string.
 * This is a simple wrapper of the nice "striptags" package that you can find here: https://www.npmjs.com/package/striptags
 *
 * @param    {String}    html    The html string to process
 * @param    {String}    allowableTags    The tags that are allowed like <h1><h2>...
 * @param     {String}    tagReplacement    A string with which you want to replace the tags
 * @return    {String}    The processed string without tags
 *
 * @example    js
 * import striptags from '@coffeekraken/sugar/node/string/striptags'
 * striptags('<p><span>Hello</span> world</p>', '<span>') // <span>Hello</span> world
 *
 * @see       https://www.npmjs.com/package/striptags
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.html.striptags', null);
api.node.html.striptags = (...args) => {
  return require('./src/node/html/striptags.js').call(null, ...args);
};

/**
 * @name                            replaceTags
 * @namespace                       sugar.node.html
 * @type                            Function
 *
 * Replace all the html tags that you specify by something else that you can fully choose
 *
 * @param               {String}                 text                           The text in which replace all the tags
 * @param               {Object}                 tags                           An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content
 * @return              {String}                                                The new text
 *
 * @example             js
 * import replaceTags from '@coffeekraken/sugar/node/html/replaceTags';
 * replaceTags('<span>Hello</span> world', {
 *    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.html.replaceTags', null);
api.node.html.replaceTags = (...args) => {
  return require('./src/node/html/replaceTags.js').call(null, ...args);
};

/**
 * @name 		                SGoogleCustomSearch
 * @namespace               sugar.node.google
 * @type                    Class
 *
 * This class let you make with ease search requests to the google custom search service
 * with useful features like:
 * - Simple pagination system
 * - Promise support
 *
 * @example 	            js
 * // create a google search instance
 * const googleSearch = new SGoogleCustomSearch('myApiKey', 'myCustomSearchContextKey');
 *
 * // make a search...
 * googleSearch.search('hello world').then((response) => {
 * 		// do something with the google response...
 * });
 *
 * // get the nexts results
 * googleSearch.next().then((response) => {
 * 		// do something with the new response...
 * });
 *
 * @see 		https://developers.google.com/custom-search/
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
__ensureExists(api, 'node.google.SGoogleCustomSearch', null);
Object.defineProperty(api.node.google, 'SGoogleCustomSearch', {
  get: function () {
    return require('./src/node/google/SGoogleCustomSearch.js');
  }
});

/**
 * @name 		distanceBetween
 * @namespace       sugar.node.geom.2d
 * @type      Function
 *
 * Get the distance between two points
 *
 * @param    {Point}    point1    The point 1, x and y value
 * @param    {Point}    point2    The point 2, x and y value
 * @return    {Number}    The distance between the two points
 *
 * @example    js
 * import distanceBetween from '@coffeekraken/sugar/node/geom/2d/distanceBetween'
 * distanceBetween({
 * 	x: 10, y: 20
 * }, {
 * 	x: 10, y: 30
 * }) // 10
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.geom.distanceBetween', null);
api.node.geom.distanceBetween = (...args) => {
  return require('./src/node/geom/distanceBetween.js').call(null, ...args);
};

/**
 * @name 		circleConstrain
 * @namespace       sugar.node.geom.2d
 * @type      Function
 *
 * Take as parameter a central point, a radius and a points to constrain inside the circle defined by the radius
 *
 * @param    {Vector2}    center    The center point of the circle
 * @param    {Number}    radius    The radius to constrain the point in
 * @param    {Vector2}    point    The point to constrain
 * @return    {Vector2}    The new constrained value for the point
 *
 * @example    js
 * import circleConstrain from '@coffeekraken/sugar/node/geom/2d/circleConstrain'
 * circleConstrain({
 * 	x: 10, y: 10
 * }, 10, {
 * 	x: 10, y: 5
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://stackoverflow.com/questions/8515900/how-to-constrain-movement-within-the-area-of-a-circle
 */
__ensureExists(api, 'node.geom.circleConstrain', null);
api.node.geom.circleConstrain = (...args) => {
  return require('./src/node/geom/circleConstrain.js').call(null, ...args);
};

/**
 * @name        throttle
 * @namespace       sugar.node.function
 * @type      Function
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called once each threshhold time
 *
 * @example 		js
 * import throttle from '@coffeekraken/sugar/node/function/throttle';
 * const myThrottledFn = throttle(() => {
 * 		// my function content that will be
 * 		// executed only once each second
 * }, 1000);
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my throttled function
 * 		myThrottledFn();
 * });
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.function.throttle', null);
api.node.function.throttle = (...args) => {
  return require('./src/node/function/throttle.js').call(null, ...args);
};

/**
 * @name        debounce
 * @namespace       sugar.node.function
 * @type      Function
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called only once after
 * the delay passed
 *
 * @example 		js
 * import debounce from '@coffeekraken/sugar/node/function/debounce';
 * const myDebouncedFn = debounce(() => {
 * 		// my function content that will be
 * 		// executed only once after the 1 second delay
 * }, 1000);
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my debounced function
 * 		myDebouncedFn();
 * });
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.function.debounce', null);
api.node.function.debounce = (...args) => {
  return require('./src/node/function/sleep.js').call(null, ...args);
};

/**
 * @name        setRecursiveTimeout
 * @namespace       sugar.node.function
 * @type      Function
 *
 * This utils function allows you to call a passed function each x time during a certain duration
 *
 * @param 		{Function} 		fn 				The function to execute
 * @param 		{Number} 		timeout 		The time between each execution
 * @param 		{Number} 		duration 		The duration of the timeout
 * @param 		{Number}		[spread=0] 		An optional spread time that will be used to randomize the function executions times
 * @return 		{Function} 		       		A function that you can use to clear the timeout before it ends by itself
 *
 * @example 		js
 * import setRecursiveTimeout from '@coffeekraken/sugar/node/function/setRecursiveTimeout';
 * setRecursiveTimeout(() => {
 * 		// I will be executed 10 times
 * }, 1000, 10000);
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.function.setRecursiveTimeout', null);
api.node.function.setRecursiveTimeout = (...args) => {
  return require('./src/node/function/setRecursiveTimeout.js').call(
    null,
    ...args
  );
};

/**
 * @name        debounce
 * @namespace       sugar.node.function
 * @type      Function
 *
 * This utils function allows you to make sure that a function that will normally be called
 * several times, for example during a scroll event, to be called only once after
 * the delay passed
 *
 * @example 		js
 * import debounce from '@coffeekraken/sugar/node/function/debounce';
 * const myDebouncedFn = debounce(() => {
 * 		// my function content that will be
 * 		// executed only once after the 1 second delay
 * }, 1000);
 *
 * document.addEventListener('scroll', (e) => {
 * 		// call my debounced function
 * 		myDebouncedFn();
 * });
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.function.debounce', null);
api.node.function.debounce = (...args) => {
  return require('./src/node/function/debounce.js').call(null, ...args);
};

/**
 * @name        writeJsonSync
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJsonSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @example       js
 * const writeJsonSync = require('@coffeekraken/node/fs/writeJsonSync');
 * try {
 *    writeJsonSync('my/cool/file.json', { hello: 'world' });
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.writeJsonSync', null);
api.node.fs.writeJsonSync = (...args) => {
  return require('./src/node/fs/writeJsonSync.js').call(null, ...args);
};

/**
 * @name        writeJson
 * @namespace     sugar.node.fs
 * @type          Function
 * @async
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeJson is completed
 *
 * @example       js
 * const writeJson = require('@coffeekraken/node/fs/writeJson');
 * writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.writeJson', null);
api.node.fs.writeJson = (...args) => {
  return require('./src/node/fs/writeJson.js').call(null, ...args);
};

/**
 * @name        writeFileSync
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Write a file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @example       js
 * const writeFileSync = require('@coffeekraken/node/fs/writeFileSync');
 * try {
 *    writeFileSync('my/cool/file.txt', 'Hello World');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.writeFileSync', null);
api.node.fs.writeFileSync = (...args) => {
  return require('./src/node/fs/writeFileSync.js').call(null, ...args);
};

/**
 * @name        writeFile
 * @namespace     sugar.node.fs
 * @type          Function
 * @async
 *
 * CWrite a file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeFile is completed
 *
 * @example       js
 * const writeFile = require('@coffeekraken/node/fs/writeFile');
 * writeFile('my/cool/file.txt', 'Hello World').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.writeFile', null);
api.node.fs.writeFile = (...args) => {
  return require('./src/node/fs/writeFile.js').call(null, ...args);
};

/**
 * @name                            tmpDir
 * @namespace                       sugar.node.fs
 * @type                            Function
 *
 * Return the os temp directory path
 *
 * @return                {String}                      The real os temp directory path
 *
 * @example             js
 * const tmpDir = require('@coffeekraken/node/fs/tmpDir');
 * tmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @see       https://www.npmjs.com/package/temp-dir
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.tmpDir', null);
api.node.fs.tmpDir = (...args) => {
  return require('./src/node/fs/tmpDir.js').call(null, ...args);
};

/**
 * @name        removeSync
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (sync)
 *
 * @param       {String}              path           The file/directory path to delete
 *
 * @example       js
 * const removeSync = require('@coffeekraken/node/fs/removeSync');
 * try {
 *    removeSync('my/cool/file.json');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.removeSync', null);
api.node.fs.removeSync = (...args) => {
  return require('./src/node/fs/removeSync.js').call(null, ...args);
};

/**
 * @name        remove
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (async)
 *
 * @param       {String}              path           The file/directory path to delete
 * @return      {Promise}                           A promise that will be resolved when the remove is completed
 *
 * @example       js
 * const remove = require('@coffeekraken/node/fs/remove');
 * remove('my/cool/file.json').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.remove', null);
api.node.fs.remove = (...args) => {
  return require('./src/node/fs/remove.js').call(null, ...args);
};

/**
 * @name        moveSync
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Moves a file or directory, even across devices (sync)
 *
 * @param       {String}              src           The source path to moveSync
 * @param       {String}              dest          The destination path
 *
 * @example       js
 * const moveSync = require('@coffeekraken/node/fs/moveSync');
 * try {
 *    moveSync('my/cool/dir', 'another/place/for/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.moveSync', null);
api.node.fs.moveSync = (...args) => {
  return require('./src/node/fs/moveSync.js').call(null, ...args);
};

/**
 * @name        move
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Moves a file or directory, even across devices (async)
 *
 * @param       {String}              src           The source path to move
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved once the file/directory has been moved...
 *
 * @example       js
 * const move = require('@coffeekraken/node/fs/move');
 * move('my/cool/dir', 'another/place/for/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.move', null);
api.node.fs.move = (...args) => {
  return require('./src/node/fs/move.js').call(null, ...args);
};

/**
 * @name                            isPath
 * @namespace                       sugar.node.fs
 * @type                            Function
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @example       js
 * const isPath = require('@coffeekraken/sugar/node/fs/isPath');
 * isPath('hello/world'); // => true
 *
 * @see       https://www.npmjs.com/package/is-valid-path
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.isPath', null);
api.node.fs.isPath = (...args) => {
  return require('./src/node/fs/isPath.js').call(null, ...args);
};

/**
 * @name                                    formatFileSize
 * @namespace                               sugar.node.fs
 * @type                                    Function
 *
 * Transform into human readable string a file size from a number (float or integer) or string.
 * This function use the wonderfull "filesize" npm package under the houd.
 *
 * @param               {Number|String}             size              The size to transform
 * @param               {Object}                    [settings={}]     The "filesize" settings to customize the output
 * @return              {String}                                      The human readable version of the passed size
 *
 * @example             js
 * const formatFilesize = require('@coffeekraken/sugar/node/fs/formatFileSize');
 * formatFileSize(163931); // => 326.86 KB
 *
 * @see             https://www.npmjs.com/package/filesize
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.formatFileSize', null);
api.node.fs.formatFileSize = (...args) => {
  return require('./src/node/fs/formatFileSize.js').call(null, ...args);
};

/**
 * @name                            folderSize
 * @namespace                       sugar.node.fs
 * @type                            Function
 * @async
 *
 * Calculate the size of the passed folder and return it through a promise, either in raw format, either in human readdable one...
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
 * @param             {Boolean}               [rawFormat=false]           If true, will return the folder size in raw format
 * @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
 *
 * @example           js
 * const folderSize = require('@coffeekraken/sugar/node/fs/folderSize');
 * folderSize('my/cool/folder').then((size) => {
 *      // do something...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.folderSize', null);
api.node.fs.folderSize = (...args) => {
  return require('./src/node/fs/folderSize.js').call(null, ...args);
};

/**
 * @name                       filename
 * @namespace                   sugar.node.fs
 * @type                        Function
 *
 * Return the filename from the passed path with or without the extension
 *
 * @param           {String}              path              The path to take the filename from
 * @param           {Boolean}             [withExtension=true]        Tell if we want the filename with or without the extension
 * @return          {String}                                  The requested filename
 *
 * @example       js
 * const filename = require('@coffeekraken/sugar/node/fs/filename');
 * filename('hello/world.js'); // => world.js
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.filename', null);
api.node.fs.filename = (...args) => {
  return require('./src/node/fs/filename.js').call(null, ...args);
};

/**
 * @name                    extension
 * @namespace               sugar.node.fs
 * @type                    Function
 *
 * Return the passed file path extension
 *
 * @param           {String}            path                The file path to get the extension from
 * @return          {String}                                The file extension
 *
 * @example         js
 * const extension = require('@coffeekraken/sugar/node/fs/extension');
 * extension('hello/world.jpg'); // => jpg
 *
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.extension', null);
api.node.fs.extension = (...args) => {
  return require('./src/node/fs/extension.js').call(null, ...args);
};

/**
 * @name        ensureFileSync
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Ensure that the passed file exists. If not, will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 *
 * @example       js
 * const ensureFileSync = require('@coffeekraken/node/fs/ensureFileSync');
 * try {
 *    ensureFileSync('my/cool/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.ensureFileSync', null);
api.node.fs.ensureFileSync = (...args) => {
  return require('./src/node/fs/ensureFileSync.js').call(null, ...args);
};

/**
 * @name        ensureFile
 * @namespace     sugar.node.fs
 * @type          Function
 * @async
 *
 * Ensure that the passed file exists. If not, it will be created... (async)
 *
 * @param       {String}              file           The file to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the file has been created if needed...
 *
 * @example       js
 * const ensureFile = require('@coffeekraken/node/fs/ensureFile');
 * ensureFile('my/cool/file.jpg').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.ensureFile', null);
api.node.fs.ensureFile = (...args) => {
  return require('./src/node/fs/ensureFile.js').call(null, ...args);
};

/**
 * @name        ensureDirSync
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (sync)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @example       js
 * const ensureDirSync = require('@coffeekraken/node/fs/ensureDirSync');
 * try {
 *    ensureDirSync('my/cool/dir');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.ensureDirSync', null);
api.node.fs.ensureDirSync = (...args) => {
  return require('./src/node/fs/ensureDirSync.js').call(null, ...args);
};

/**
 * @name        ensureDir
 * @namespace     sugar.node.fs
 * @type          Function
 * @async
 *
 * Ensure that the passed directory exists. If not, will be created recursively... (async)
 *
 * @param       {String}              dir           The directory to ensure that it exists...
 * @return      {Promise}                           A promise that will be resolved once the directory has been created if needed...
 *
 * @example       js
 * const ensureDir = require('@coffeekraken/node/fs/ensureDir');
 * ensureDir('my/cool/dir').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.ensureDir', null);
api.node.fs.ensureDir = (...args) => {
  return require('./src/node/fs/ensureDir.js').call(null, ...args);
};

/**
 * @name        emptyDirSync
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Empty a directory (sync)
 *
 * @param       {String}              dir           The directory path to empty
 *
 * @example       js
 * const emptyDirSync = require('@coffeekraken/node/fs/emptyDirSync');
 * try {
 *    emptyDirSync('my/cool/directory');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.emptyDirSync', null);
api.node.fs.emptyDirSync = (...args) => {
  return require('./src/node/fs/emptyDirSync.js').call(null, ...args);
};

/**
 * @name        emptyDir
 * @namespace     sugar.node.fs
 * @type          Function
 * @async
 *
 * Empty a directory (async)
 *
 * @param       {String}              dir           The directory path to empty
 * @return      {Promise}                           A promise that will be resolved once the directory has been cleaned
 *
 * @example       js
 * const emptyDir = require('@coffeekraken/node/fs/emptyDir');
 * emptyDir('my/cool/directory').then(() => {
 *    // do something...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.emptyDir', null);
api.node.fs.emptyDir = (...args) => {
  return require('./src/node/fs/emptyDir.js').call(null, ...args);
};

/**
 * @name              downloadFile
 * @namespace         sugar.node.fs
 * @type              Function
 *
 * Download a file and save it on the file system
 *
 * @param             {String}          downloadUrl             The absolute url to the file that you want to download
 * @param             {String}          [destinationPath=__downloadsFolder()]         The path where you want to save the file. Can be a simple directory path or an absolute file path with the file name and the extension
 * @param             {Function}        [callback=null]           A callback function to call on success or on error. In case of success it will take as parameter the final file path on the file system, otherwise it will be the error passed
 * @return            {Promise}                                 A promise that will be resolved with the final absolute file path, or rejected with the error passed
 *
 * @example       js
 * const downloadFile = require('@coffeekraken/node/fs/downloadFile');
 * downloadFile('https://myCoolFileUrl.ch/coco.json').then((dest) => {
 *    console.log('file downloeaded and saved here', dest);
 * }).catch(err) => {});
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.downloadFile', null);
api.node.fs.downloadFile = (...args) => {
  return require('./src/node/fs/downloadFile.js').call(null, ...args);
};

/**
 * @name        copySync
 * @namespace     sugar.node.fs
 * @type          Function
 *
 * Copy a file or directory (sync)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 *
 * @example       js
 * const copySync = require('@coffeekraken/node/fs/copySync');
 * try {
 *    copySync('my/cool/file.jpg', 'my/new/file.jpg');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.copySync', null);
api.node.fs.copySync = (...args) => {
  return require('./src/node/fs/copySync.js').call(null, ...args);
};

/**
 * @name        copy
 * @namespace     sugar.node.fs
 * @type          Function
 * @async
 *
 * Copy a file or directory (async)
 *
 * @param       {String}              src           The source path to copy
 * @param       {String}              dest          The destination path
 * @return      {Promise}                           A promise that will be resolved when the copy is completed
 *
 * @example       js
 * const copy = require('@coffeekraken/node/fs/copy');
 * copy('my/cool/file.jpg', 'my/new/file.jpg').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.copy', null);
api.node.fs.copy = (...args) => {
  return require('./src/node/fs/copy.js').call(null, ...args);
};

/**
 * @name                    base64
 * @namespace               sugar.node.encoding
 * @type                    Object
 *
 * This return an object containing the "encode" and "decode" function that you can use
 * to encode/decode base64 Strings.
 *
 * @example           js
 * import base64 from '@coffeekraken/sugar/node/encoding/base64';
 * base64.encode('Hello world');
 * base64.decode('SGVsbG8gV29ybGQh');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.encoding.base64', null);
Object.defineProperty(api.node.encoding, 'base64', {
  get: function () {
    return require('./src/node/encoding/base64.js');
  }
});

/**
 * @name                    parse
 * @namespace               sugar.node.docblock
 * @type                    Function
 *
 * This function allows you to simply parse any strings that contains docblock(s) and return
 * the parsed version un object format
 *
 * @param           {String}          string        The string to parse
 * @param           {Object}          [settings={}]  The settings to configure how you want to parse the dobclock(s)
 * @return          {Object}                        The object version of the docblock
 *
 * @example         js
 * import parse from '@coffeekraken/sugar/node/docblock/parse';
 * parse(myString);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.docblock.parse', null);
api.node.docblock.parse = (...args) => {
  return require('./src/node/docblock/parse.js').call(null, ...args);
};

/**
 * @name                            getArgsNames
 * @namespace                       sugar.node.dev
 * @type                            Function
 *
 * Get the arguments names of the passed function. Return an array of the arguments names
 *
 * @param             {Function}              func                  The function reference of which get the arguments names
 * @return            {Array}                                       An array of arguments names
 *
 * @example         js
 * import getArgsNames from '@coffeekraken/sugar/node/dev/getArgsNames';
 * function hello(world, coco, plop) { }
 * getArgsNames(hello); // => ['world', 'coco', 'plop']
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.dev.getArgsNames', null);
api.node.dev.getArgsNames = (...args) => {
  return require('./src/node/dev/getArgsNames.js').call(null, ...args);
};

/**
 * @name                    dataTypesArray
 * @namespace               sugar.node.dev
 * @type                    Array
 *
 * This is just a list of data types available in the
 * current language (node/js)
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.dev.dataTypesArray', null);
Object.defineProperty(api.node.dev, 'dataTypesArray', {
  get: function () {
    return require('./src/node/dev/dataTypesArray.js');
  }
});

/**
 * @name            sha512
 * @namespace       sugar.node.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the sha512 algorithm
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.crypt.sha512', null);
Object.defineProperty(api.node.crypt, 'sha512', {
  get: function () {
    return require('./src/node/crypt/sha512.js');
  }
});

/**
 * @name            sha256
 * @namespace       sugar.node.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the sha256 algorithm
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.crypt.sha256', null);
Object.defineProperty(api.node.crypt, 'sha256', {
  get: function () {
    return require('./src/node/crypt/sha256.js');
  }
});

/**
 * @name            object
 * @namespace       sugar.node.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the object algorithm
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.crypt.object', null);
Object.defineProperty(api.node.crypt, 'object', {
  get: function () {
    return require('./src/node/crypt/object.js');
  }
});

/**
 * @name            md5
 * @namespace       sugar.node.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the md5 algorithm
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.crypt.md5', null);
Object.defineProperty(api.node.crypt, 'md5', {
  get: function () {
    return require('./src/node/crypt/md5.js');
  }
});

/**
 * @name            base64
 * @namespace       sugar.node.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the base64 algorithm
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.crypt.base64', null);
Object.defineProperty(api.node.crypt, 'base64', {
  get: function () {
    return require('./src/node/crypt/base64.js');
  }
});

/**
 * @name            aes
 * @namespace       sugar.node.crypt
 * @type            Object
 *
 * Expose two function named "encrypt" and "decrypt" that you can use to process your content using the aes algorithm
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.crypt.aes', null);
Object.defineProperty(api.node.crypt, 'aes', {
  get: function () {
    return require('./src/node/crypt/aes.js');
  }
});

/**
 * @name                    env
 * @namespace               sugar.node.core
 * @type                    Function
 *
 * This function allows you to access environment variables through the same method in node and javascript
 *
 * @param           {String}          dotPath         The dot path (something.else) to tell which variable you want
 * @param           {Mixed}           [value=null]    The value you want to assign. If null, you will just get the wanted variable back
 * @return          {Mixed}                           The variable value
 *
 * @example         js
 * import env from '@coffeekraken/sugar/node/dev/env';
 * console.log(env('node_env')); // => production
 * env('something.cool', { hello: 'world' });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.core.env', null);
api.node.core.env = (...args) => {
  return require('./src/node/core/env.js').call(null, ...args);
};

/**
 * @name                  SConfigFsAdapter
 * @namespace             sugar.node.config.adapters
 * @type                  Class
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - filename ('[name].config.js') {String}: Specify the filename to use for the file that will store the configs
 * - defaultConfigPath (null) {String}: This specify the path to the "default" config file.
 * - appConfigPath (${process.cwd()}/[filename]) {String}: This specify the path to the "app" config file
 * - userConfigPath (${__tmpDir()}/[filename]) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.config.adapters.SConfigFsAdapter', null);
Object.defineProperty(api.node.config.adapters, 'SConfigFsAdapter', {
  get: function () {
    return require('./src/node/config/adapters/SConfigFsAdapter.js');
  }
});

/**
 * @name                                SConfigAdapter
 * @namespace                           sugar.node.config.adapters
 * @type                                Class
 *
 * Base class for SCache adapters
 *
 * @example             js
 * class SConfigCoolAdapter extends SConfigAdapter {
 *    constructor(settings = {}) {
 *      super(settings);
 *      // settings are accessible through this._settings
 *    }
 *    async load() {
 *      // load the config the way you want and return it in Object format
 *      return {};
 *    }
 *    async save(newConfig) {
 *      // save the newConfig object the way you want and return true when all it ok
 *      return true;
 *    }
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.config.adapters.SConfigAdapter', null);
Object.defineProperty(api.node.config.adapters, 'SConfigAdapter', {
  get: function () {
    return require('./src/node/config/adapters/SConfigAdapter.js');
  }
});

/**
 * @name                                            config
 * @namespace                                       sugar.node.config
 * @type                                            Class
 *
 * This class allows you to quickly access/update some configuration depending on the data adapters specified.
 * The base available data adapters are "json" and "js" allowing you to store data inside files on the server drive.
 *
 * @example             js
 * import SConfig from '@coffeekraken/sugar/node/config/SConfig';
 * const config = new SConfig({
 *    json: {
 *      filename: process.cwd() + '/config.json',
 *      encrypt: base64.encrypt,
 *      decrypt: base64.decrypt
 *    }
 * });
 * await config.get('log.frontend.mail.host'); // => gmail.google.com
 * await config.set('log.frontend.mail.host', 'mailchimp.com');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.config.config', null);
Object.defineProperty(api.node.config, 'config', {
  get: function () {
    return require('./src/node/config/SConfig.js');
  }
});

/**
 * @name            rgba2hsv
 * @namespace             sugar.node.color
 * @type            Function
 *
 * RGBA to HSV
 *
 * @param       	{Number|Object}        	r 	          	The red value between 0-255 or an object representing r, g, b, a
 * @param       	{Number}        	g 	          	The green value between 0-255
 * @param       	{Number}        	b 	          	The blue value between 0-255
 * @param       	{Number}        	a 	          	The alpha value between 0-100|0-1
 * @return      	{object} 		                    	The hsv object representation
 *
 * @example           js
 * import rgba2hsv from '@coffeekraken/sugar/node/color/rgba2hsv';
 * rgba2hsv(10,20,50,10);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.rgba2hsv', null);
api.node.color.rgba2hsv = (...args) => {
  return require('./src/node/color/rgba2hsv.js').call(null, ...args);
};

/**
 * @name                  rgba2hsl
 * @namespace             sugar.node.color
 * @type                  Function
 *
 * RGBA to HSL
 *
 * @param       	{Number|Object}        	r 	        	The red value between 0-255 or an object representing r, b, g, a
 * @param       	{Number}        	g 	        	The green value between 0-255
 * @param       	{Number}        	b 	        	The blue value between 0-255
 * @param       	{Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {object} 		                    	The hsl object representation
 *
 * @example         js
 * import rgba2hsl from '@coffeekraken/sugar/node/color/rgba2hsl';
 * rgba2hsl(10,20,50,10);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.rgba2hsl', null);
api.node.color.rgba2hsl = (...args) => {
  return require('./src/node/color/rgba2hsl.js').call(null, ...args);
};

/**
 * @name                rgba2hex
 * @namespace             sugar.node.color
 * @type                Function
 *
 * RGBA to HEX
 *
 * @param       	{Number|Object}        	r	          	The red value between 0-255 or an object representing r, g, b, a
 * @param       	{Number}        	g	          	The green value between 0-255
 * @param       	{Number}        	b	          	The blue value between 0-255
 * @param       	{Number}        	a	          	The alpha value between 0-100|0-1
 * @return      	{string}		                    The hex string representation like #ff004f
 *
 * @example         js
 * import rgba2hex from '@coffeekraken/sugar/node/color/rgba2hex';
 * rgba2hex(10,20,30,10);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.rgba2hex', null);
api.node.color.rgba2hex = (...args) => {
  return require('./src/node/color/rgba2hex.js').call(null, ...args);
};

/**
 * @name                        parseRgba
 * @namespace             sugar.node.color
 * @type                        Function
 *
 * Parse RGBA string and return an object
 *
 * @param 	          {string}	            rgbaString		            The rgba string (rgba(r,g,b,a)) to parse
 * @return 	          {object} 				                              	The rgba object representation
 *
 * @example           js
 * import parseRgba from '@coffeekraken/sugar/node/color/parseRgba';
 * parseRgba('rgba(20,10,100,20)');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.parseRgba', null);
api.node.color.parseRgba = (...args) => {
  return require('./src/node/color/parseRgba.js').call(null, ...args);
};

/**
 * @name                parseHsv
 * @namespace             sugar.node.color
 * @type                Function
 *
 * Parse HSV
 *
 * @param         	{string}	          	hsvString		        	The hsv string (hsv(h,s,v)) to parse
 * @return        	{object}					                        		The hsv object representation
 *
 * @example       js
 * import parseHsv from '@coffeekraken/sugar/node/color/parseHsv';
 * parseHsv('hsv(10,10,10)');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.parseHsv', null);
api.node.color.parseHsv = (...args) => {
  return require('./src/node/color/parseHsv.js').call(null, ...args);
};

/**
 * @name                    parseHsl
 * @namespace             sugar.node.color
 * @type                    Function
 *
 * Parse HSL
 *
 * @param 	      {string}	        hslString			      The hsl string (hsl(h,s,l)) to parse
 * @return 	        {object} 					                  	The hsl object representation
 *
 * @example         js
 * import parseHsl from '@coffeekraken/sugar/color/parseHsl';
 * parseHsl('hsl(20,20,20)');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.parseHsl', null);
api.node.color.parseHsl = (...args) => {
  return require('./src/node/color/parseHsl.js').call(null, ...args);
};

/**
 * @name            parse
 * @namespace             sugar.node.color
 * @type            Function
 * @private
 *
 * Parse a string and return you the wanted object format like "rgba", "hsl" or "hsv".
 *
 * @param       {Object}      color       The color to parse like (#ff0000 | rgba(...) | hsl(...) | hsv(...))
 * @param       {String}      [format='rgba']       The object format wanted. Can be "rgba", "hsl" or "hsv"
 * @return      {Object}                  The rgba representation of the passed color
 *
 * @example         js
 * import parse from '@coffeekraken/sugar/node/color/parse';
 * parse('rgba(10,20,30,100)'); // => { r: 10, b: 20, b: 30, a: 100 }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.parse', null);
api.node.color.parse = (...args) => {
  return require('./src/node/color/parse.js').call(null, ...args);
};

/**
 * @name              hsv2rgba
 * @namespace             sugar.node.color
 * @type              Function
 *
 * HSV to RGBA
 *
 * @param	        {Number|Object}      	h       		The hue value between 0-360 or an object representing h, s, v, (a)
 * @param	        {Number}      	s       		The saturation value between 0-100|0-1
 * @param	        {Number}      	v       		The value value between 0-100|0-1
 * @param	        {Number}      	a       		The alpha value between 0-100|0-1
 * @return      	{object} 		              	The rgba object representation
 *
 * @example         js
 * import hsv2rgba from '@coffeekraken/sugar/node/color/hsv2rgba';
 * hsv2rgba(10,20,30);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.hsv2rgba', null);
api.node.color.hsv2rgba = (...args) => {
  return require('./src/node/color/hsv2rgba.js').call(null, ...args);
};

/**
 * @name              hsl2rgba
 * @namespace             sugar.node.color
 * @type              Function
 *
 * HSL to RGBA
 *
 * @param	        {Number|Object}        	h		        The hue value between 0-360 or an object representing h, s, l, (a)
 * @param	        {Number}        	s 	        	The saturation value between 0-100|0-1
 * @param	        {Number}        	l 	        	The luminence value between 0-100|0-1
 * @param	        {Number}        	a 	        	The alpha value between 0-100|0-1
 * @return 	      {object} 		                  	The rgba object representation
 *
 * @example         js
 * import hsl2rgba from '@coffeekraken/sugar/node/color/hsl2rgba';
 * hsl2rgba(10,20,30);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.hsl2rgba', null);
api.node.color.hsl2rgba = (...args) => {
  return require('./src/node/color/hsl2rgba.js').call(null, ...args);
};

/**
 * @name                  hex2rgba
 * @namespace             sugar.node.color
 * @type                  Function
 *
 * Hex to RGBA
 *
 * @param	              {string}       	hex         		The hex string to convert
 * @return            	{object} 			                  	The rgba object representation
 *
 * @example         js
 * import hex2rgba from '@coffeekraken/sugar/node/color/hex2rgba';
 * hex2rgba('#ff00ff');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.hex2rgba', null);
api.node.color.hex2rgba = (...args) => {
  return require('./src/node/color/hex2rgba.js').call(null, ...args);
};

/**
 * @name                  convert
 * @namespace             sugar.node.color
 * @type                  Function
 *
 * This function take as input any color format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * and convert it into the wanted format like "rgba", "hsl", "hsv", "hex", "rgbaString", "hslString" or "hsvString"
 *
 * @param           {Mixed}               input           The input color to convert
 * @param           {String}              [format="rgba"]     The format wanted
 * @return          {Mixed}                               The converted color
 *
 * @example         js
 * import convert from '@coffeekraken/sugar/node/color/convert';
 * convert('rgba(10,20,30,100)', 'rgba'); // => { r: 10, g: 20, b: 30, a: 100 }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.convert', null);
api.node.color.convert = (...args) => {
  return require('./src/node/color/convert.js').call(null, ...args);
};

/**
 * @name                color
 * @namespace           sugar.node.color
 * @type                Function
 *
 * Simple wrapper to create an SColor instance quickly
 *
 * @param         {Mixed}             color           A color in any format like rgba Object, hsl Object, hsv Object, hex String, rgba String, hsl String or hsv String
 * @return        {SColor}                            An SColor instance representing your color
 *
 * @example         js
 * import color from '@coffeekraken/sugar/node/color/color';
 * const myColor = color('#ff00ff');
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.color', null);
api.node.color.color = (...args) => {
  return require('./src/node/color/color.js').call(null, ...args);
};

/**
 * @name 		SColor
 * @namespace      sugar.node.color
 * @type    Class
 *
 * Class that provide complete and simple to use color manupilation capabilities like:
 * - Modifiers
 * 	- opacity
 * 	- darken
 * 	- lighten
 * 	- desaturate
 * 	- saturate
 * 	- spin (change hue)
 * 	- transparentize
 * 	- alpha
 * 	- grayscale
 * - Conversions
 * 	- rgba
 * 	- hsl
 * 	- hsv
 * 	- hex
 * - Print out formats
 * 	- toRgbaString
 * 	- toHslString
 * 	- toHsvString
 * 	- toHexString
 * 	- toString(format = null)
 *
 * @example 	js
 * import SColor from '@coffeekraken/sugar/node/classes/SColor'
 * let myColor = new SColor(#ff0000);
 * // get a lighter color
 * let ligtherColor = myColor.lighten(20);
 * // print the color to rgba
 * console.log(lighterColor.toRgbaString());
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.color.SColor', null);
Object.defineProperty(api.node.color, 'SColor', {
  get: function () {
    return require('./src/node/color/SColor.js');
  }
});

/**
 * @name                        parseArgs
 * @namespace                   sugar.node.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    argsDefinitions                   The arguments object description
 * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
 * - treatDotsAsObject (true) {Boolean}: Specify if you want the options with dot(s) in the name to be treated as object in the returned object
 * - handleOrphanOptions (true) {Boolean}: Specify if you want the options values without clear argument name given to be handled or not
 * @return            {Object}                                                The object of funded arguments and their values
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/node/string/parseArgs';
 * parseArgs('hello -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep" #blop', {
 *    param1: { type: 'String', alias: 'p' },
 *    world: { type: 'Array', alias: 'w', validator: value => {
 *      return Array.isArray(value);
 *    }},
 *    bool: { type: 'Boolean', alias: 'b', default: false, required: true },
 *    'hello.world': { type: 'String' },
 *    help: { type: 'String', alias: 'h' },
 *    id: { type: 'String', alias: 'i', regexp: /^#([\S]+)$/ }
 * }, {
 *    treatDotsAsObject: true,
 *    handleOrphanOptions: true
 * });
 * {
 *    param1: 'hello',
 *    world: [10, 'yop', 'hello world'],
 *    bool: true,
 *    hello: {
 *      world: 'Nelson'
 *    },
 *    help: 'coco yep',
 *    id: '#blop'
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.cli.parseArgs', null);
api.node.cli.parseArgs = (...args) => {
  return require('./src/node/cli/parseArgs.js').call(null, ...args);
};

/**
 * @name                          toPlainObject
 * @namespace                     sugar.node.class
 * @type                          Function
 *
 * This function take a instance as parameter and return a plain object of it
 *
 * @param               {Mixed}               instance                Any class instance to transform into a plain object
 * @return              {Object}                                      A plain object version of the the class instance
 *
 * @example             js
 * import toPlainObject from '@coffeekraken/sugar/node/class/toPlainObject';
 * class Coco {
 *    constructor() {
 *      this.hello = 'world';
 *    }
 * }
 * toPlainObject(new Coco()); // => { hello: 'world' }
 *
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
__ensureExists(api, 'node.class.toPlainObject', null);
api.node.class.toPlainObject = (...args) => {
  return require('./src/node/class/toPlainObject.js').call(null, ...args);
};

/**
 * @name                                    methodExists
 * @namespace                               sugar.node.class
 * @type                                    Function
 *
 * Check if one or more methods exists on a class instance
 *
 * @param           {Object}              instance                The instance to check the methods on
 * @param           {String}              ...methods              The methods to check
 * @return          {Boolean|Array}                               Return true if all is ok, and an array of missing methods if not
 *
 * @example           js
 * class Coco {
 *    hello() {}
 * }
 * import methodExists from '@coffeekraken/sugar/node/class/methodExists';
 * const myInstance = new Coco();
 * methodExists(myInstance, 'hello', 'world'); // => ['world'];
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.class.methodExists', null);
api.node.class.methodExists = (...args) => {
  return require('./src/node/class/methodExists.js').call(null, ...args);
};

/**
 * @name                                SCacheFsAdapter
 * @namespace                           sugar.node.fs.cacheAdapters
 * @type                                Class
 *
 * A filesystem SCache adapter that allows you to store your cache items on the user system
 *
 * @example             js
 * const cache = new SCache({
 *    ttl: 100,
 *    adapter: new SCacheFsAdapter({
 *      path: '/my/cool/folder
 *    })
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.fs.cacheAdapters.SCacheFsAdapter', null);
Object.defineProperty(api.node.fs.cacheAdapters, 'SCacheFsAdapter', {
  get: function () {
    return require('./src/node/cache/adapters/SCacheFsAdapter.js');
  }
});

/**
 * @name                                SCache
 * @namespace                           sugar.node.cache
 * @type                                Class
 *
 * Gives you the ability to manage cache through some defaults available adapters or using yours.
 * This cache class take care of these features:
 * - Standard and custom TTL by cache item
 * - Delete cache items on expires or not
 *
 * @example             js
 * import SCache from '@coffeekraken/sugar/node/cache/SCache';
 * const cache = new SCache({
 *  ttl: '10s' // 10 seconds
 * });
 * cache.set('myCoolCacheItem', someData);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.cache.SCache', null);
Object.defineProperty(api.node.cache, 'SCache', {
  get: function () {
    return require('./src/node/cache/SCache.js');
  }
});

/**
 * @name                                splitEvery
 * @namespace                           sugar.node.array
 * @type                                Function
 *
 * Split an array every N items
 *
 * @param           {Array}           array               The array to split
 * @param           {Number}          every               Every how many items to split the array
 * @return          {Array}                               An array of arrays splited
 *
 * @example           js
 * import splitEvery from '@coffeekraken/sugar/node/array/splitEvery';
 * splitEvery([1,2,3,4,5,6,7,8,9], 3);
 * // [[1,2,3],[4,5,6],[7,8,9]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.array.splitEvery', null);
api.node.array.splitEvery = (...args) => {
  return require('./src/node/array/splitEvery.js').call(null, ...args);
};

/**
 * @name        keysLast
 * @namespace       sugar.node.array
 * @type      Function
 *
 * Make sure the passed array ends with the passed keys
 * @param    {Array}    array    The array to process
 * @param    {Array}    keys    The keys to end the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * import keysLast from '@coffeekraken/sugar/node/array/keysLast'
 * keysLast(['a','b','d','g','c'], ['d','g'])
 * // ['a','b','c','d','g']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.array.keysLast', null);
api.node.array.keysLast = (...args) => {
  return require('./src/node/array/keysLast.js').call(null, ...args);
};

/**
 * @name        keysFirst
 * @namespace       sugar.node.array
 * @type      Function
 *
 * Make sure the passed array start with the passed keys
 *
 * @param    {Array}    array    The array to sort
 * @param    {Array}    keys    The keys to start the array with
 * @return    {Array}    The processed array
 *
 * @example    js
 * import keysFirst from '@coffeekraken/sugar/node/array/keysFirst'
 * keysFirst(['a','b','d','g','c'], ['d','g'])
 * // ['d','g','a','b','c']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.array.keysFirst', null);
api.node.array.keysFirst = (...args) => {
  return require('./src/node/array/keysFirst.js').call(null, ...args);
};

/**
 * @name                              asyncForEach
 * @namespace                         sugar.node.array
 * @type                              Function
 *
 * Allow to make some async foreach on your arrays
 *
 * @param         {Array}             array             The array to loop on
 * @param         {Function}          asyncFn           The async function to call on each items
 *
 * @example         js
 * import asyncForEach from '@coffeekraken/sugar/node/array/asyncForEach';
 * const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
 * asyncForEach([0,1,2,3], async (item) => {
 *    await waitWor(50);
 *    console.log(item);
 * });
 * // 0
 * // 1
 * // 2
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
__ensureExists(api, 'node.array.asyncForEach', null);
api.node.array.asyncForEach = (...args) => {
  return require('./src/node/array/asyncForEach.js').call(null, ...args);
};

module.exports = api;
