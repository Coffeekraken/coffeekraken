// @ts-nocheck
import deepMerge from '../../shared/object/deepMerge';
import querySelectorLive from '../dom/query/querySelectorLive';
function linksStateAttributes(settings = {}) {
    settings = deepMerge({}, settings);
    function handleLink($linkElm) {
        if ($linkElm.getAttribute('href') === document.location.pathname) {
            $linkElm.setAttribute('actual', true);
        }
        else if ($linkElm.getAttribute('href').startsWith(document.location.pathname)) {
            $linkElm.removeAttribute('actual');
            $linkElm.setAttribute('actual-child', true);
        }
        else {
            $linkElm.removeAttribute('actual');
            $linkElm.removeAttribute('actual-child');
        }
    }
    querySelectorLive(`[href]`, ($linkElm) => {
        handleLink($linkElm);
    });
    window.addEventListener('locationchange', () => {
        Array.from(document.querySelectorAll('[href]')).forEach(($linkElm) => {
            handleLink($linkElm);
        });
    });
}
export default linksStateAttributes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua3NTdGF0ZUF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaW5rc1N0YXRlQXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxTQUFTLE1BQU0sK0JBQStCLENBQUM7QUFDdEQsT0FBTyxpQkFBaUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQWlDL0QsU0FBUyxvQkFBb0IsQ0FDekIsV0FBbUQsRUFBRTtJQUVyRCxRQUFRLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVuQyxTQUFTLFVBQVUsQ0FBQyxRQUFRO1FBQ3hCLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUM5RCxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QzthQUFNLElBQ0gsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFDdEU7WUFDRSxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLFFBQVEsQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9DO2FBQU07WUFDSCxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLFFBQVEsQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDckMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUMzQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2pFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsb0JBQW9CLENBQUMifQ==