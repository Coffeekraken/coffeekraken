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
import { __observeAttributes } from '@coffeekraken/sugar/dom';
import { __parse } from '@coffeekraken/sugar/string';
export default function __whenAttribute(elm, attrName, settings) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const finalSettings = Object.assign({ check: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        if (elm.hasAttribute(attrName)) {
            const value = __parse(elm.getAttribute(attrName));
            if (finalSettings.check && finalSettings.check(value, value)) {
                resolve(value);
                return;
            }
            else if (!finalSettings.check) {
                resolve(value);
                return;
            }
        }
        const obs = __observeAttributes(elm);
        obs.on('attribute', (mutation) => {
            if (mutation.attributeName === attrName) {
                const value = __parse(mutation.target.getAttribute(mutation.attributeName));
                if (finalSettings.check &&
                    finalSettings.check(value, mutation.oldValue)) {
                    resolve(value);
                    obs.cancel();
                }
                else if (!finalSettings.check) {
                    resolve(value);
                    obs.cancel();
                }
            }
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFzRHJELE1BQU0sQ0FBQyxPQUFPLFVBQVUsZUFBZSxDQUNuQyxHQUFHLEVBQ0gsUUFBUSxFQUNSLFFBQTBDO0lBRTFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLGFBQWEsbUJBQ2YsS0FBSyxFQUFFLFNBQVMsSUFDYixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUMxRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsT0FBTzthQUNWO2lCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsT0FBTzthQUNWO1NBQ0o7UUFFRCxNQUFNLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQyxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzdCLElBQUksUUFBUSxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7Z0JBQ3JDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FDakIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUN2RCxDQUFDO2dCQUNGLElBQ0ksYUFBYSxDQUFDLEtBQUs7b0JBQ25CLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFDL0M7b0JBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNmLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDaEI7cUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7b0JBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDZixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2hCO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=