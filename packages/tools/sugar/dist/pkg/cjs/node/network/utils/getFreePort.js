"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isPortFree_1 = __importDefault(require("./isPortFree"));
/**
 * @name            getFreePort
 * @namespace            node.http
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
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
        let isFree = yield (0, isPortFree_1.default)(port);
        do {
            port = Math.round(Math.random() * 65535);
            isFree = yield (0, isPortFree_1.default)(port);
        } while (!isFree);
        resolve(port);
    }));
}
exports.default = getFreePort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLDhEQUF3QztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUk7SUFDNUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFHLE1BQU0sSUFBQSxvQkFBWSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLEdBQUc7WUFDQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDekMsTUFBTSxHQUFHLE1BQU0sSUFBQSxvQkFBWSxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=