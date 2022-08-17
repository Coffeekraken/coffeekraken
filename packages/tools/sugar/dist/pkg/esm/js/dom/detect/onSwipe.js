// @ts-nocheck
export default function onSwipe(elm, cb, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUErQ2QsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQzNCLEdBQWdCLEVBQ2hCLEVBQVksRUFDWixXQUFzQyxFQUFFO0lBRXhDLFFBQVEsbUJBQ0osU0FBUyxFQUFFLEdBQUcsSUFDWCxRQUFRLENBQ2QsQ0FBQztJQUVGLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNwQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDcEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztJQUNsQixNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7SUFDeEIsV0FBVyxDQUFDLGdCQUFnQixDQUN4QixZQUFZLEVBQ1osVUFBVSxLQUFLO1FBQ1gsV0FBVyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzlDLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNsRCxDQUFDLEVBQ0QsS0FBSyxDQUNSLENBQUM7SUFFRixXQUFXLENBQUMsZ0JBQWdCLENBQ3hCLFVBQVUsRUFDVixVQUFVLEtBQUs7UUFDWCxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDNUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzVDLFlBQVksRUFBRSxDQUFDO0lBQ25CLENBQUMsRUFDRCxLQUFLLENBQ1IsQ0FBQztJQUVGLFNBQVMsWUFBWTtRQUNqQixNQUFNLFFBQVEsR0FBRztZQUNiLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDNUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztTQUMvQyxDQUFDO1FBQ0YsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxXQUFXLEVBQUU7WUFDOUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFDRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFdBQVcsRUFBRTtZQUM5QyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUN6QjtRQUNELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsV0FBVyxFQUFFO1lBQzlDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxXQUFXLEVBQUU7WUFDOUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFDRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDakUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztBQUNMLENBQUMifQ==