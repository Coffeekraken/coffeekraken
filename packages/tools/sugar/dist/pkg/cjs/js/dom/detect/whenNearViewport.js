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
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dom_1 = require("@coffeekraken/sugar/dom");
function __whenNearViewport(elm, settings = {}) {
    function getRootMargin() {
        return [
            `${Math.round(window.innerHeight * 0.5)}px`,
            `${Math.round(window.innerWidth * 0.5)}px`,
            `${Math.round(window.innerHeight * 0.5)}px`,
            `${Math.round(window.innerWidth * 0.5)}px`,
        ].join(' ');
    }
    settings = Object.assign({}, settings);
    let observer, resizeTimeout;
    let $closest = (0, dom_1.__closestScrollable)(elm);
    if (($closest === null || $closest === void 0 ? void 0 : $closest.tagName) === 'HTML')
        $closest = null;
    return new s_promise_1.default(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const options = {
            root: $closest,
            rootMargin: (_a = settings.offset) !== null && _a !== void 0 ? _a : getRootMargin(),
            threshold: 0, // visible amount of item shown in relation to root
        };
        function onChange(changes, observer) {
            changes.forEach((change) => {
                var _a;
                if (change.intersectionRatio > 0) {
                    (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                    resolve(elm);
                }
            });
        }
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
        window.addEventListener('resize', (e) => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                var _a, _b;
                (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                options.rootMargin = (_b = settings.offset) !== null && _b !== void 0 ? _b : getRootMargin();
                observer = new IntersectionObserver(onChange, options);
                observer.observe(elm);
            }, 500);
        });
    }));
}
exports.default = __whenNearViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCxpREFBOEQ7QUFxQzlELFNBQXdCLGtCQUFrQixDQUN0QyxHQUFnQixFQUNoQixXQUFnRCxFQUFFO0lBRWxELFNBQVMsYUFBYTtRQUNsQixPQUFPO1lBQ0gsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDM0MsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDMUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDM0MsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUk7U0FDN0MsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVEscUJBQ0QsUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLFFBQThCLEVBQUUsYUFBcUIsQ0FBQztJQUUxRCxJQUFJLFFBQVEsR0FBRyxJQUFBLHlCQUFtQixFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLElBQUksQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxNQUFLLE1BQU07UUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBRWxELE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFOztRQUN4QyxNQUFNLE9BQU8sR0FBRztZQUNaLElBQUksRUFBRSxRQUFRO1lBQ2QsVUFBVSxFQUFFLE1BQUEsUUFBUSxDQUFDLE1BQU0sbUNBQUksYUFBYSxFQUFFO1lBQzlDLFNBQVMsRUFBRSxDQUFDLEVBQUUsbURBQW1EO1NBQ3BFLENBQUM7UUFFRixTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUTtZQUMvQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7O2dCQUN2QixJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLEVBQUU7b0JBQzlCLE1BQUEsUUFBUSxDQUFDLFVBQVUsd0RBQUksQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNwQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDNUIsYUFBYSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7O2dCQUM1QixNQUFBLFFBQVEsQ0FBQyxVQUFVLHdEQUFJLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsTUFBQSxRQUFRLENBQUMsTUFBTSxtQ0FBSSxhQUFhLEVBQUUsQ0FBQztnQkFDeEQsUUFBUSxHQUFHLElBQUksb0JBQW9CLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFuREQscUNBbURDIn0=