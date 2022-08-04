import __dependencyTree from 'dependency-tree';
import __chokidar from 'chokidar';
import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __folderPath from '../folderPath';
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
                },
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
                        list,
                    });
                });
                emit('update', {
                    path: filePath,
                    list: getList(),
                });
            });
            if (!set.ignoreInitial) {
                emit('update', {
                    path: filePath,
                    list: getList(),
                });
            }
        }
        else {
            resolve({
                path: filePath,
                list: getList(),
            });
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWdCLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBNENwQyxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWMsQ0FDbEMsUUFBZ0IsRUFDaEIsUUFBMkM7SUFFM0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ2hELE1BQU0sR0FBRyxtQkFDTCxLQUFLLEVBQUUsS0FBSyxFQUNaLGFBQWEsRUFBRSxLQUFLLEVBQ3BCLGFBQWEsRUFBRSxLQUFLLEVBQ3BCLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7UUFFRixTQUFTLE9BQU87WUFDWixtQkFBbUI7WUFDbkIsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCO2lCQUN4QixNQUFNLENBQUM7Z0JBQ0osUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFNBQVMsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDO2dCQUNqQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN6QyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBRSxPQUFPLEtBQUssQ0FBQztxQkFDdkQ7b0JBQ0QsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFDSixDQUFDO2lCQUNELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWE7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzFELE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksVUFBVSxDQUFDO1lBRWYsd0JBQXdCO1lBQ3hCLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUM3RCxNQUFNLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxVQUFVO29CQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbkMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDMUQsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDWCxJQUFJO3dCQUNKLElBQUk7cUJBQ1AsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLE9BQU8sRUFBRTtpQkFDbEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsT0FBTyxFQUFFO2lCQUNsQixDQUFDLENBQUM7YUFDTjtTQUNKO2FBQU07WUFDSCxPQUFPLENBQUM7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUNsQixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9