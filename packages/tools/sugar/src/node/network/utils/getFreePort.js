// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __isPortFree from './isPortFree';
/**
 * @name            getFreePort
 * @namespace            node.http
 * @type            Function
 * @async
 * @status              beta
 *
 * This function simply returns you a free port.
 * You can pass a port to check as parameter and if it is free, you will get it back as result
 *
 * @param           {Number}        [port=null]         A port to challenge before starting generating random ones
 * @return          {Promise}                           A promise that will be resolved once a free port has been found
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import getFreePort from '@coffeekraken/sugar/node/network/utils/getFreePort';
 * await getFreePort(); // => 22343
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function getFreePort(port = null) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        if (!port)
            port = Math.round(Math.random() * 65535);
        let isFree = yield __isPortFree(port);
        do {
            port = Math.round(Math.random() * 65535);
            isFree = yield __isPortFree(port);
        } while (!isFree);
        resolve(port);
    }));
}
export default getFreePort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RnJlZVBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRGcmVlUG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxZQUFZLE1BQU0sY0FBYyxDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsV0FBVyxDQUFDLElBQUksR0FBRyxJQUFJO0lBQzlCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsSUFBSTtZQUFFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNwRCxJQUFJLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxHQUFHO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQyxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=