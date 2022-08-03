"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function onSwipe(elm, cb, settings = {}) {
    settings = Object.assign({ threshold: 100 }, settings);
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;
    const gesuredZone = elm;
    gesuredZone.addEventListener('touchstart', function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
    }, false);
    gesuredZone.addEventListener('touchend', function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleGesure();
    }, false);
    function handleGesure() {
        const swipeNfo = {
            distanceX: Math.abs(touchendX - touchstartX),
            distanceY: Math.abs(touchendY - touchstartY),
        };
        if (touchendX + settings.threshold < touchstartX) {
            swipeNfo.left = true;
        }
        if (touchendX - settings.threshold > touchstartX) {
            swipeNfo.right = true;
        }
        if (touchendY + settings.threshold < touchstartY) {
            swipeNfo.up = true;
        }
        if (touchendY - settings.threshold > touchstartY) {
            swipeNfo.down = true;
        }
        if (swipeNfo.left || swipeNfo.right || swipeNfo.down || swipeNfo.up) {
            cb(swipeNfo);
        }
    }
}
exports.default = onSwipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQStDZCxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFdBQXNDLEVBQUU7SUFDOUQsUUFBUSxtQkFDSixTQUFTLEVBQUUsR0FBRyxJQUNYLFFBQVEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNwQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDbEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN4QixXQUFXLENBQUMsZ0JBQWdCLENBQ3hCLFlBQVksRUFDWixVQUFVLEtBQUs7UUFDWCxXQUFXLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2xELENBQUMsRUFDRCxLQUFLLENBQ1IsQ0FBQztJQUVGLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FDeEIsVUFBVSxFQUNWLFVBQVUsS0FBSztRQUNYLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM1QyxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDNUMsWUFBWSxFQUFFLENBQUM7SUFDbkIsQ0FBQyxFQUNELEtBQUssQ0FDUixDQUFDO0lBRUYsU0FBUyxZQUFZO1FBQ2pCLE1BQU0sUUFBUSxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztZQUM1QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1NBQy9DLENBQUM7UUFDRixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFdBQVcsRUFBRTtZQUM5QyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUNELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsV0FBVyxFQUFFO1lBQzlDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxXQUFXLEVBQUU7WUFDOUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDdEI7UUFDRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFdBQVcsRUFBRTtZQUM5QyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUNELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNqRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEI7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQUNELGtCQUFlLE9BQU8sQ0FBQyJ9