"use strict";
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
exports.triggers = void 0;
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dom_1 = require("@coffeekraken/sugar/dom");
exports.triggers = [
    'direct',
    'directly',
    'inViewport',
    'nearViewport',
    'enterViewport',
    'outOfViewport',
    'interact',
    'visible',
    'stylesheetsReady',
    'domReady',
    'animationEnd',
];
function __when($elm, trigger, settings) {
    const finalSettings = Object.assign({ whenInViewport: {}, whenNearViewport: {}, whenOutOfViewport: {}, whenInteract: {}, whenVisible: {}, whenStylesheetsReady: {} }, (settings !== null && settings !== void 0 ? settings : {}));
    return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
        // ensure we work with an array of time(s)
        if (!Array.isArray(trigger))
            trigger = trigger.split(',').map((t) => t.trim());
        const promises = [];
        // adding watchers
        trigger.forEach((t) => {
            switch (t) {
                case 'inViewport':
                    promises.push((0, dom_1.__whenInViewport)($elm, finalSettings.whenInViewport));
                    break;
                case 'nearViewport':
                    promises.push((0, dom_1.__whenNearViewport)($elm, finalSettings.whenNearViewport));
                    break;
                case 'entersViewport':
                    promises.push((0, dom_1.__whenEntersViewport)($elm, finalSettings.whenEntersViewport));
                    break;
                case 'outOfViewport':
                    promises.push((0, dom_1.__whenOutOfViewport)($elm, finalSettings.whenOutOfViewport));
                    break;
                case 'interact':
                    promises.push((0, dom_1.__whenInteract)($elm, finalSettings.whenInteract));
                    break;
                case 'visible':
                    promises.push((0, dom_1.__whenVisible)($elm, finalSettings.whenVisible));
                    break;
                case 'domReady':
                    promises.push((0, dom_1.__whenDomReady)());
                    break;
                case 'stylesheetsReady':
                    promises.push((0, dom_1.__whenStylesheetsReady)($elm ? [$elm] : null));
                    break;
                case 'animationEnd':
                    promises.push((0, dom_1.__whenAnimationEnd)($elm));
                    break;
            }
        });
        // if no times setted, execute directly
        if (!trigger.length ||
            trigger.includes('direct') ||
            trigger.includes('directly')) {
            resolve($elm);
            return;
        }
        // listen for at least 1 promise resolved
        yield Promise.race(promises);
        resolve($elm);
    }));
}
exports.default = __when;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCx3RUFBaUQ7QUFVakQsaURBVWlDO0FBK0RwQixRQUFBLFFBQVEsR0FBRztJQUNwQixRQUFRO0lBQ1IsVUFBVTtJQUNWLFlBQVk7SUFDWixjQUFjO0lBQ2QsZUFBZTtJQUNmLGVBQWU7SUFDZixVQUFVO0lBQ1YsU0FBUztJQUNULGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsY0FBYztDQUNqQixDQUFDO0FBRUYsU0FBd0IsTUFBTSxDQUMxQixJQUFpQixFQUNqQixPQUF1QixFQUN2QixRQUF3QjtJQUV4QixNQUFNLGFBQWEsbUJBQ2YsY0FBYyxFQUFFLEVBQUUsRUFDbEIsZ0JBQWdCLEVBQUUsRUFBRSxFQUNwQixpQkFBaUIsRUFBRSxFQUFFLEVBQ3JCLFlBQVksRUFBRSxFQUFFLEVBQ2hCLFdBQVcsRUFBRSxFQUFFLEVBQ2Ysb0JBQW9CLEVBQUUsRUFBRSxJQUNyQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ2hELDBDQUEwQztRQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDdkIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNLFFBQVEsR0FBWSxFQUFFLENBQUM7UUFFN0Isa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNsQixRQUFRLENBQUMsRUFBRTtnQkFDUCxLQUFLLFlBQVk7b0JBQ2IsUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFBLHNCQUFnQixFQUFDLElBQUksRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLENBQ3ZELENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLGNBQWM7b0JBQ2YsUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFBLHdCQUFrQixFQUNkLElBQUksRUFDSixhQUFhLENBQUMsZ0JBQWdCLENBQ2pDLENBQ0osQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssZ0JBQWdCO29CQUNqQixRQUFRLENBQUMsSUFBSSxDQUNULElBQUEsMEJBQW9CLEVBQ2hCLElBQUksRUFDSixhQUFhLENBQUMsa0JBQWtCLENBQ25DLENBQ0osQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssZUFBZTtvQkFDaEIsUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFBLHlCQUFtQixFQUNmLElBQUksRUFDSixhQUFhLENBQUMsaUJBQWlCLENBQ2xDLENBQ0osQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssVUFBVTtvQkFDWCxRQUFRLENBQUMsSUFBSSxDQUNULElBQUEsb0JBQWMsRUFBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUNuRCxDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxTQUFTO29CQUNWLFFBQVEsQ0FBQyxJQUFJLENBQ1QsSUFBQSxtQkFBYSxFQUFDLElBQUksRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLENBQ2pELENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFVBQVU7b0JBQ1gsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFjLEdBQUUsQ0FBQyxDQUFDO29CQUNoQyxNQUFNO2dCQUNWLEtBQUssa0JBQWtCO29CQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUEsNEJBQXNCLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxNQUFNO2dCQUNWLEtBQUssY0FBYztvQkFDZixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUEsd0JBQWtCLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDeEMsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCx1Q0FBdUM7UUFDdkMsSUFDSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ2YsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDMUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFDOUI7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCxPQUFPO1NBQ1Y7UUFFRCx5Q0FBeUM7UUFDekMsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTNGRCx5QkEyRkMifQ==