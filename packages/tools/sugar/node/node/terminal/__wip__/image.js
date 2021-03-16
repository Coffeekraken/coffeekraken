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
const __imaging = require('imaging');
const __deepMerge = require('../object/deepMerge');
const __colorConvert = require('color-convert');
/**
 * @name                                    image
 * @namespace           sugar.node.terminal
 * @type                                    Function
 *
 * Load and display an image with simple options like width, height, etc...
 * Available settings:
 * - width {Number}: (optional) The width wanted
 * - height {Number}: (optional) The height wanted
 * - transparent (true) {Boolean}: (optional) Specify if you want the white color treated as a transparent pixel
 * - char (▇) {String}: (optional) Specify the character that you want to use as pixel
 *
 * @param               {String}                url                     The image url to load
 * @param               {Object}                [settings={}]           A settings object like width, height, etc...
 * @return              {Promise}                                        A promise that will be resolved when the picture has been loaded and converted to terminal pixels
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function image(url, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        settings = __deepMerge({
            transparent: true,
            char: '▇',
            color: null
        }, settings);
        return new Promise(({ resolve, reject }) => {
            __imaging.draw(url, settings, function (resp, status) {
                if (status === 'fail')
                    return reject(resp);
                if (!settings.char || settings.char === '▇') {
                    resp = resp.split('▇').join('▇▇');
                    if (settings.transparent) {
                        resp = resp.split('[37m▇▇\u001b').join('[37m  \u001b');
                    }
                }
                else if (settings.transparent) {
                    resp = resp.split(`[37m${settings.char}\u001b`).join('[37m \u001b');
                }
                if (settings.color) {
                    const ansiColor = __colorConvert.hex.ansi16(settings.color);
                    const char = !settings.char || settings.char === '▇' ? '▇▇' : settings.char;
                    resp = resp
                        .split(`[30m${char}\u001b`)
                        .join(`[${ansiColor}m${char}\u001b`);
                    resp = resp
                        .split(`[90m${char}\u001b`)
                        .join(`[${ansiColor}m${char}\u001b`);
                }
                return resolve(resp);
            });
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS90ZXJtaW5hbC9fX3dpcF9fL2ltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQWUsS0FBSyxDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTs7UUFDdEQsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7WUFDRSxXQUFXLEVBQUUsSUFBSTtZQUNqQixJQUFJLEVBQUUsR0FBRztZQUNULEtBQUssRUFBRSxJQUFJO1NBQ1osRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ3pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLElBQUksRUFBRSxNQUFNO2dCQUNsRCxJQUFJLE1BQU0sS0FBSyxNQUFNO29CQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtvQkFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7d0JBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDeEQ7aUJBQ0Y7cUJBQU0sSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO29CQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDckU7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO29CQUNsQixNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVELE1BQU0sSUFBSSxHQUNSLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNqRSxJQUFJLEdBQUcsSUFBSTt5QkFDUixLQUFLLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQzt5QkFDMUIsSUFBSSxDQUFDLElBQUksU0FBUyxJQUFJLElBQUksUUFBUSxDQUFDLENBQUM7b0JBQ3ZDLElBQUksR0FBRyxJQUFJO3lCQUNSLEtBQUssQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDO3lCQUMxQixJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQztpQkFDeEM7Z0JBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQSxDQUFDIn0=