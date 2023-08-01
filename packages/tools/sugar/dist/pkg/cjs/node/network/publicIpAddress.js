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
Object.defineProperty(exports, "__esModule", { value: true });
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
function __publicIpAddress(v6 = false) {
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
exports.default = __publicIpAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7OztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxTQUE4QixpQkFBaUIsQ0FBQyxFQUFFLEdBQUcsS0FBSzs7UUFDdEQsSUFBSSxHQUFHLEdBQUcsdUJBQXVCLENBQUM7UUFDbEMsSUFBSSxFQUFFLEVBQUU7WUFDSixHQUFHLEdBQUcseUJBQXlCLENBQUM7U0FDbkM7UUFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxNQUFNLEVBQUUsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FBQTtBQVJELG9DQVFDIn0=