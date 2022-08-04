// @ts-nocheck
import __getAnimationProperties from './getAnimationProperties';
function getAnimationsFromElement($elm) {
    const properties = __getAnimationProperties($elm);
    const animations = [];
    properties.name.forEach((name, i) => {
        animations.push({
            name,
            duration: properties.duration[i],
            delay: properties.delay[i],
            timingFunction: properties.timingFunction[i],
            iterationCount: properties.iterationCount[i],
            direction: properties.direction[i],
            playState: properties.playState[i],
            fillMode: properties.fillMode[i],
        });
    });
    return animations;
}
export default getAnimationsFromElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLHdCQUF3QixNQUFNLDBCQUEwQixDQUFDO0FBbURoRSxTQUFTLHdCQUF3QixDQUFDLElBQWlCO0lBQy9DLE1BQU0sVUFBVSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELE1BQU0sVUFBVSxHQUErQyxFQUFFLENBQUM7SUFFbEUsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDaEMsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNaLElBQUk7WUFDSixRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM1QyxjQUFjLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBQ0QsZUFBZSx3QkFBd0IsQ0FBQyJ9