// @ts-nocheck
import __whenInViewport from '../dom/detect/whenInViewport.js';
import __querySelectorLive from '../dom/query/querySelectorLive.js';
import __fastdom from 'fastdom';
import deepMerge from '../../shared/object/deepMerge.js';
export default function __imagesLazySrcAttribute(settings = {}) {
    settings = deepMerge({
        offset: 50,
    }, settings);
    __querySelectorLive('img[lazy-src]:not([is])', ($imgElm) => {
        __whenInViewport($imgElm, settings.offset).then(() => {
            __fastdom.mutate(() => {
                $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
            });
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGdCQUFnQixNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sbUJBQW1CLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sU0FBUyxNQUFNLGtDQUFrQyxDQUFDO0FBcUN6RCxNQUFNLENBQUMsT0FBTyxVQUFVLHdCQUF3QixDQUM1QyxXQUFxRCxFQUFFO0lBRXZELFFBQVEsR0FBRyxTQUFTLENBQ2hCO1FBQ0ksTUFBTSxFQUFFLEVBQUU7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBQ0YsbUJBQW1CLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN2RCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDakQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=