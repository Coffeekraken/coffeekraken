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
/**
 * @name              publicIpAddress
 * @namespace            node.network
 * @type              Function
 * @platform        node
 * @status          stable
 * @async
 *
 * This function allows you to get your public ip address
 *
 * @param       {Boolean}           [v6=false]          Specify if you want the ipv6 instead of the ipv4
 * @return      {String}            Your public ip address
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __publicIpAddress()
 * await __publicIpAddress()
 *
 * @example           js
 * import { __publicIpAddress } from '@coffeekraken/sugar/network';
 * await __publicIpAddress(); // => 243.334.12.98
 *
 * @see             https://github.com/sindresorhus/public-ip
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function __publicIpAddress(v6 = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = 'https://api.ipify.org';
        if (v6) {
            url = 'https://api64.ipify.org';
        }
        const response = yield fetch(url);
        const ip = yield response.text();
        return ip;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsaUJBQWlCLENBQUMsRUFBRSxHQUFHLEtBQUs7O1FBQ3RELElBQUksR0FBRyxHQUFHLHVCQUF1QixDQUFDO1FBQ2xDLElBQUksRUFBRSxFQUFFO1lBQ0osR0FBRyxHQUFHLHlCQUF5QixDQUFDO1NBQ25DO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQUEifQ==