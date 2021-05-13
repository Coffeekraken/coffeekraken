import __isGlob from '../../shared/is/glob';
import __isPath from '../../shared/is/path';
import __path from 'path';
import __packageRoot from './packageRoot';
function relative(path, from = __packageRoot(), settings = {}) {
    settings = Object.assign({ glob: true, absolute: true }, settings);
    const isArray = Array.isArray(path);
    if (!isArray)
        path = [path];
    path = path.map((p) => {
        if (__isGlob(p)) {
            if (settings.glob)
                return __path.relative(from, p);
            return p;
        }
        else if (__path.isAbsolute(p)) {
            if (settings.absolute)
                return __path.relative(from, p);
            return p;
        }
        else if (__isPath(p))
            return __path.relative(from, p);
        return p;
    });
    if (isArray)
        return path;
    return path[0];
}
export default relative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWxhdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBa0MxQyxTQUFTLFFBQVEsQ0FDZixJQUFJLEVBQ0osSUFBSSxHQUFHLGFBQWEsRUFBRSxFQUN0QixXQUE4QixFQUFFO0lBRWhDLFFBQVEsbUJBQ04sSUFBSSxFQUFFLElBQUksRUFDVixRQUFRLEVBQUUsSUFBSSxJQUNYLFFBQVEsQ0FDWixDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsT0FBTztRQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDcEIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZixJQUFJLFFBQVEsQ0FBQyxJQUFJO2dCQUFFLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQixJQUFJLFFBQVEsQ0FBQyxRQUFRO2dCQUFFLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3pCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxlQUFlLFFBQVEsQ0FBQyJ9