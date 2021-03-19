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
        define(["require", "exports", "../../node/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = replaceTokens;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZVRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcGxhY2VUb2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ25ELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLE1BQU0sRUFBRSx3QkFBd0I7WUFDaEMsY0FBYyxFQUFFLElBQUk7U0FDckIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksTUFBTSxDQUFDO1FBQ1gsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtZQUNsQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztnQkFBRSxPQUFPO1lBQ3pFLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=