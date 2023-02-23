"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const string_1 = require("@coffeekraken/sugar/string");
function __whenVisible($elm, settings) {
    const pro = new s_promise_1.default(({ resolve, reject, emit }) => {
        const finalSettings = Object.assign({ whenVisible: null, whenInvisible: null, once: true }, (settings !== null && settings !== void 0 ? settings : {}));
        // store status for all listeners
        if (!$elm._whenVisibleStatus) {
            $elm._whenVisibleStatus = {};
        }
        // variables
        let isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
        // generate a uniqid for this listener
        const id = (0, string_1.__uniqid)();
        var observer = new IntersectionObserver(function (entries) {
            var _a, _b;
            if (entries[0]['intersectionRatio'] == 0) {
                // prevent from triggering multiple times the callback
                // for this listener if already invisible
                if (!$elm._whenVisibleStatus[id]) {
                    return;
                }
                // set the listener status on the element
                $elm._whenVisibleStatus[id] = false;
                // process callbacks
                (_a = finalSettings.whenInvisible) === null || _a === void 0 ? void 0 : _a.call(finalSettings, $elm);
                // event
                emit('invisible', $elm);
            }
            else {
                // "once" settings support
                if (finalSettings.once) {
                    observer.disconnect();
                }
                // prevent from triggering multiple times the callback
                // for this listener if already visible
                if ($elm._whenVisibleStatus[id]) {
                    return;
                }
                // set the listener status on the element
                $elm._whenVisibleStatus[id] = true;
                // process callbacks
                (_b = finalSettings.whenVisible) === null || _b === void 0 ? void 0 : _b.call(finalSettings, $elm);
                // event
                emit('visible', $elm);
                // resolve the promise only if the "once"
                // setting is true
                if (finalSettings.once) {
                    resolve($elm);
                }
            }
        });
        observer.observe($elm);
        pro.on('cancel', () => {
            observer === null || observer === void 0 ? void 0 : observer.disconnect();
        });
        return pro;
    });
}
exports.default = __whenVisible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLHdFQUFpRDtBQUNqRCx1REFBc0Q7QUF3Q3RELFNBQXdCLGFBQWEsQ0FDakMsSUFBaUIsRUFDakIsUUFBd0M7SUFFeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDckQsTUFBTSxhQUFhLG1CQUNmLFdBQVcsRUFBRSxJQUFJLEVBQ2pCLGFBQWEsRUFBRSxJQUFJLEVBQ25CLElBQUksRUFBRSxJQUFJLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzFCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7U0FDaEM7UUFFRCxZQUFZO1FBQ1osSUFBSSxhQUFhLEdBQUcsS0FBSyxFQUNyQixpQkFBaUIsR0FBRyxLQUFLLEVBQ3pCLGlCQUFpQixHQUFHLElBQUksRUFDeEIsWUFBWSxHQUFHLElBQUksRUFDbkIsY0FBYyxHQUFHLElBQUksQ0FBQztRQUUxQixzQ0FBc0M7UUFDdEMsTUFBTSxFQUFFLEdBQUcsSUFBQSxpQkFBUSxHQUFFLENBQUM7UUFFdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLE9BQU87O1lBQ3JELElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN0QyxzREFBc0Q7Z0JBQ3RELHlDQUF5QztnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDOUIsT0FBTztpQkFDVjtnQkFFRCx5Q0FBeUM7Z0JBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBRXBDLG9CQUFvQjtnQkFDcEIsTUFBQSxhQUFhLENBQUMsYUFBYSw4REFBRyxJQUFJLENBQUMsQ0FBQztnQkFFcEMsUUFBUTtnQkFDUixJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILDBCQUEwQjtnQkFDMUIsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO29CQUNwQixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ3pCO2dCQUVELHNEQUFzRDtnQkFDdEQsdUNBQXVDO2dCQUN2QyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDN0IsT0FBTztpQkFDVjtnQkFFRCx5Q0FBeUM7Z0JBQ3pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBRW5DLG9CQUFvQjtnQkFDcEIsTUFBQSxhQUFhLENBQUMsV0FBVyw4REFBRyxJQUFJLENBQUMsQ0FBQztnQkFFbEMsUUFBUTtnQkFDUixJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUV0Qix5Q0FBeUM7Z0JBQ3pDLGtCQUFrQjtnQkFDbEIsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO29CQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2pCO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQ2xCLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxVQUFVLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBaEZELGdDQWdGQyJ9