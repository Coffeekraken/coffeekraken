// @ts-nocheck
import deepMerge from '../../shared/object/deepMerge';
import querySelectorLive from '../dom/query/querySelectorLive';
function linksStateAttributes(settings = {}) {
    settings = deepMerge({}, settings);
    function handleLink($linkElm) {
        if ($linkElm.getAttribute('href') === document.location.pathname) {
            $linkElm.setAttribute('actual', true);
            console.log('dispatch^', $linkElm);
            $linkElm.dispatchEvent(new CustomEvent('actual', {
                bubbles: true,
            }));
        }
        else if ($linkElm.getAttribute('href').startsWith(document.location.pathname)) {
            $linkElm.removeAttribute('actual');
            $linkElm.setAttribute('actual-child', true);
            $linkElm.dispatchEvent(new CustomEvent('actual', {
                bubbles: true,
            }));
        }
        else {
            $linkElm.removeAttribute('actual');
            $linkElm.removeAttribute('actual-child');
        }
    }
    querySelectorLive(`[href]`, ($linkElm) => {
        handleLink($linkElm);
        setTimeout(() => {
            handleLink($linkElm);
        }, 500);
    });
    window.addEventListener('locationchange', () => {
        Array.from(document.querySelectorAll('[href]')).forEach(($linkElm) => {
            handleLink($linkElm);
        });
    });
}
export default linksStateAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua3NTdGF0ZUF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW5rc1N0YXRlQXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxTQUFTLE1BQU0sK0JBQStCLENBQUM7QUFDdEQsT0FBTyxpQkFBaUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQWlDL0QsU0FBUyxvQkFBb0IsQ0FDekIsV0FBbUQsRUFBRTtJQUVyRCxRQUFRLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVuQyxTQUFTLFVBQVUsQ0FBQyxRQUFRO1FBQ3hCLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM5RCxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNuQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDN0MsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDLENBQUM7U0FDUDthQUFNLElBQ0gsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFDdEU7WUFDRSxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLFFBQVEsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUM3QyxPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUMsQ0FBQztTQUNQO2FBQU07WUFDSCxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLFFBQVEsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDckMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzNDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDakUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxvQkFBb0IsQ0FBQyJ9