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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25TY3JvbGxFbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvblNjcm9sbEVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBcUNkLE1BQU0sQ0FBQyxPQUFPLFVBQVUsV0FBVyxDQUNqQyxJQUFpQixFQUNqQixRQUFrQixFQUNsQixRQUErQjtJQUUvQixNQUFNLGFBQWEsbUJBQ2pCLE1BQU0sRUFBRSxFQUFFLEVBQ1YsSUFBSSxFQUFFLEtBQUssRUFDWCxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQ04sQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztJQUVuQixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQztJQUM5QixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUM1QixJQUFJLElBQUksS0FBSyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtRQUNqQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2Qsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1FBQzlCLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0tBQ3pDO1NBQU0sSUFBSSxJQUFJLEtBQUssTUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzVCLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0tBQ3pDO0lBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxFQUNmLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFWixNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFFN0IsSUFBSSxVQUFVLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztRQUMxQyxJQUFJLE1BQU0sRUFBRTtZQUNWLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3BDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDdkMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ25CLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQy9FLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQy9FLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQ2hGLENBQUM7U0FDSDthQUFNO1lBQ0wsY0FBYyxHQUFHLGdCQUFnQixDQUFDLFlBQVksQ0FBQztZQUMvQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7U0FDNUM7UUFFRCxJQUNFLE1BQU07WUFDTixTQUFTLEdBQUcsY0FBYztnQkFDeEIsVUFBVSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQ25DO1lBQ0EsUUFBUSxFQUFFLENBQUM7WUFDWCxLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksYUFBYSxDQUFDLElBQUksRUFBRTtnQkFDdEIsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ25FLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDaEI7aUJBQU0sSUFBSSxhQUFhLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRTtnQkFDbEUsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQ25FLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDaEI7U0FDRjthQUFNLElBQ0wsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDLFNBQVM7WUFDMUQsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQ3BEO1lBQ0EsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNmO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDbEUsQ0FBQyJ9