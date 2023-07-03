"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name              namespace
 * @namespace           shared.tags
 * @type              Function
 * @platform            node
 * @status              beta
 *
 * Parse the namespace tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @namespace 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function namespace(data, blockSettings) {
    if (data &&
        data.value &&
        typeof data.value === 'string' &&
        data.value.trim() === '') {
        return true;
    }
    let namespace = data.value;
    if (!namespace)
        return data.value;
    if (blockSettings.packageJson) {
        namespace = (0, string_1.__namespaceCompliant)(`${blockSettings.packageJson.name.replace('/', '.')}.${namespace.replace(/\s{2,9999}|\t/gm, '-')}`);
    }
    return (0, string_1.__namespaceCompliant)(namespace.replace(/\s{2,9999}|\t/gm, '-'));
}
exports.default = namespace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsY0FBYztBQUNkLHVEQUFrRTtBQUVsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWE7SUFDbEMsSUFDSSxJQUFJO1FBQ0osSUFBSSxDQUFDLEtBQUs7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFDMUI7UUFDRSxPQUFPLElBQUksQ0FBQztLQUNmO0lBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQixJQUFJLENBQUMsU0FBUztRQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUVsQyxJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUU7UUFDM0IsU0FBUyxHQUFHLElBQUEsNkJBQW9CLEVBQzVCLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUNyQyxHQUFHLEVBQ0gsR0FBRyxDQUNOLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUNuRCxDQUFDO0tBQ0w7SUFDRCxPQUFPLElBQUEsNkJBQW9CLEVBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzNFLENBQUM7QUFDRCxrQkFBZSxTQUFTLENBQUMifQ==