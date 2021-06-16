// @ts-nocheck
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
            distanceY: Math.abs(touchendY - touchstartY)
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
export default onSwipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25Td2lwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9uU3dpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQStDZCxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFdBQXNDLEVBQUU7SUFFaEUsUUFBUSxtQkFDTixTQUFTLEVBQUUsR0FBRyxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBRUYsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNwQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDbEIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUN4QixXQUFXLENBQUMsZ0JBQWdCLENBQzFCLFlBQVksRUFDWixVQUFVLEtBQUs7UUFDYixXQUFXLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2hELENBQUMsRUFDRCxLQUFLLENBQ04sQ0FBQztJQUVGLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FDMUIsVUFBVSxFQUNWLFVBQVUsS0FBSztRQUNiLFNBQVMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM1QyxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDNUMsWUFBWSxFQUFFLENBQUM7SUFDakIsQ0FBQyxFQUNELEtBQUssQ0FDTixDQUFDO0lBRUYsU0FBUyxZQUFZO1FBQ25CLE1BQU0sUUFBUSxHQUFHO1lBQ2YsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztZQUM1QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO1NBQzdDLENBQUM7UUFDRixJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFdBQVcsRUFBRTtZQUNoRCxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUNELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsV0FBVyxFQUFFO1lBQ2hELFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxXQUFXLEVBQUU7WUFDaEQsUUFBUSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDcEI7UUFDRCxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxHQUFHLFdBQVcsRUFBRTtZQUNoRCxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUNELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUNuRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDZDtJQUNILENBQUM7QUFDSCxDQUFDO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==