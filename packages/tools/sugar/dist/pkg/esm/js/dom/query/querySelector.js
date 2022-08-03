// @ts-nocheck
import __isVisible from './isVisible';
import __isInViewport from './isInViewport';
import __closestNotVisible from './closestNotVisible';
function querySelector(selector, settings = {}) {
    // extend settings
    settings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // grab the element into the dom
    const elm = settings.rootNode.querySelector(selector);
    // if no element, stop here
    if (!elm)
        return null;
    // check settings
    if (settings.visible === false) {
        if (__isVisible(elm) || __closestNotVisible(elm))
            return null;
    }
    else if (settings.visible === true) {
        if (!__isVisible(elm) || !__closestNotVisible(elm))
            return null;
    }
    if (settings.inViewport === false) {
        if (__isInViewport(elm))
            return null;
    }
    else if (settings.inViewport === true) {
        if (!__isInViewport(elm))
            return null;
    }
    // return the element
    return elm;
}
export default querySelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxjQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUMsT0FBTyxtQkFBbUIsTUFBTSxxQkFBcUIsQ0FBQztBQStDdEQsU0FBUyxhQUFhLENBQ2xCLFFBQXFCLEVBQ3JCLFdBQTRDLEVBQUU7SUFFOUMsa0JBQWtCO0lBQ2xCLFFBQVEsbUJBQ0osT0FBTyxFQUFFLElBQUksRUFDYixVQUFVLEVBQUUsSUFBSSxFQUNoQixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksSUFDcEIsUUFBUSxDQUNkLENBQUM7SUFFRixnQ0FBZ0M7SUFDaEMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsMkJBQTJCO0lBQzNCLElBQUksQ0FBQyxHQUFHO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFdEIsaUJBQWlCO0lBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7UUFDNUIsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDakU7U0FBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztLQUNuRTtJQUNELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7UUFDL0IsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDekM7SUFFRCxxQkFBcUI7SUFDckIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==