// @ts-nocheck
import __tmpDir from 'temp-dir';
/**
 * @name                            systemTmpDir
 * @namespace            node.path
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the system temp directory path
 *
 * @return                {String}                      The real os temp directory path
 * *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import systemTmpDir from '@coffeekraken/node/fs/systemTmpDir';
 * systemTmpDir(); // => '/private/var/folders/3x/jf5977fn79jbglr7rk0tq4d00000gn/T'
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function () {
    const tmpDir = __tmpDir;
    return tmpDir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtVG1wRGlyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3lzdGVtVG1wRGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFHaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sQ0FBQyxPQUFPO0lBQ1YsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQ3hCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMifQ==