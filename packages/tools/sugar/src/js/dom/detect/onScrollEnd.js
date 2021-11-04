// @ts-nocheck
export default function onScrollEnd($elm, callback, settings) {
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
        console.log('is', active);
        console.log($elm, scrollTop, viewportHeight, fullHeight, finalSettings.offset);
        console.log(scrollTop + viewportHeight, fullHeight - finalSettings.offset);
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
    console.log($scrollListenedElm);
    $scrollListenedElm.addEventListener('scroll', internalCallback);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25TY3JvbGxFbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvblNjcm9sbEVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBcUNkLE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUMvQixJQUFpQixFQUNqQixRQUFrQixFQUNsQixRQUErQjtJQUUvQixNQUFNLGFBQWEsbUJBQ2YsTUFBTSxFQUFFLEVBQUUsRUFDVixJQUFJLEVBQUUsS0FBSyxFQUNYLEtBQUssRUFBRSxDQUFDLENBQUMsSUFDTixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBRUYsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQzlCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0lBQzVCLElBQUksSUFBSSxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQy9CLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxrQkFBa0IsR0FBRyxRQUFRLENBQUM7UUFDOUIsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDM0M7U0FBTSxJQUFJLElBQUksS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQ2pDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDNUIsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDM0M7SUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQ2IsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUVkLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMzQixJQUFJLFVBQVUsRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDO1FBQzFDLElBQUksTUFBTSxFQUFFO1lBQ1IsY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDcEMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztZQUN2QyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQ2pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FDL0MsQ0FBQztTQUNMO2FBQU07WUFDSCxjQUFjLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO1lBQy9DLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDdkMsVUFBVSxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQztTQUM5QztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBSSxFQUNKLFNBQVMsRUFDVCxjQUFjLEVBQ2QsVUFBVSxFQUNWLGFBQWEsQ0FBQyxNQUFNLENBQ3ZCLENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUNQLFNBQVMsR0FBRyxjQUFjLEVBQzFCLFVBQVUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUNwQyxDQUFDO1FBRUYsSUFDSSxNQUFNO1lBQ04sU0FBUyxHQUFHLGNBQWMsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFDakU7WUFDRSxRQUFRLEVBQUUsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFO2dCQUNwQixrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FDbEMsUUFBUSxFQUNSLGdCQUFnQixDQUNuQixDQUFDO2dCQUNGLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDbEI7aUJBQU0sSUFDSCxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUM7Z0JBQ3ZCLEtBQUssSUFBSSxhQUFhLENBQUMsS0FBSyxFQUM5QjtnQkFDRSxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FDbEMsUUFBUSxFQUNSLGdCQUFnQixDQUNuQixDQUFDO2dCQUNGLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDbEI7U0FDSjthQUFNLElBQ0gsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDLFNBQVM7WUFDMUQsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQ3REO1lBQ0UsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNqQjtJQUNMLENBQUMsQ0FBQztJQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUVoQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNwRSxDQUFDIn0=