import __urlSlug from 'url';
/**
 * @name            urlFromString
 * @namespace       shared.url
 * @type            Function
 * @platform        js
 * @platform        node
 * @platform         ts
 * @status          stable
 *
 * Simple function that take a string as parameter and returns you a valid
 * url ready one
 *
 * @todo            tests
 *
 * @example             js
 * import urlFromString from '@coffeekraken/sugar/shared/url/urlFromString';
 * urlFromString('Sir James Paul McCartney MBE is an English singer-songwriter');
 * // sir-james-paul-mc-cartney-mbe-is-an-english-singer-songwriter
 *
 * @see             https://www.npmjs.com/package/url-slug
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function urlFromString(string) {
    return string
        .split('/')
        .map((l) => {
        // @ts-ignore
        return __urlSlug(l.trim());
    })
        .join('/');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsRnJvbVN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVybEZyb21TdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLE1BQU0sS0FBSyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhLENBQUMsTUFBYztJQUNoRCxPQUFPLE1BQU07U0FDUixLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDUCxhQUFhO1FBQ2IsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLENBQUMifQ==