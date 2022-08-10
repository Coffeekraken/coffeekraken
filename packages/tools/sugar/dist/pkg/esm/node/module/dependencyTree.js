var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __fs from 'fs';
import __path from 'path';
import __md5 from '../../shared/crypt/md5';
import __deepMerge from '../../shared/object/deepMerge';
import __packageRootDir from '../path/packageRootDir';
import __extractImport from './extractImport';
export default function dependencyTree(filePath, settings) {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        // settings
        const set = __deepMerge({
            deep: false,
            cache: false,
        }, settings || {});
        const logPath = __path.relative(__packageRootDir(), filePath);
        // check filename existence
        if (!__fs.existsSync(filePath)) {
            throw new Error(`dependencyTree: Sorry but the filePath passed "<cyan>${filePath}</cyan>" seems to not exists...`);
        }
        // integrity parts
        let packageJsonMtimeMs = -1, fileMtimeMs = __fs.statSync(filePath).mtimeMs;
        // package.json mtimeMs
        const packageJsonPath = `${__packageRootDir()}/package.json`;
        if (__fs.existsSync(packageJsonPath)) {
            packageJsonMtimeMs = __fs.statSync(packageJsonPath).mtimeMs;
        }
        // init cache
        // const cache = new __SCache('dependency-tree');
        // integrity
        const integrity = __md5.encrypt({
            packageJsonMtimeMs,
            fileMtimeMs,
        });
        // check cache
        if (set.cache) {
            emit('log', {
                group: `s-dependency-tree`,
                value: `<yellow>[cache]</yellow> Checking cache for file "<cyan>${logPath}</cyan>"...`,
            });
            // cache id
            // const cachedValue = await cache.get(filePath);
            const cachedValue;
            if (cachedValue) {
                // check integrity
                if (cachedValue.integrity === integrity) {
                    emit('log', {
                        group: `s-dependency-tree`,
                        value: `<green>[cache]</green> Cache validated for file "<cyan>${logPath}</cyan>"`,
                    });
                    // return the actual valid value
                    return resolve(cachedValue.tree);
                }
            }
        }
        emit('log', {
            group: `s-dependency-tree`,
            value: `<yellow>[generate]</yellow> Generating dependency tree for file "<cyan>${logPath}</cyan>"...`,
        });
        // actually dependency tree generation
        // const tree = __dependencyTree({
        //   ...set,
        //   filename: filePath,
        //   directory: __folderPath(filePath)
        // });
        // tree
        const tree = {};
        // create an SFile instance
        const file = __SFile.new(filePath);
        const imports = __extractImport(file.content);
        emit('log', {
            group: `s-dependency-tree`,
            value: `<green>[generated]</green> Dependency tree generated <green>successfully</green> for file "<cyan>${logPath}</cyan>"`,
        });
        // caching tee if needed
        if (set.cache) {
            emit('log', {
                group: `s-dependency-tree`,
                value: `<yellow>[cache]</yellow> Caching dependency tree for file "<cyan>${logPath}</cyan>"...`,
            });
            yield cache.set(filePath, {
                tree,
                integrity,
            });
        }
        // returning the tree
        resolve(tree);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxLQUFLLE1BQU0sd0JBQXdCLENBQUM7QUFDM0MsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQTJDOUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQ2xDLFFBQWdCLEVBQ2hCLFFBQW1EO0lBRW5ELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUN0RCxXQUFXO1FBQ1gsTUFBTSxHQUFHLEdBQW9DLFdBQVcsQ0FDcEQ7WUFDSSxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxLQUFLO1NBQ2YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUNYLHdEQUF3RCxRQUFRLGlDQUFpQyxDQUNwRyxDQUFDO1NBQ0w7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsRUFDdkIsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRWxELHVCQUF1QjtRQUN2QixNQUFNLGVBQWUsR0FBRyxHQUFHLGdCQUFnQixFQUFFLGVBQWUsQ0FBQztRQUM3RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDbEMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDL0Q7UUFFRCxhQUFhO1FBQ2IsaURBQWlEO1FBRWpELFlBQVk7UUFDWixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzVCLGtCQUFrQjtZQUNsQixXQUFXO1NBQ2QsQ0FBQyxDQUFDO1FBRUgsY0FBYztRQUNkLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsS0FBSyxFQUFFLDJEQUEyRCxPQUFPLGFBQWE7YUFDekYsQ0FBQyxDQUFDO1lBRUgsV0FBVztZQUNYLGlEQUFpRDtZQUNqRCxNQUFNLFdBQVcsQ0FBQztZQUNsQixJQUFJLFdBQVcsRUFBRTtnQkFDYixrQkFBa0I7Z0JBQ2xCLElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLG1CQUFtQjt3QkFDMUIsS0FBSyxFQUFFLDBEQUEwRCxPQUFPLFVBQVU7cUJBQ3JGLENBQUMsQ0FBQztvQkFFSCxnQ0FBZ0M7b0JBQ2hDLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDcEM7YUFDSjtTQUNKO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsS0FBSyxFQUFFLDBFQUEwRSxPQUFPLGFBQWE7U0FDeEcsQ0FBQyxDQUFDO1FBRUgsc0NBQXNDO1FBQ3RDLGtDQUFrQztRQUNsQyxZQUFZO1FBQ1osd0JBQXdCO1FBQ3hCLHNDQUFzQztRQUN0QyxNQUFNO1FBRU4sT0FBTztRQUNQLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVoQiwyQkFBMkI7UUFDM0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuQyxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLEtBQUssRUFBRSxvR0FBb0csT0FBTyxVQUFVO1NBQy9ILENBQUMsQ0FBQztRQUVILHdCQUF3QjtRQUN4QixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDWCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxtQkFBbUI7Z0JBQzFCLEtBQUssRUFBRSxvRUFBb0UsT0FBTyxhQUFhO2FBQ2xHLENBQUMsQ0FBQztZQUVILE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLElBQUk7Z0JBQ0osU0FBUzthQUNaLENBQUMsQ0FBQztTQUNOO1FBRUQscUJBQXFCO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9