"use strict";
// @ts-nocheck
// @shared
/**
 * @name        uncamelize
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * Uncamelize a string
 *
 * @param    {String}    string    The string to uncamelize
 * @param    {String}    [separator='-']    The separator to use
 * @return    {String}    The uncamelized string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import uncamelize from '@coffeekraken/sugar/js/string/uncamelize'
 * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function uncamelize(text, separator = '-') {
    // Replace all capital letters by separator followed by lowercase one
    let res = '';
    res = text.replace(/[A-Z]/g, function (letter) {
        return separator + letter.toLowerCase();
    });
    // Remove first separator (to avoid _hello_world name)
    if (res.slice(0, 1) === separator)
        res = res.slice(1);
    return res;
}
module.exports = uncamelize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5jYW1lbGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVuY2FtZWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxHQUFHLEdBQUc7SUFDdkMscUVBQXFFO0lBQ3JFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLE1BQU07UUFDM0MsT0FBTyxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsc0RBQXNEO0lBQ3RELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUztRQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUNELGlCQUFTLFVBQVUsQ0FBQyJ9