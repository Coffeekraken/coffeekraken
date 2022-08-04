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
            }
        });
        // if no times setted, execute directly
        if (!trigger.length ||
            trigger.includes('direct') ||
            trigger.includes('directly')) {
            resolve();
            return;
        }
        // listen for at least 1 promise resolved
        yield Promise.race(promises);
        resolve();
    }));
}
exports.default = when;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCx3RUFBaUQ7QUFHakQsc0VBQWdEO0FBR2hELDBFQUFvRDtBQUdwRCw4RUFBd0Q7QUFHeEQsNEVBQXNEO0FBR3RELGtFQUE0QztBQUU1QyxrRUFBNEM7QUFHNUMsZ0VBQTBDO0FBRzFDLGtGQUE0RDtBQXFEL0MsUUFBQSxRQUFRLEdBQUc7SUFDcEIsUUFBUTtJQUNSLFVBQVU7SUFDVixZQUFZO0lBQ1osY0FBYztJQUNkLGVBQWU7SUFDZixlQUFlO0lBQ2YsVUFBVTtJQUNWLFNBQVM7SUFDVCxrQkFBa0I7Q0FDckIsQ0FBQztBQUVGLFNBQXdCLElBQUksQ0FDeEIsSUFBaUIsRUFDakIsT0FBdUIsRUFDdkIsUUFBd0I7SUFFeEIsTUFBTSxhQUFhLG1CQUNmLGNBQWMsRUFBRSxFQUFFLEVBQ2xCLGdCQUFnQixFQUFFLEVBQUUsRUFDcEIsaUJBQWlCLEVBQUUsRUFBRSxFQUNyQixZQUFZLEVBQUUsRUFBRSxFQUNoQixXQUFXLEVBQUUsRUFBRSxFQUNmLG9CQUFvQixFQUFFLEVBQUUsSUFDckIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNoRCwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3ZCLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTSxRQUFRLEdBQVksRUFBRSxDQUFDO1FBRTdCLGtCQUFrQjtRQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbEIsUUFBUSxDQUFDLEVBQUU7Z0JBQ1AsS0FBSyxZQUFZO29CQUNiLFFBQVEsQ0FBQyxJQUFJLENBQ1QsSUFBQSx3QkFBZ0IsRUFBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUN2RCxDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxjQUFjO29CQUNmLFFBQVEsQ0FBQyxJQUFJLENBQ1QsSUFBQSwwQkFBa0IsRUFDZCxJQUFJLEVBQ0osYUFBYSxDQUFDLGdCQUFnQixDQUNqQyxDQUNKLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLGdCQUFnQjtvQkFDakIsUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFBLDRCQUFvQixFQUNoQixJQUFJLEVBQ0osYUFBYSxDQUFDLGtCQUFrQixDQUNuQyxDQUNKLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLGVBQWU7b0JBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQ1QsSUFBQSwyQkFBbUIsRUFDZixJQUFJLEVBQ0osYUFBYSxDQUFDLGlCQUFpQixDQUNsQyxDQUNKLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFVBQVU7b0JBQ1gsUUFBUSxDQUFDLElBQUksQ0FDVCxJQUFBLHNCQUFjLEVBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FDbkQsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssU0FBUztvQkFDVixRQUFRLENBQUMsSUFBSSxDQUNULElBQUEscUJBQWEsRUFBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUNqRCxDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxVQUFVO29CQUNYLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBQSxzQkFBYyxHQUFFLENBQUMsQ0FBQztvQkFDaEMsTUFBTTtnQkFDVixLQUFLLGtCQUFrQjtvQkFDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFBLDhCQUFzQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDNUQsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCx1Q0FBdUM7UUFDdkMsSUFDSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ2YsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDMUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFDOUI7WUFDRSxPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU87U0FDVjtRQUVELHlDQUF5QztRQUN6QyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFN0IsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXhGRCx1QkF3RkMifQ==