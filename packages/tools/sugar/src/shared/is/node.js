// @ts-nocheck
/**
 * @name                                      isNode
 * @namespace            js.is
 * @type                                      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the current script is running under node runtime or not...
 *
 * @return                {Boolean}                           true if running under javascript runtime, false if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import isNode from '@coffeekraken/sugar/js/is/node';
 * isNode(); // => true
 *
 * @since       1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default () => {
    return (typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsZUFBZSxHQUFHLEVBQUU7SUFDaEIsT0FBTyxDQUNILE9BQU8sT0FBTyxLQUFLLFdBQVc7UUFDOUIsT0FBTyxDQUFDLE9BQU87UUFDZixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQ2xDLENBQUM7QUFDTixDQUFDLENBQUMifQ==