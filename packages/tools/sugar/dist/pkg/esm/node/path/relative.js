import __path from 'path';
import __isGlob from '../../shared/is/glob';
import __isPath from '../../shared/is/path';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBbUNoRCxTQUFTLFFBQVEsQ0FDYixJQUFJLEVBQ0osSUFBSSxHQUFHLGdCQUFnQixFQUFFLEVBQ3pCLFdBQThCLEVBQUU7SUFFaEMsUUFBUSxtQkFDSixJQUFJLEVBQUUsSUFBSSxFQUNWLFFBQVEsRUFBRSxJQUFJLElBQ1gsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLElBQUksQ0FBQyxPQUFPO1FBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNsQixJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLElBQUksUUFBUSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxPQUFPLENBQUMsQ0FBQztTQUNaO2FBQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdCLElBQUksUUFBUSxDQUFDLFFBQVE7Z0JBQUUsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2RCxPQUFPLENBQUMsQ0FBQztTQUNaO2FBQU0sSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxPQUFPO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDekIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUVELGVBQWUsUUFBUSxDQUFDIn0=