import __callsites from 'callsites';
import __folderPath from './folderPath';
/**
 * @name            dirname
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @platform        ts
 * @status          beta
 *
 * Return the dirname the same as the __dirname cjs variable.
 * The only difference is that it's a function and you need to pass the "import" variable
 * from the filename in which you use this...
 *
 * @param       {Import}            import          The "import" variable from the file you use this function
 * @return      {String}                            The dirname path
 *
 * @example             js
 * import dirname from '@coffeekraken/sugar/node/fs/dirname';
 * dirname(import);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function () {
    // @ts-ignore
    return __folderPath(__callsites()[1].getFileName());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlybmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpcm5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU87SUFDVixhQUFhO0lBQ2IsT0FBTyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUN4RCxDQUFDIn0=