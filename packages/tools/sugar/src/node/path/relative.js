import __isGlob from '../../shared/is/glob';
import __isPath from '../../shared/is/path';
import __path from 'path';
import __packageRootDir from './packageRootDir';
function relative(path, from = __packageRootDir(), settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWxhdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQW1DaEQsU0FBUyxRQUFRLENBQ2IsSUFBSSxFQUNKLElBQUksR0FBRyxnQkFBZ0IsRUFBRSxFQUN6QixXQUE4QixFQUFFO0lBRWhDLFFBQVEsbUJBQ0osSUFBSSxFQUFFLElBQUksRUFDVixRQUFRLEVBQUUsSUFBSSxJQUNYLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsT0FBTztRQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDbEIsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixJQUFJLFFBQVEsQ0FBQyxJQUFJO2dCQUFFLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsT0FBTyxDQUFDLENBQUM7U0FDWjthQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3QixJQUFJLFFBQVEsQ0FBQyxRQUFRO2dCQUFFLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsT0FBTyxDQUFDLENBQUM7U0FDWjthQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEQsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksT0FBTztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3pCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFFRCxlQUFlLFFBQVEsQ0FBQyJ9