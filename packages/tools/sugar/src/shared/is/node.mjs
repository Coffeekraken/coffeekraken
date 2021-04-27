// @ts-nocheck
/**
 * @name                                      isNode
 * @namespace            js.is
 * @type                                      Function
 * @stable
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvaXMvbm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsZUFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTyxDQUNMLE9BQU8sT0FBTyxLQUFLLFdBQVc7UUFDOUIsT0FBTyxDQUFDLE9BQU87UUFDZixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQ2hDLENBQUM7QUFDSixDQUFDLENBQUMifQ==