"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const easeInOutQuart_js_1 = __importDefault(require("../easing/easeInOutQuart.js"));
function __easeInterval(duration, cb, settings = {}) {
    let cleared = false, animationFrame;
    const pro = new s_promise_1.default(({ resolve, reject, emit, on }) => {
        settings = Object.assign({ interval: 1000 / 25, easing: easeInOutQuart_js_1.default, from: 0, to: 100, onEnd: undefined }, settings);
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
exports.default = __easeInterval;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0VBQWlEO0FBQ2pELG9GQUEyRDtBQW9EM0QsU0FBd0IsY0FBYyxDQUNsQyxRQUFnQixFQUNoQixFQUFZLEVBQ1osV0FBMkMsRUFBRTtJQUU3QyxJQUFJLE9BQU8sR0FBRyxLQUFLLEVBQ2YsY0FBYyxDQUFDO0lBRW5CLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtRQUN6RCxRQUFRLG1CQUNKLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUNuQixNQUFNLEVBQUUsMkJBQWdCLEVBQ3hCLElBQUksRUFBRSxDQUFDLEVBQ1AsRUFBRSxFQUFFLEdBQUcsRUFDUCxLQUFLLEVBQUUsU0FBUyxJQUNiLFFBQVEsQ0FDZCxDQUFDO1FBQ0YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsU0FBUyxPQUFPOztZQUNaLElBQUksT0FBTztnQkFBRSxPQUFPO1lBQ3BCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQzVELGFBQWE7WUFDYixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDMUQsa0NBQWtDO1lBQ2xDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqQixJQUFJLE9BQU8sR0FBRyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxPQUFPO29CQUFFLE9BQU87Z0JBQ3BCLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDSCxNQUFBLFFBQVEsQ0FBQyxLQUFLLHdEQUFJLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN6QjtRQUNMLENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBM0NELGlDQTJDQyJ9