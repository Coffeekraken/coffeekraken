import __isGlob from '../../shared/is/glob';
import __isPath from '../../shared/is/path';
import __path from 'path';
import __packageRootDir from './packageRootDir';
function absolute(path, from = __packageRootDir(), settings = {}) {
    settings = Object.assign({ glob: true }, settings);
    const isArray = Array.isArray(path);
    if (!isArray)
        path = [path];
    path = path.map((p) => {
        if (__path.isAbsolute(p))
            return p;
        if (__isGlob(p)) {
            if (settings.glob)
                return __path.resolve(from, p);
            return p;
        }
        else if (__isPath(p))
            return __path.resolve(from, p);
        return p;
    });
    if (isArray)
        return path;
    return path[0];
}
export default absolute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzb2x1dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYnNvbHV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQW1DaEQsU0FBUyxRQUFRLENBQ2IsSUFBSSxFQUNKLElBQUksR0FBRyxnQkFBZ0IsRUFBRSxFQUN6QixXQUE4QixFQUFFO0lBRWhDLFFBQVEsbUJBQ0osSUFBSSxFQUFFLElBQUksSUFDUCxRQUFRLENBQ2QsQ0FBQztJQUNGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLE9BQU87UUFBRSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUU1QixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2xCLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLElBQUksUUFBUSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsQ0FBQztTQUNaO2FBQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxPQUFPO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDekIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUVELGVBQWUsUUFBUSxDQUFDIn0=