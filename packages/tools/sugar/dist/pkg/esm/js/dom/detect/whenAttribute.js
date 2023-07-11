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
import __parse from '../../../shared/string/parse.js';
import __observeAttributes from '../observe/observeAttributes.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLE9BQU8sTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RCxPQUFPLG1CQUFtQixNQUFNLGlDQUFpQyxDQUFDO0FBc0RsRSxNQUFNLENBQUMsT0FBTyxVQUFVLGVBQWUsQ0FDbkMsR0FBRyxFQUNILFFBQVEsRUFDUixRQUEwQztJQUUxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMsTUFBTSxhQUFhLG1CQUNmLEtBQUssRUFBRSxTQUFTLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksYUFBYSxDQUFDLEtBQUssSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLE9BQU87YUFDVjtpQkFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTtnQkFDN0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLE9BQU87YUFDVjtTQUNKO1FBRUQsTUFBTSxHQUFHLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFckMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUM3QixJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssUUFBUSxFQUFFO2dCQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQ2pCLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FDdkQsQ0FBQztnQkFDRixJQUNJLGFBQWEsQ0FBQyxLQUFLO29CQUNuQixhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQy9DO29CQUNFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDZixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ2hCO3FCQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO29CQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2YsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNoQjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9