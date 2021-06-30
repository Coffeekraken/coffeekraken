export default function onScrollEnd($elm, callback, settings) {
    const finalSettings = Object.assign({ offset: 20, once: false, times: -1 }, (settings !== null && settings !== void 0 ? settings : {}));
    let isBody = false;
    let $scrollListenedElm = $elm;
    let $scrollHeightElm = $elm;
    if ($elm === document.body) {
        isBody = true;
        $scrollListenedElm = document;
        $scrollHeightElm = document.body;
    }
    else if ($elm === document || $elm === window) {
        isBody = true;
        $elm = document.body;
        $scrollHeightElm = document.body;
    }
    let active = true, count = 0;
    const internalCallback = (e) => {
        let fullHeight, viewportHeight, scrollTop;
        if (isBody) {
            viewportHeight = window.innerHeight;
            scrollTop = $scrollHeightElm.scrollTop;
            fullHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        }
        else {
            viewportHeight = $scrollHeightElm.scrollHeight;
            scrollTop = $scrollHeightElm.scrollTop;
            fullHeight = $scrollHeightElm.scrollHeight;
        }
        if (active &&
            scrollTop + viewportHeight >=
                fullHeight - finalSettings.offset) {
            callback();
            count++;
            if (finalSettings.once) {
                $scrollListenedElm.removeEventListener('scroll', internalCallback);
                active = false;
            }
            else if (finalSettings.times > 0 && count >= finalSettings.times) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25TY3JvbGxFbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvblNjcm9sbEVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQ0EsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQ2pDLElBQWlCLEVBQ2pCLFFBQWtCLEVBQ2xCLFFBQStCO0lBRS9CLE1BQU0sYUFBYSxtQkFDakIsTUFBTSxFQUFFLEVBQUUsRUFDVixJQUFJLEVBQUUsS0FBSyxFQUNYLEtBQUssRUFBRSxDQUFDLENBQUMsSUFDTixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQzlCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQzVCLElBQUksSUFBSSxLQUFLLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztRQUM5QixnQkFBZ0IsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0tBQ2xDO1NBQU0sSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDL0MsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3JCLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDbEM7SUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQ2YsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUVaLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUU3QixJQUFJLFVBQVUsRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBQzFDLElBQUksTUFBTSxFQUFFO1lBQ1YsY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDcEMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztZQUN2QyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDbkIsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQ2pFLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUNqRSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FDbEUsQ0FBQztTQUNIO2FBQU07WUFDTCxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO1lBQy9DLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDdkMsVUFBVSxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQztTQUM1QztRQUVELElBQ0UsTUFBTTtZQUNOLFNBQVMsR0FBRyxjQUFjO2dCQUN4QixVQUFVLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFDbkM7WUFDQSxRQUFRLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO2dCQUN0QixrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbkUsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNoQjtpQkFBTSxJQUFJLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUNsRSxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztnQkFDbkUsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNoQjtTQUNGO2FBQU0sSUFDTCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsU0FBUztZQUMxRCxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFDcEQ7WUFDQSxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2Y7SUFDSCxDQUFDLENBQUM7SUFFRixrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNsRSxDQUFDIn0=