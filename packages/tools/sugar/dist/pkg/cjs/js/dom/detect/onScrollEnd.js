"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function onScrollEnd($elm, callback, settings) {
    const finalSettings = Object.assign({ offset: 20, once: false, times: -1 }, (settings !== null && settings !== void 0 ? settings : {}));
    let isBody = false;
    let $scrollListenedElm = $elm;
    let $scrollHeightElm = $elm;
    if ($elm === window.document.body) {
        isBody = true;
        $scrollListenedElm = document;
        $scrollHeightElm = window.document.body;
    }
    else if ($elm === window.document) {
        isBody = true;
        $elm = window.document.body;
        $scrollHeightElm = window.document.body;
    }
    let active = true, count = 0;
    const internalCallback = (e) => {
        let fullHeight, viewportHeight, scrollTop;
        if (isBody) {
            viewportHeight = window.innerHeight;
            scrollTop = $scrollHeightElm.scrollTop;
            fullHeight = Math.max(window.document.body.scrollHeight, window.document.documentElement.scrollHeight, window.document.body.offsetHeight, window.document.documentElement.offsetHeight, window.document.body.clientHeight, window.document.documentElement.clientHeight);
        }
        else {
            viewportHeight = $scrollHeightElm.offsetHeight;
            scrollTop = $scrollHeightElm.scrollTop;
            fullHeight = $scrollHeightElm.scrollHeight;
        }
        if (active &&
            scrollTop + viewportHeight >= fullHeight - finalSettings.offset) {
            callback();
            count++;
            if (finalSettings.once) {
                $scrollListenedElm.removeEventListener('scroll', internalCallback);
                active = false;
            }
            else if (finalSettings.times > 0 &&
                count >= finalSettings.times) {
                $scrollListenedElm.removeEventListener('scroll', internalCallback);
                active = false;
            }
        }
        else if ($scrollHeightElm.offsetHeight + $scrollHeightElm.scrollTop <
            $scrollHeightElm.scrollHeight - finalSettings.offset) {
            active = true;
        }
    };
    $scrollListenedElm.addEventListener('scroll', internalCallback);
}
exports.default = onScrollEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQXdDZCxTQUF3QixXQUFXLENBQy9CLElBQWlCLEVBQ2pCLFFBQWtCLEVBQ2xCLFFBQStCO0lBRS9CLE1BQU0sYUFBYSxtQkFDZixNQUFNLEVBQUUsRUFBRSxFQUNWLElBQUksRUFBRSxLQUFLLEVBQ1gsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUNOLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFFbkIsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7SUFDOUIsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDNUIsSUFBSSxJQUFJLEtBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDL0IsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztRQUM5QixnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztLQUMzQztTQUFNLElBQUksSUFBSSxLQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDakMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM1QixnQkFBZ0IsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztLQUMzQztJQUVELElBQUksTUFBTSxHQUFHLElBQUksRUFDYixLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzNCLElBQUksVUFBVSxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUM7UUFDMUMsSUFBSSxNQUFNLEVBQUU7WUFDUixjQUFjLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNwQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQ2pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksRUFDNUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUMvQyxDQUFDO1NBQ0w7YUFBTTtZQUNILGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7WUFDL0MsU0FBUyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztZQUN2QyxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO1NBQzlDO1FBRUQsSUFDSSxNQUFNO1lBQ04sU0FBUyxHQUFHLGNBQWMsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFDakU7WUFDRSxRQUFRLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO2dCQUNwQixrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FDbEMsUUFBUSxFQUNSLGdCQUFnQixDQUNuQixDQUFDO2dCQUNGLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDbEI7aUJBQU0sSUFDSCxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUM7Z0JBQ3ZCLEtBQUssSUFBSSxhQUFhLENBQUMsS0FBSyxFQUM5QjtnQkFDRSxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FDbEMsUUFBUSxFQUNSLGdCQUFnQixDQUNuQixDQUFDO2dCQUNGLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDbEI7U0FDSjthQUFNLElBQ0gsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDLFNBQVM7WUFDMUQsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQ3REO1lBQ0UsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNqQjtJQUNMLENBQUMsQ0FBQztJQUVGLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUEvRUQsOEJBK0VDIn0=