// @ts-nocheck
import __deepMerge from '../../node/object/deepMerge';
/**
 * @name            replaceTokens
 * @namespace            js.string
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @param       {String}          string          The string to process
 * @param       {Object}          argsObj         The arguments/value object
 * @param       {Object}          [settings={}]   A settings object to configure the parsing process
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
    settings = __deepMerge({
        regexp: '\\[([a-zA-Z0-9-_]+)\\]',
        stripUndefined: true,
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
export default replaceTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcGxhY2VUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLDZCQUE2QixDQUFDO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDakQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsd0JBQXdCO1FBQ2hDLGNBQWMsRUFBRSxJQUFJO0tBQ3ZCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFDRixJQUFJLE1BQU0sQ0FBQztJQUNYLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDN0MsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7UUFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWM7WUFDNUQsT0FBTztRQUNYLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDaEU7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==