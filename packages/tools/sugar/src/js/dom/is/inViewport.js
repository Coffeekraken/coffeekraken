// @ts-nocheck
function inViewport(elm, settings = {}) {
    settings = Object.assign({ offset: 50 }, settings);
    // handle offset
    let offsetTop = settings.offset;
    let offsetRight = settings.offset;
    let offsetBottom = settings.offset;
    let offsetLeft = settings.offset;
    if (typeof settings.offset === 'object') {
        offsetTop = settings.offset.top || 0;
        offsetRight = settings.offset.right || 0;
        offsetBottom = settings.offset.bottom || 0;
        offsetLeft = settings.offset.left || 0;
    }
    const containerHeight = window.innerHeight || document.documentElement.clientHeight;
    const containerWidth = window.innerWidth || document.documentElement.clientWidth;
    const rect = elm.getBoundingClientRect();
    const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
    const isBottomIn = rect.bottom - offsetTop >= 0;
    const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
    const isRightIn = rect.right - offsetLeft >= 0;
    return isTopIn && isBottomIn && isLeftIn && isRightIn;
}
export default inViewport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQWlDZCxTQUFTLFVBQVUsQ0FBQyxHQUFnQixFQUFFLFdBQWlDLEVBQUU7SUFFdkUsUUFBUSxtQkFDTixNQUFNLEVBQUUsRUFBRSxJQUNQLFFBQVEsQ0FDWixDQUFDO0lBRUYsZ0JBQWdCO0lBQ2hCLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDaEMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ25DLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDakMsSUFBSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQ3ZDLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUN6QyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1FBQzNDLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7S0FDeEM7SUFDRCxNQUFNLGVBQWUsR0FDbkIsTUFBTSxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztJQUM5RCxNQUFNLGNBQWMsR0FDbEIsTUFBTSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztJQUM1RCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUN6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLGVBQWUsR0FBRyxZQUFZLElBQUksQ0FBQyxDQUFDO0lBQy9ELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUNoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsR0FBRyxXQUFXLElBQUksQ0FBQyxDQUFDO0lBQy9ELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBQztJQUMvQyxPQUFPLE9BQU8sSUFBSSxVQUFVLElBQUksUUFBUSxJQUFJLFNBQVMsQ0FBQztBQUN4RCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==