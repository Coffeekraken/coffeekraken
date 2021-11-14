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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzTGF6eVNyY0F0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlc0xhenlTcmNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sY0FBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8saUJBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxTQUFTLE1BQU0sK0JBQStCLENBQUM7QUFtQ3RELFNBQVMsc0JBQXNCLENBQzNCLFdBQXFELEVBQUU7SUFFdkQsUUFBUSxHQUFHLFNBQVMsQ0FDaEI7UUFDSSxNQUFNLEVBQUUsRUFBRTtLQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFDRixpQkFBaUIsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3JELGNBQWMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDL0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxzQkFBc0IsQ0FBQyJ9