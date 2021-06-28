// @ts-nocheck
import whenInViewport from '../dom/whenInViewport';
import querySelectorLive from '../dom/querySelectorLive';
import deepMerge from '../../shared/object/deepMerge';
function imagesLazySrcAttribute(settings = {}) {
    settings = deepMerge({
        offset: 50
    }, settings);
    querySelectorLive('img[lazy-src]:not([is])', ($imgElm) => {
        whenInViewport($imgElm, settings.offset).then(() => {
            $imgElm.setAttribute('src', $imgElm.getAttribute('lazy-src'));
        });
    });
}
export default imagesLazySrcAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTGF6eVNyY0F0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlc0xhenlTcmNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sY0FBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8saUJBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxTQUFTLE1BQU0sK0JBQStCLENBQUM7QUFvQ3RELFNBQVMsc0JBQXNCLENBQUMsV0FBcUQsRUFBRTtJQUNyRixRQUFRLEdBQUcsU0FBUyxDQUNsQjtRQUNFLE1BQU0sRUFBRSxFQUFFO0tBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUNGLGlCQUFpQixDQUFDLHlCQUF5QixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDdkQsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNqRCxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxlQUFlLHNCQUFzQixDQUFDIn0=