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
const whenInViewport_1 = __importDefault(require("./whenInViewport"));
const whenNearViewport_1 = __importDefault(require("./whenNearViewport"));
const whenEntersViewport_1 = __importDefault(require("./whenEntersViewport"));
const whenOutOfViewport_1 = __importDefault(require("./whenOutOfViewport"));
const whenInteract_1 = __importDefault(require("./whenInteract"));
const whenDomReady_1 = __importDefault(require("./whenDomReady"));
const whenVisible_1 = __importDefault(require("./whenVisible"));
const whenStylesheetsReady_1 = __importDefault(require("./whenStylesheetsReady"));
const whenAnimationEnd_1 = __importDefault(require("./whenAnimationEnd"));
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
function when($elm, trigger, settings) {
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
                    promises.push((0, whenInViewport_1.default)($elm, finalSettings.whenInViewport));
                    break;
                case 'nearViewport':
                    promises.push((0, whenNearViewport_1.default)($elm, finalSettings.whenNearViewport));
                    break;
                case 'entersViewport':
                    promises.push((0, whenEntersViewport_1.default)($elm, finalSettings.whenEntersViewport));
                    break;
                case 'outOfViewport':
                    promises.push((0, whenOutOfViewport_1.default)($elm, finalSettings.whenOutOfViewport));
                    break;
                case 'interact':
                    promises.push((0, whenInteract_1.default)($elm, finalSettings.whenInteract));
                    break;
                case 'visible':
                    promises.push((0, whenVisible_1.default)($elm, finalSettings.whenVisible));
                    break;
                case 'domReady':
                    promises.push((0, whenDomReady_1.default)());
                    break;
                case 'stylesheetsReady':
                    promises.push((0, whenStylesheetsReady_1.default)($elm ? [$elm] : null));
                    break;
                case 'animationEnd':
                    promises.push((0, whenAnimationEnd_1.default)($elm));
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
exports.default = when;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCx3RUFBaUQ7QUFHakQsc0VBQWdEO0FBR2hELDBFQUFvRDtBQUdwRCw4RUFBd0Q7QUFHeEQsNEVBQXNEO0FBR3RELGtFQUE0QztBQUU1QyxrRUFBNEM7QUFHNUMsZ0VBQTBDO0FBRzFDLGtGQUE0RDtBQUU1RCwwRUFBb0Q7QUErRHZDLFFBQUEsUUFBUSxHQUFHO0lBQ3BCLFFBQVE7SUFDUixVQUFVO0lBQ1YsWUFBWTtJQUNaLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZUFBZTtJQUNmLFVBQVU7SUFDVixTQUFTO0lBQ1Qsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixjQUFjO0NBQ2pCLENBQUM7QUFFRixTQUF3QixJQUFJLENBQ3hCLElBQWlCLEVBQ2pCLE9BQXVCLEVBQ3ZCLFFBQXdCO0lBRXhCLE1BQU0sYUFBYSxtQkFDZixjQUFjLEVBQUUsRUFBRSxFQUNsQixnQkFBZ0IsRUFBRSxFQUFFLEVBQ3BCLGlCQUFpQixFQUFFLEVBQUUsRUFDckIsWUFBWSxFQUFFLEVBQUUsRUFDaEIsV0FBVyxFQUFFLEVBQUUsRUFDZixvQkFBb0IsRUFBRSxFQUFFLElBQ3JCLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDaEQsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN2QixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXRELE1BQU0sUUFBUSxHQUFZLEVBQUUsQ0FBQztRQUU3QixrQkFBa0I7UUFDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2xCLFFBQVEsQ0FBQyxFQUFFO2dCQUNQLEtBQUssWUFBWTtvQkFDYixRQUFRLENBQUMsSUFBSSxDQUNULElBQUEsd0JBQWdCLEVBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FDdkQsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssY0FBYztvQkFDZixRQUFRLENBQUMsSUFBSSxDQUNULElBQUEsMEJBQWtCLEVBQ2QsSUFBSSxFQUNKLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FDakMsQ0FDSixDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxnQkFBZ0I7b0JBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQ1QsSUFBQSw0QkFBb0IsRUFDaEIsSUFBSSxFQUNKLGFBQWEsQ0FBQyxrQkFBa0IsQ0FDbkMsQ0FDSixDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxlQUFlO29CQUNoQixRQUFRLENBQUMsSUFBSSxDQUNULElBQUEsMkJBQW1CLEVBQ2YsSUFBSSxFQUNKLGFBQWEsQ0FBQyxpQkFBaUIsQ0FDbEMsQ0FDSixDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxVQUFVO29CQUNYLFFBQVEsQ0FBQyxJQUFJLENBQ1QsSUFBQSxzQkFBYyxFQUFDLElBQUksRUFBRSxhQUFhLENBQUMsWUFBWSxDQUFDLENBQ25ELENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFNBQVM7b0JBQ1YsUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFBLHFCQUFhLEVBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FDakQsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssVUFBVTtvQkFDWCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUEsc0JBQWMsR0FBRSxDQUFDLENBQUM7b0JBQ2hDLE1BQU07Z0JBQ1YsS0FBSyxrQkFBa0I7b0JBQ25CLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBQSw4QkFBc0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzVELE1BQU07Z0JBQ1YsS0FBSyxjQUFjO29CQUNmLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBQSwwQkFBa0IsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILHVDQUF1QztRQUN2QyxJQUNJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDZixPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUMxQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUM5QjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLE9BQU87U0FDVjtRQUVELHlDQUF5QztRQUN6QyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBM0ZELHVCQTJGQyJ9