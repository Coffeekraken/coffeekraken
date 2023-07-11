// @ts-nocheck
import __isPath from '../../shared/is/isPath.js';
export default function __folderPath(path, settings) {
    const finalSettings = Object.assign({ checkExistence: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (finalSettings.checkExistence) {
        if (!__isPath(path, true))
            return false;
    }
    const parts = path.split('/');
    if (parts.length <= 1) {
        return '';
    }
    return parts.slice(0, -1).join('/');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSwyQkFBMkIsQ0FBQztBQStCakQsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQ2hDLElBQUksRUFDSixRQUF1QztJQUV2QyxNQUFNLGFBQWEsbUJBQ2YsY0FBYyxFQUFFLEtBQUssSUFDbEIsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRTtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztLQUMzQztJQUNELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtRQUNuQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxDQUFDIn0=