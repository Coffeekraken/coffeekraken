// @ts-nocheck
import __WhenInteractSettingsInterface from './interface/WhenInteractSettingsInterface';
export default function whenInteract(elm, settings) {
    return new Promise((resolve, reject) => {
        settings = (__WhenInteractSettingsInterface.apply(settings !== null && settings !== void 0 ? settings : {}));
        function interacted(interaction) {
            // resolving the promise
            resolve(interaction);
            elm.removeEventListener('mouseover', mouseover);
            elm.removeEventListener('mouseout', mouseout);
            elm.removeEventListener('click', click);
            elm.removeEventListener('touchstart', touchstart);
            elm.removeEventListener('touchend', touchend);
            elm.removeEventListener('focus', focus);
            elm.removeEventListener('focusin', focus);
        }
        function mouseover(e) {
            interacted('mouseover');
        }
        if (settings.mouseover) {
            elm.addEventListener('mouseover', mouseover);
        }
        function mouseout(e) {
            interacted('mouseout');
        }
        if (settings.mouseout) {
            elm.addEventListener('mouseout', mouseout);
        }
        function click(e) {
            interacted('click');
        }
        if (settings.click) {
            elm.addEventListener('click', click);
        }
        function touchstart(e) {
            interacted('touchstart');
        }
        if (settings.touchstart) {
            elm.addEventListener('touchstart', touchstart);
        }
        function touchend(e) {
            interacted('touchend');
        }
        if (settings.touchend) {
            elm.addEventListener('touchend', touchend);
        }
        function focus(e) {
            interacted('focus');
        }
        if (settings.focus === true) {
            elm.addEventListener('focus', focus);
            elm.addEventListener('focusin', focus);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBc0N4RixNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FDaEMsR0FBZ0IsRUFDaEIsUUFBeUM7SUFFekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxRQUFRLEdBQTBCLENBQzlCLCtCQUErQixDQUFDLEtBQUssQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDeEQsQ0FBQztRQUVGLFNBQVMsVUFBVSxDQUFDLFdBQVc7WUFDM0Isd0JBQXdCO1lBQ3hCLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVyQixHQUFHLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFRCxTQUFTLFNBQVMsQ0FBQyxDQUFDO1lBQ2hCLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxTQUFTLFFBQVEsQ0FBQyxDQUFDO1lBQ2YsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM5QztRQUVELFNBQVMsS0FBSyxDQUFDLENBQUM7WUFDWixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNoQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsU0FBUyxVQUFVLENBQUMsQ0FBQztZQUNqQixVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUNyQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBQztZQUNmLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ25CLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDOUM7UUFFRCxTQUFTLEtBQUssQ0FBQyxDQUFDO1lBQ1osVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9