// @ts-nocheck
import whenInViewport from '../dom/whenInViewport';
import querySelectorLive from '../dom/querySelectorLive';
import deepMerge from '../../shared/object/deepMerge';
function imagesLazySrcAttribute(settings = {}) {
    settings = deepMerge({
        offset: 50,
    }, settings);
    querySelectorLive('img[lazy-src]:not([is])', ($imgElm) => {
        whenInViewport($imgElm, settings.offset).then(() => {
            $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
        });
    });
}
export default imagesLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sU0FBUyxNQUFNLCtCQUErQixDQUFDO0FBbUN0RCxTQUFTLHNCQUFzQixDQUMzQixXQUFxRCxFQUFFO0lBRXZELFFBQVEsR0FBRyxTQUFTLENBQ2hCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBQ0YsaUJBQWlCLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUNyRCxjQUFjLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsc0JBQXNCLENBQUMifQ==