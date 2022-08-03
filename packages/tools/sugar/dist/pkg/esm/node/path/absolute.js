import __path from 'path';
import __isGlob from '../../shared/is/glob';
import __isPath from '../../shared/is/path';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBbUNoRCxTQUFTLFFBQVEsQ0FDYixJQUFJLEVBQ0osSUFBSSxHQUFHLGdCQUFnQixFQUFFLEVBQ3pCLFdBQThCLEVBQUU7SUFFaEMsUUFBUSxtQkFDSixJQUFJLEVBQUUsSUFBSSxJQUNQLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLENBQUMsT0FBTztRQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTVCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDbEIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2IsSUFBSSxRQUFRLENBQUMsSUFBSTtnQkFBRSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxDQUFDO1NBQ1o7YUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQztJQUN6QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBRUQsZUFBZSxRQUFRLENBQUMifQ==