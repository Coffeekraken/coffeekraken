// @ts-nocheck
import __easing from '../../shared/easing/easeInOutQuint';
import querySelectorLive from './querySelectorLive';
import urlParse from 'url-parse';
import scrollTo from './scrollTo';
function autoScrollAnchorLinks(settings = {}) {
    settings = Object.assign({ duration: 500, offset: 0, align: 'top', easing: __easing, checkPathNames: true }, settings);
    querySelectorLive('a:not([is])[href*="#"]', ($link) => {
        // listen for click
        $link.addEventListener('click', (e) => {
            // get the hash
            const linkUrl = urlParse($link.getAttribute('href'));
            const currentUrl = urlParse();
            // chack that we have an hash
            if (!linkUrl.hash || linkUrl.hash === '#')
                return;
            // if it's not the same pathname between the current url and the link one,
            // we do nothing and we let the link behave as he want
            if (settings.checkPathNames && currentUrl.pathname !== linkUrl.pathname)
                return;
            // try to get the target from the hash
            const $target = document.querySelector(linkUrl.hash);
            // if we don't have any target, let the link behave as he wants
            if (!$target)
                return;
            // preventing the link to behave as he wants
            e.preventDefault();
            // append the hash to the history in the url
            history.pushState({}, null, linkUrl.hash);
            // all seems to be good, we can scroll to the target
            scrollTo($target, settings);
        });
    });
}
export default autoScrollAnchorLinks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b1Njcm9sbEFuY2hvckxpbmtzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0b1Njcm9sbEFuY2hvckxpbmtzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFvQ2xDLFNBQVMscUJBQXFCLENBQzVCLFdBQTRDLEVBQUU7SUFHOUMsUUFBUSxtQkFDTixRQUFRLEVBQUUsR0FBRyxFQUNiLE1BQU0sRUFBRSxDQUFDLEVBQ1QsS0FBSyxFQUFFLEtBQUssRUFDWixNQUFNLEVBQUUsUUFBUSxFQUNoQixjQUFjLEVBQUUsSUFBSSxJQUNqQixRQUFRLENBQ1osQ0FBQztJQUVGLGlCQUFpQixDQUFDLHdCQUF3QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDcEQsbUJBQW1CO1FBQ25CLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNwQyxlQUFlO1lBQ2YsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUU5Qiw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxHQUFHO2dCQUFFLE9BQU87WUFFbEQsMEVBQTBFO1lBQzFFLHNEQUFzRDtZQUN0RCxJQUFJLFFBQVEsQ0FBQyxjQUFjLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUTtnQkFBRSxPQUFPO1lBRWhGLHNDQUFzQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyRCwrREFBK0Q7WUFDL0QsSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUVyQiw0Q0FBNEM7WUFDNUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRW5CLDRDQUE0QztZQUM1QyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFDLG9EQUFvRDtZQUNwRCxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsZUFBZSxxQkFBcUIsQ0FBQyJ9