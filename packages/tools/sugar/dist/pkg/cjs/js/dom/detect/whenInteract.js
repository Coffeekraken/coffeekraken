"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WhenInteractSettingsInterface_1 = __importDefault(require("./interface/WhenInteractSettingsInterface"));
function whenInteract(elm, settings) {
    return new Promise((resolve, reject) => {
        settings = (WhenInteractSettingsInterface_1.default.apply(settings !== null && settings !== void 0 ? settings : {}));
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
exports.default = whenInteract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLDhHQUF3RjtBQXNDeEYsU0FBd0IsWUFBWSxDQUNoQyxHQUFnQixFQUNoQixRQUF5QztJQUV6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsR0FBMEIsQ0FDOUIsdUNBQStCLENBQUMsS0FBSyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN4RCxDQUFDO1FBRUYsU0FBUyxVQUFVLENBQUMsV0FBVztZQUMzQix3QkFBd0I7WUFDeEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXJCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDaEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVELFNBQVMsU0FBUyxDQUFDLENBQUM7WUFDaEIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDcEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNoRDtRQUVELFNBQVMsUUFBUSxDQUFDLENBQUM7WUFDZixVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNuQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsU0FBUyxLQUFLLENBQUMsQ0FBQztZQUNaLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ2hCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEM7UUFFRCxTQUFTLFVBQVUsQ0FBQyxDQUFDO1lBQ2pCLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbEQ7UUFFRCxTQUFTLFFBQVEsQ0FBQyxDQUFDO1lBQ2YsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM5QztRQUVELFNBQVMsS0FBSyxDQUFDLENBQUM7WUFDWixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBakVELCtCQWlFQyJ9