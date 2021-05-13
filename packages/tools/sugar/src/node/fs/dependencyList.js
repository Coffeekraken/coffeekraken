import __dependencyTree from 'dependency-tree';
import __chokidar from 'chokidar';
import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __folderPath from './folderPath';
import __minimatch from 'minimatch';
export default function dependencyList(filePath, settings) {
    return new __SPromise(({ resolve, reject, emit }) => {
        const set = Object.assign({ watch: false, includeItself: false, ignoreInitial: false, exclude: [] }, settings);
        function getList() {
            // rebuild the list
            const list = __dependencyTree
                .toList({
                filename: filePath,
                directory: __folderPath(filePath),
                filter: (path) => {
                    path = __fs.realpathSync(path);
                    for (let i = 0; i < set.exclude.length; i++) {
                        if (__minimatch(path, set.exclude[i]))
                            return false;
                    }
                    return true;
                }
            })
                .map((p) => __fs.realpathSync(p))
                .filter((path) => {
                if (path === filePath && !set.includeItself)
                    return false;
                return true;
            });
            return list;
        }
        if (set.watch) {
            let depWatcher;
            // watch the file itself
            const watcher = __chokidar.watch(filePath, {}).on('change', () => {
                const list = getList();
                if (depWatcher)
                    depWatcher.close();
                depWatcher = __chokidar.watch(list, {}).on('change', (path) => {
                    emit('update', {
                        path,
                        list
                    });
                });
                emit('update', {
                    path: filePath,
                    list: getList()
                });
            });
            if (!set.ignoreInitial) {
                emit('update', {
                    path: filePath,
                    list: getList()
                });
            }
        }
        else {
            resolve({
                path: filePath,
                list: getList()
            });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBlbmRlbmN5TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFnQixNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLFVBQXlCLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUEyQ3BDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUNwQyxRQUFnQixFQUNoQixRQUEyQztJQUUzQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDbEQsTUFBTSxHQUFHLG1CQUNQLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLEtBQUssRUFDcEIsYUFBYSxFQUFFLEtBQUssRUFDcEIsT0FBTyxFQUFFLEVBQUUsSUFDUixRQUFRLENBQ1osQ0FBQztRQUVGLFNBQVMsT0FBTztZQUNkLG1CQUFtQjtZQUNuQixNQUFNLElBQUksR0FBRyxnQkFBZ0I7aUJBQzFCLE1BQU0sQ0FBQztnQkFDTixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsU0FBUyxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQ2pDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNmLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQzNDLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUFFLE9BQU8sS0FBSyxDQUFDO3FCQUNyRDtvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2FBQ0YsQ0FBQztpQkFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNmLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUMxRCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0wsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ2IsSUFBSSxVQUFVLENBQUM7WUFFZix3QkFBd0I7WUFDeEIsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQy9ELE1BQU0sSUFBSSxHQUFHLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixJQUFJLFVBQVU7b0JBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO29CQUM1RCxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNiLElBQUk7d0JBQ0osSUFBSTtxQkFDTCxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDYixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsT0FBTyxFQUFFO2lCQUNoQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO2dCQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxPQUFPLEVBQUU7aUJBQ2hCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sQ0FBQztnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ2hCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIn0=