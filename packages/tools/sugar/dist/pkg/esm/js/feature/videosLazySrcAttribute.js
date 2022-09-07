// @ts-nocheck
import whenInViewport from '../dom/whenInViewport';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
function videoLazySrcAttribute(settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    __querySelectorLive('video[lazy-src]:not([is])', ($videoElm) => {
        whenInViewport($videoElm, settings.offset).then(() => {
            $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
        });
    });
}
export default videoLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQWtDOUQsU0FBUyxxQkFBcUIsQ0FDMUIsV0FBb0QsRUFBRTtJQUV0RCxRQUFRLG1CQUNKLE1BQU0sRUFBRSxFQUFFLElBQ1AsUUFBUSxDQUNkLENBQUM7SUFDRixtQkFBbUIsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNELGNBQWMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDakQsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxxQkFBcUIsQ0FBQyJ9