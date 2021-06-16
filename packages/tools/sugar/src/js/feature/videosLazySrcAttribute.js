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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9zTGF6eVNyY0F0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZGVvc0xhenlTcmNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sY0FBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8saUJBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFrQ3pELFNBQVMscUJBQXFCLENBQUMsV0FBb0QsRUFBRTtJQUNuRixRQUFRLG1CQUNOLE1BQU0sRUFBRSxFQUFFLElBQ1AsUUFBUSxDQUNaLENBQUM7SUFDRixpQkFBaUIsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNELGNBQWMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDbkQsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxxQkFBcUIsQ0FBQyJ9