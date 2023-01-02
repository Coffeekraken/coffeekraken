"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const string_1 = require("@coffeekraken/sugar/string");
function __whenInViewport($elm, settings = {}) {
    settings = Object.assign({ offset: '10px', once: true, whenIn: null, whenOut: null }, settings);
    let observer;
    // generate a uniqid for this listener
    const id = (0, string_1.__uniqid)();
    const pro = new s_promise_1.default(({ resolve, emit }) => {
        const options = {
            root: null,
            rootMargin: settings.offset,
            threshold: 0, // visible amount of item shown in relation to root
        };
        // store status for all listeners
        if (!$elm._whenInViewportStatus) {
            $elm._whenInViewportStatus = {};
        }
        function onChange(changes) {
            changes.forEach((change) => {
                var _a, _b;
                if (change.intersectionRatio === 0) {
                    // prevent from triggering multiple times the callback
                    // for this listener if already invisible
                    if (!$elm._whenInViewportStatus[id]) {
                        return;
                    }
                    // set the listener status on the element
                    $elm._whenInViewportStatus[id] = false;
                    // process callbacks
                    (_a = settings.whenOut) === null || _a === void 0 ? void 0 : _a.call(settings, $elm);
                    // event
                    emit('out', $elm);
                }
                else {
                    // "once" settings support
                    if (settings.once) {
                        observer.disconnect();
                    }
                    // prevent from triggering multiple times the callback
                    // for this listener if already visible
                    if ($elm._whenInViewportStatus[id]) {
                        return;
                    }
                    // set the listener status on the element
                    $elm._whenInViewportStatus[id] = true;
                    // process callbacks
                    (_b = settings.whenIn) === null || _b === void 0 ? void 0 : _b.call(settings, $elm);
                    // event
                    emit('in', $elm);
                    // resolve the promise only if the "once"
                    // setting is true
                    if (settings.once) {
                        resolve($elm);
                    }
                }
            });
        }
        observer = new IntersectionObserver(onChange, options);
        observer.observe($elm);
    });
    pro.on('cancel', () => {
        observer === null || observer === void 0 ? void 0 : observer.disconnect();
    });
    return pro;
}
exports.default = __whenInViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCx1REFBc0Q7QUEwQ3RELFNBQXdCLGdCQUFnQixDQUNwQyxJQUFpQixFQUNqQixXQUE4QyxFQUFFO0lBRWhELFFBQVEsbUJBQ0osTUFBTSxFQUFFLE1BQU0sRUFDZCxJQUFJLEVBQUUsSUFBSSxFQUNWLE1BQU0sRUFBRSxJQUFJLEVBQ1osT0FBTyxFQUFFLElBQUksSUFDVixRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDO0lBRWIsc0NBQXNDO0lBQ3RDLE1BQU0sRUFBRSxHQUFHLElBQUEsaUJBQVEsR0FBRSxDQUFDO0lBRXRCLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDN0MsTUFBTSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFFLG1EQUFtRDtTQUNwRSxDQUFDO1FBRUYsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztTQUNuQztRQUVELFNBQVMsUUFBUSxDQUFDLE9BQU87WUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztnQkFDdkIsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEtBQUssQ0FBQyxFQUFFO29CQUNoQyxzREFBc0Q7b0JBQ3RELHlDQUF5QztvQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDakMsT0FBTztxQkFDVjtvQkFFRCx5Q0FBeUM7b0JBQ3pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBRXZDLG9CQUFvQjtvQkFDcEIsTUFBQSxRQUFRLENBQUMsT0FBTyx5REFBRyxJQUFJLENBQUMsQ0FBQztvQkFFekIsUUFBUTtvQkFDUixJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNyQjtxQkFBTTtvQkFDSCwwQkFBMEI7b0JBQzFCLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDZixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7cUJBQ3pCO29CQUVELHNEQUFzRDtvQkFDdEQsdUNBQXVDO29CQUN2QyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDaEMsT0FBTztxQkFDVjtvQkFFRCx5Q0FBeUM7b0JBQ3pDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBRXRDLG9CQUFvQjtvQkFDcEIsTUFBQSxRQUFRLENBQUMsTUFBTSx5REFBRyxJQUFJLENBQUMsQ0FBQztvQkFFeEIsUUFBUTtvQkFDUixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUVqQix5Q0FBeUM7b0JBQ3pDLGtCQUFrQjtvQkFDbEIsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDakI7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdkQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtRQUNsQixRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsVUFBVSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFyRkQsbUNBcUZDIn0=