"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const easeInOutQuart_1 = __importDefault(require("../easing/easeInOutQuart"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
function default_1(duration, cb, settings = {}) {
    let cleared = false, animationFrame;
    const pro = new s_promise_1.default(({ resolve, reject, emit, on }) => {
        settings = Object.assign({ interval: 1000 / 25, easing: easeInOutQuart_1.default, from: 0, to: 100, onEnd: undefined }, settings);
        const startTime = Date.now();
        on('cancel', () => {
            cleared = true;
            cancelAnimationFrame(animationFrame);
        });
        function animate() {
            var _a;
            if (cleared)
                return;
            const percent = (100 / duration) * (Date.now() - startTime);
            // @ts-ignore
            const easedPercent = settings.easing(percent / 100) * 100;
            // emit('interval', easedPercent);
            cb(easedPercent);
            if (percent < 100) {
                if (cleared)
                    return;
                animationFrame = requestAnimationFrame(animate);
            }
            else {
                (_a = settings.onEnd) === null || _a === void 0 ? void 0 : _a.call(settings);
                resolve(easedPercent);
            }
        }
        animate();
    });
    return pro;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQXdEO0FBQ3hELHdFQUFpRDtBQTZDakQsbUJBQ0ksUUFBZ0IsRUFDaEIsRUFBWSxFQUNaLFdBQTJDLEVBQUU7SUFFN0MsSUFBSSxPQUFPLEdBQUcsS0FBSyxFQUNmLGNBQWMsQ0FBQztJQUVuQixNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7UUFDekQsUUFBUSxtQkFDSixRQUFRLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFDbkIsTUFBTSxFQUFFLHdCQUFnQixFQUN4QixJQUFJLEVBQUUsQ0FBQyxFQUNQLEVBQUUsRUFBRSxHQUFHLEVBQ1AsS0FBSyxFQUFFLFNBQVMsSUFDYixRQUFRLENBQ2QsQ0FBQztRQUNGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU3QixFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUNkLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsT0FBTzs7WUFDWixJQUFJLE9BQU87Z0JBQUUsT0FBTztZQUNwQixNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUM1RCxhQUFhO1lBQ2IsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFELGtDQUFrQztZQUNsQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDakIsSUFBSSxPQUFPLEdBQUcsR0FBRyxFQUFFO2dCQUNmLElBQUksT0FBTztvQkFBRSxPQUFPO2dCQUNwQixjQUFjLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkQ7aUJBQU07Z0JBQ0gsTUFBQSxRQUFRLENBQUMsS0FBSyx3REFBSSxDQUFDO2dCQUNuQixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDekI7UUFDTCxDQUFDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQTNDRCw0QkEyQ0MifQ==