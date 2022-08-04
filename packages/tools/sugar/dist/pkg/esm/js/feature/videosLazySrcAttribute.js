// @ts-nocheck
import whenInViewport from '../dom/whenInViewport';
import querySelectorLive from '../dom/querySelectorLive';
function videoLazySrcAttribute(settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    querySelectorLive('video[lazy-src]:not([is])', ($videoElm) => {
        whenInViewport($videoElm, settings.offset).then(() => {
            $videoElm.setAttribute('src', $videoElm.getAttribute('lazy-src'));
        });
    });
}
export default videoLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBa0N6RCxTQUFTLHFCQUFxQixDQUMxQixXQUFvRCxFQUFFO0lBRXRELFFBQVEsbUJBQ0osTUFBTSxFQUFFLEVBQUUsSUFDUCxRQUFRLENBQ2QsQ0FBQztJQUNGLGlCQUFpQixDQUFDLDJCQUEyQixFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDekQsY0FBYyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqRCxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxlQUFlLHFCQUFxQixDQUFDIn0=