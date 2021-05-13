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
import server from 'http';
/**
 * @name            isPortFree
 * @namespace            node.http
 * @type            Function
 * @async
 * @status              beta
 *
 * This function simply check if the passed port is free or not
 *
 * @param           {Number}            port            The port to check
 * @return          {Promise}                           A promise resolved with the result when the check has been done
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import isPortFree from '@coffeekraken/sugar/node/network/utils/isPortFree';
 * await isPortFree(22000); // => true
 *
 * @see             https://stackoverflow.com/a/60897593
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function isPortFree(port) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        server
            .createServer()
            .listen(port, () => {
            try {
                server.close();
            }
            catch (e) { }
            resolve(true);
        })
            .on('error', () => {
            resolve(false);
        });
    }));
}
export default isPortFree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNQb3J0RnJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlzUG9ydEZyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFJO0lBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNuQyxNQUFNO2FBQ0gsWUFBWSxFQUFFO2FBQ2QsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDakIsSUFBSTtnQkFDRixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEI7WUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO1lBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==