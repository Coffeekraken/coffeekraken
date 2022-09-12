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
export default function __dependencyTree(filePath, settings) {
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
            let cachedValue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxLQUFLLE1BQU0sd0JBQXdCLENBQUM7QUFDM0MsT0FBTyxXQUFXLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQTJDOUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FDcEMsUUFBZ0IsRUFDaEIsUUFBbUQ7SUFFbkQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3RELFdBQVc7UUFDWCxNQUFNLEdBQUcsR0FBb0MsV0FBVyxDQUNwRDtZQUNJLElBQUksRUFBRSxLQUFLO1lBQ1gsS0FBSyxFQUFFLEtBQUs7U0FDZixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFOUQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0RBQXdELFFBQVEsaUNBQWlDLENBQ3BHLENBQUM7U0FDTDtRQUVELGtCQUFrQjtRQUNsQixJQUFJLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxFQUN2QixXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFFbEQsdUJBQXVCO1FBQ3ZCLE1BQU0sZUFBZSxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO1FBQzdELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNsQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUMvRDtRQUVELGFBQWE7UUFDYixpREFBaUQ7UUFFakQsWUFBWTtRQUNaLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDNUIsa0JBQWtCO1lBQ2xCLFdBQVc7U0FDZCxDQUFDLENBQUM7UUFFSCxjQUFjO1FBQ2QsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsbUJBQW1CO2dCQUMxQixLQUFLLEVBQUUsMkRBQTJELE9BQU8sYUFBYTthQUN6RixDQUFDLENBQUM7WUFFSCxXQUFXO1lBQ1gsaURBQWlEO1lBQ2pELElBQUksV0FBVyxDQUFDO1lBQ2hCLElBQUksV0FBVyxFQUFFO2dCQUNiLGtCQUFrQjtnQkFDbEIsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtvQkFDckMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixLQUFLLEVBQUUsbUJBQW1CO3dCQUMxQixLQUFLLEVBQUUsMERBQTBELE9BQU8sVUFBVTtxQkFDckYsQ0FBQyxDQUFDO29CQUVILGdDQUFnQztvQkFDaEMsT0FBTyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNwQzthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQixLQUFLLEVBQUUsMEVBQTBFLE9BQU8sYUFBYTtTQUN4RyxDQUFDLENBQUM7UUFFSCxzQ0FBc0M7UUFDdEMsa0NBQWtDO1FBQ2xDLFlBQVk7UUFDWix3QkFBd0I7UUFDeEIsc0NBQXNDO1FBQ3RDLE1BQU07UUFFTixPQUFPO1FBQ1AsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWhCLDJCQUEyQjtRQUMzQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5DLE1BQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssRUFBRSxtQkFBbUI7WUFDMUIsS0FBSyxFQUFFLG9HQUFvRyxPQUFPLFVBQVU7U0FDL0gsQ0FBQyxDQUFDO1FBRUgsd0JBQXdCO1FBQ3hCLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLG1CQUFtQjtnQkFDMUIsS0FBSyxFQUFFLG9FQUFvRSxPQUFPLGFBQWE7YUFDbEcsQ0FBQyxDQUFDO1lBRUgsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsSUFBSTtnQkFDSixTQUFTO2FBQ1osQ0FBQyxDQUFDO1NBQ047UUFFRCxxQkFBcUI7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=