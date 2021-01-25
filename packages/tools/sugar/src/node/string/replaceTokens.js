"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../../node/object/deepMerge"));
/**
 * @name            replaceTokens
 * @namespace           sugar.js.string
 * @type            Function
 * @stable
 *
 * This function takes as parameter a tokened string like "something [cool]", an object
 * of arguments/values and return the processed string with the tokens replaced by the arguments values.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      {Feature}     Add setting to define tokens delimiter
 * @todo      {Feature}     Support multi level tokens like [something.cool]
 *
 * @param       {String}          string          The string to process
 * @param       {Object}          argsObj         The arguments/value object
 * @param       {Object}          [settings={}]   A settings object to configure the parsing process
 * - regexp ('\\[([a-zA-Z0-9-_]+)\\]') {String}: Specify the token reg to use for detecting/replacing values
 * - stripUndefined (true) {Boolean}: Specify if you want to strip the tokens that doesn't have any value passed
 *
 * @example     js
 * import replaceTokens from '@coffeekraken/sugar/js/string/replaceTokens';
 * replaceTokens('hello [world]', { world: 'Coco' }); // => hello Coco
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function replaceTokens(string, argsObj, settings = {}) {
    settings = deepMerge_1.default({
        regexp: '\\[([a-zA-Z0-9-_]+)\\]',
        stripUndefined: true
    }, settings);
    let tokens;
    const reg = new RegExp(settings.regexp, 'g');
    while ((tokens = reg.exec(string))) {
        if (argsObj[tokens[1]] === undefined && !settings.stripUndefined)
            return;
        string = string.replace(tokens[0], argsObj[tokens[1]] || '');
    }
    return string;
}
module.exports = replaceTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcGxhY2VUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYsNEVBQXNEO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ25ELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLE1BQU0sRUFBRSx3QkFBd0I7UUFDaEMsY0FBYyxFQUFFLElBQUk7S0FDckIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUNGLElBQUksTUFBTSxDQUFDO0lBQ1gsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtRQUNsQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztZQUFFLE9BQU87UUFDekUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM5RDtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxpQkFBUyxhQUFhLENBQUMifQ==