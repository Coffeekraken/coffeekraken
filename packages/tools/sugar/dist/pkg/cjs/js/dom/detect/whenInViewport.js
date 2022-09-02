"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
function whenInViewport(elm, settings = {}) {
    settings = Object.assign({ offset: '10px' }, settings);
    let observer;
    const pro = new s_promise_1.default(({ resolve }) => {
        const options = {
            root: null,
            rootMargin: settings.offset,
            threshold: 0, // visible amount of item shown in relation to root
        };
        function onChange(changes) {
            changes.forEach((change) => {
                var _a;
                if (change.intersectionRatio > 0) {
                    // your observer logic
                    (_a = observer.disconnect) === null || _a === void 0 ? void 0 : _a.call(observer);
                    resolve(elm);
                }
            });
        }
        observer = new IntersectionObserver(onChange, options);
        observer.observe(elm);
    });
    pro.on('cancel', () => {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    });
    return pro;
}
exports.default = whenInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQXVDakQsU0FBd0IsY0FBYyxDQUNsQyxHQUFnQixFQUNoQixXQUE4QyxFQUFFO0lBRWhELFFBQVEsbUJBQ0osTUFBTSxFQUFFLE1BQU0sSUFDWCxRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDO0lBRWIsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sT0FBTyxHQUFHO1lBQ1osSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU07WUFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxtREFBbUQ7U0FDcEUsQ0FBQztRQUVGLFNBQVMsUUFBUSxDQUFDLE9BQU87WUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztnQkFDdkIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxFQUFFO29CQUM5QixzQkFBc0I7b0JBQ3RCLE1BQUEsUUFBUSxDQUFDLFVBQVUsd0RBQUksQ0FBQztvQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNoQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1FBQ2xCLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxVQUFVLEVBQUUsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQXJDRCxpQ0FxQ0MifQ==