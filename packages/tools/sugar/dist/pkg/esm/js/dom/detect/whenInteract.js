// @ts-nocheck
import __WhenInteractSettingsInterface from './interface/WhenInteractSettingsInterface';
export default function __whenInteract(elm, settings) {
    return new Promise((resolve, reject) => {
        settings = (__WhenInteractSettingsInterface.apply(settings !== null && settings !== void 0 ? settings : {}));
        function interacted(interaction) {
            // resolving the promise
            resolve(interaction);
            elm.removeEventListener('pointerover', pointerover);
            elm.removeEventListener('pointerout', pointerout);
            elm.removeEventListener('pointerdown', pointerdown);
            elm.removeEventListener('touchstart', touchstart);
            elm.removeEventListener('touchend', touchend);
            elm.removeEventListener('focus', focus);
            elm.removeEventListener('focusin', focus);
        }
        function pointerover(e) {
            interacted('pointerover');
        }
        if (settings.pointerover) {
            elm.addEventListener('pointerover', pointerover);
        }
        function pointerout(e) {
            interacted('pointerout');
        }
        if (settings.pointerout) {
            elm.addEventListener('pointerout', pointerout);
        }
        function pointerdown(e) {
            interacted('pointerdown');
        }
        if (settings.pointerdown) {
            elm.addEventListener('pointerdown', pointerdown);
        }
        function touchstart(e) {
            interacted('touchstart');
        }
        if (settings.touchstart) {
            elm.addEventListener('touchstart', touchstart, {
                passive: true,
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBb0R4RixNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FDbEMsR0FBZ0IsRUFDaEIsUUFBeUM7SUFFekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxRQUFRLEdBQTBCLENBQzlCLCtCQUErQixDQUFDLEtBQUssQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDeEQsQ0FBQztRQUVGLFNBQVMsVUFBVSxDQUFDLFdBQVc7WUFDM0Isd0JBQXdCO1lBQ3hCLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVyQixHQUFHLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNwRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFDO1lBQ2xCLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxTQUFTLFVBQVUsQ0FBQyxDQUFDO1lBQ2pCLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxTQUFTLFdBQVcsQ0FBQyxDQUFDO1lBQ2xCLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDcEQ7UUFFRCxTQUFTLFVBQVUsQ0FBQyxDQUFDO1lBQ2pCLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFO2dCQUMzQyxPQUFPLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUM7U0FDTjtRQUVELFNBQVMsUUFBUSxDQUFDLENBQUM7WUFDZixVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNuQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsU0FBUyxLQUFLLENBQUMsQ0FBQztZQUNaLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUN6QixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==