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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW9zTGF6eVNyY0F0dHJpYnV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZpZGVvc0xhenlTcmNBdHRyaWJ1dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sY0FBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8saUJBQWlCLE1BQU0sMEJBQTBCLENBQUM7QUFrQ3pELFNBQVMscUJBQXFCLENBQzFCLFdBQW9ELEVBQUU7SUFFdEQsUUFBUSxtQkFDSixNQUFNLEVBQUUsRUFBRSxJQUNQLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsaUJBQWlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN6RCxjQUFjLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2pELFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUscUJBQXFCLENBQUMifQ==