"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WhenInteractSettingsInterface_1 = __importDefault(require("./interface/WhenInteractSettingsInterface"));
function __whenInteract(elm, settings) {
    return new Promise((resolve, reject) => {
        settings = (WhenInteractSettingsInterface_1.default.apply(settings !== null && settings !== void 0 ? settings : {}));
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
exports.default = __whenInteract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLDhHQUF3RjtBQTZDeEYsU0FBd0IsY0FBYyxDQUNsQyxHQUFnQixFQUNoQixRQUF5QztJQUV6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLFFBQVEsR0FBMEIsQ0FDOUIsdUNBQStCLENBQUMsS0FBSyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN4RCxDQUFDO1FBRUYsU0FBUyxVQUFVLENBQUMsV0FBVztZQUMzQix3QkFBd0I7WUFDeEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXJCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDcEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNsRCxHQUFHLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDbEQsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUVELFNBQVMsV0FBVyxDQUFDLENBQUM7WUFDbEIsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUNwRDtRQUVELFNBQVMsVUFBVSxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDckIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNsRDtRQUVELFNBQVMsV0FBVyxDQUFDLENBQUM7WUFDbEIsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUNwRDtRQUVELFNBQVMsVUFBVSxDQUFDLENBQUM7WUFDakIsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDckIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNsRDtRQUVELFNBQVMsUUFBUSxDQUFDLENBQUM7WUFDZixVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNuQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsU0FBUyxLQUFLLENBQUMsQ0FBQztZQUNaLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUN6QixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFqRUQsaUNBaUVDIn0=