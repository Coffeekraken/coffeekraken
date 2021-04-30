"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_tree_1 = __importDefault(require("dependency-tree"));
const chokidar_1 = __importDefault(require("chokidar"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = __importDefault(require("fs"));
const folderPath_1 = __importDefault(require("./folderPath"));
const minimatch_1 = __importDefault(require("minimatch"));
function dependencyList(filePath, settings) {
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        const set = Object.assign({ watch: false, includeItself: false, ignoreInitial: false, exclude: [] }, settings);
        function getList() {
            // rebuild the list
            const list = dependency_tree_1.default
                .toList({
                filename: filePath,
                directory: folderPath_1.default(filePath),
                filter: (path) => {
                    path = fs_1.default.realpathSync(path);
                    for (let i = 0; i < set.exclude.length; i++) {
                        if (minimatch_1.default(path, set.exclude[i]))
                            return false;
                    }
                    return true;
                }
            })
                .map((p) => fs_1.default.realpathSync(p))
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
            const watcher = chokidar_1.default.watch(filePath, {}).on('change', () => {
                const list = getList();
                if (depWatcher)
                    depWatcher.close();
                depWatcher = chokidar_1.default.watch(list, {}).on('change', (path) => {
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
exports.default = dependencyList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeUxpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBlbmRlbmN5TGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNFQUErQztBQUMvQyx3REFBa0M7QUFDbEMsd0VBQWdFO0FBQ2hFLDRDQUFzQjtBQUN0Qiw4REFBd0M7QUFDeEMsMERBQW9DO0FBMkNwQyxTQUF3QixjQUFjLENBQ3BDLFFBQWdCLEVBQ2hCLFFBQTJDO0lBRTNDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDbEQsTUFBTSxHQUFHLG1CQUNQLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLEtBQUssRUFDcEIsYUFBYSxFQUFFLEtBQUssRUFDcEIsT0FBTyxFQUFFLEVBQUUsSUFDUixRQUFRLENBQ1osQ0FBQztRQUVGLFNBQVMsT0FBTztZQUNkLG1CQUFtQjtZQUNuQixNQUFNLElBQUksR0FBRyx5QkFBZ0I7aUJBQzFCLE1BQU0sQ0FBQztnQkFDTixRQUFRLEVBQUUsUUFBUTtnQkFDbEIsU0FBUyxFQUFFLG9CQUFZLENBQUMsUUFBUSxDQUFDO2dCQUNqQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDZixJQUFJLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUMzQyxJQUFJLG1CQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUUsT0FBTyxLQUFLLENBQUM7cUJBQ3JEO29CQUNELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUM7YUFDRixDQUFDO2lCQUNELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWE7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzFELE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDTCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDYixJQUFJLFVBQVUsQ0FBQztZQUVmLHdCQUF3QjtZQUN4QixNQUFNLE9BQU8sR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQy9ELE1BQU0sSUFBSSxHQUFHLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixJQUFJLFVBQVU7b0JBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQyxVQUFVLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDNUQsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDYixJQUFJO3dCQUNKLElBQUk7cUJBQ0wsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLE9BQU8sRUFBRTtpQkFDaEIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDYixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsT0FBTyxFQUFFO2lCQUNoQixDQUFDLENBQUM7YUFDSjtTQUNGO2FBQU07WUFDTCxPQUFPLENBQUM7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUNoQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5FRCxpQ0FtRUMifQ==