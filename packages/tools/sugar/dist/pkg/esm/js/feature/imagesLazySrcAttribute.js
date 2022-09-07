// @ts-nocheck
import whenInViewport from '../dom/whenInViewport';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import deepMerge from '../../shared/object/deepMerge';
function imagesLazySrcAttribute(settings = {}) {
    settings = deepMerge({
        offset: 50,
    }, settings);
    __querySelectorLive('img[lazy-src]:not([is])', ($imgElm) => {
        whenInViewport($imgElm, settings.offset).then(() => {
            $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
        });
    });
}
export default imagesLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLFNBQVMsTUFBTSwrQkFBK0IsQ0FBQztBQW1DdEQsU0FBUyxzQkFBc0IsQ0FDM0IsV0FBcUQsRUFBRTtJQUV2RCxRQUFRLEdBQUcsU0FBUyxDQUNoQjtRQUNJLE1BQU0sRUFBRSxFQUFFO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUNGLG1CQUFtQixDQUFDLHlCQUF5QixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDdkQsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMvQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxlQUFlLHNCQUFzQixDQUFDIn0=