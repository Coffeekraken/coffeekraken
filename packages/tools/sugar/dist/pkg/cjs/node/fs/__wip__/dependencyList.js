"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_tree_1 = __importDefault(require("dependency-tree"));
const chokidar_1 = __importDefault(require("chokidar"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const fs_1 = __importDefault(require("fs"));
const folderPath_1 = __importDefault(require("../folderPath"));
const minimatch_1 = __importDefault(require("minimatch"));
function dependencyList(filePath, settings) {
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        const set = Object.assign({ watch: false, includeItself: false, ignoreInitial: false, exclude: [] }, settings);
        function getList() {
            // rebuild the list
            const list = dependency_tree_1.default
                .toList({
                filename: filePath,
                directory: (0, folderPath_1.default)(filePath),
                filter: (path) => {
                    path = fs_1.default.realpathSync(path);
                    for (let i = 0; i < set.exclude.length; i++) {
                        if ((0, minimatch_1.default)(path, set.exclude[i]))
                            return false;
                    }
                    return true;
                },
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
exports.default = dependencyList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0VBQStDO0FBQy9DLHdEQUFrQztBQUNsQyx3RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLCtEQUF5QztBQUN6QywwREFBb0M7QUE0Q3BDLFNBQXdCLGNBQWMsQ0FDbEMsUUFBZ0IsRUFDaEIsUUFBMkM7SUFFM0MsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUNoRCxNQUFNLEdBQUcsbUJBQ0wsS0FBSyxFQUFFLEtBQUssRUFDWixhQUFhLEVBQUUsS0FBSyxFQUNwQixhQUFhLEVBQUUsS0FBSyxFQUNwQixPQUFPLEVBQUUsRUFBRSxJQUNSLFFBQVEsQ0FDZCxDQUFDO1FBRUYsU0FBUyxPQUFPO1lBQ1osbUJBQW1CO1lBQ25CLE1BQU0sSUFBSSxHQUFHLHlCQUFnQjtpQkFDeEIsTUFBTSxDQUFDO2dCQUNKLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixTQUFTLEVBQUUsSUFBQSxvQkFBWSxFQUFDLFFBQVEsQ0FBQztnQkFDakMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ2IsSUFBSSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDekMsSUFBSSxJQUFBLG1CQUFXLEVBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUUsT0FBTyxLQUFLLENBQUM7cUJBQ3ZEO29CQUNELE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2FBQ0osQ0FBQztpQkFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFlBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNiLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUMxRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztZQUNQLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLFVBQVUsQ0FBQztZQUVmLHdCQUF3QjtZQUN4QixNQUFNLE9BQU8sR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQzdELE1BQU0sSUFBSSxHQUFHLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixJQUFJLFVBQVU7b0JBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQyxVQUFVLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDMUQsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDWCxJQUFJO3dCQUNKLElBQUk7cUJBQ1AsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLE9BQU8sRUFBRTtpQkFDbEIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsT0FBTyxFQUFFO2lCQUNsQixDQUFDLENBQUM7YUFDTjtTQUNKO2FBQU07WUFDSCxPQUFPLENBQUM7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLE9BQU8sRUFBRTthQUNsQixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQW5FRCxpQ0FtRUMifQ==