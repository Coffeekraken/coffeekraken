// @ts-nocheck
import querySelectorLive from '../dom/querySelectorLive';
import scrollTo from '../dom/scroll/scrollTo';
import easeInOutQuint from '../../shared/easing/easeInOutQuint';
function linksScrollHrefAttribute(settings = {}) {
    settings = Object.assign({ duration: 400, easing: easeInOutQuint }, settings);
    querySelectorLive('[href^="#"][scroll]', ($scrollElm) => {
        $scrollElm.addEventListener('click', (e) => {
            e.preventDefault();
            const $target = document.querySelector(`${$scrollElm.getAttribute('href')}`);
            if (!$target)
                return;
            scrollTo($target, settings.duration, settings.easing);
        });
    });
}
export default linksScrollHrefAttribute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua3NTY3JvbGxIcmVmQXR0cmlidXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlua3NTY3JvbGxIcmVmQXR0cmlidXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGlCQUFpQixNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sUUFBUSxNQUFNLHdCQUF3QixDQUFDO0FBQzlDLE9BQU8sY0FBYyxNQUFNLG9DQUFvQyxDQUFDO0FBb0NoRSxTQUFTLHdCQUF3QixDQUFDLFdBQXVELEVBQUU7SUFDekYsUUFBUSxtQkFDTixRQUFRLEVBQUUsR0FBRyxFQUNiLE1BQU0sRUFBRSxjQUFjLElBQ25CLFFBQVEsQ0FDWixDQUFDO0lBQ0YsaUJBQWlCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUN0RCxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3BDLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNyQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUNyQixRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSx3QkFBd0IsQ0FBQyJ9