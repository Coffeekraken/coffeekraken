var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SPromise from '@coffeekraken/s-promise';
import __SCache from '@coffeekraken/s-cache';
import __deepMerge from '../../shared/object/deepMerge';
import __fs from 'fs';
import __packageRootDir from '../path/packageRootDir';
import __md5 from '../../shared/crypt/md5';
import __path from 'path';
import __SFile from '@coffeekraken/s-file';
import __extractImport from './extractImport';
export default function dependencyTree(filePath, settings) {
    return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
        // settings
        const set = __deepMerge({
            deep: false,
            cache: false
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
        const cache = new __SCache('dependency-tree');
        // integrity
        const integrity = __md5.encrypt({
            packageJsonMtimeMs,
            fileMtimeMs
        });
        // check cache
        if (set.cache) {
            emit('log', {
                group: `s-dependency-tree`,
                value: `<yellow>[cache]</yellow> Checking cache for file "<cyan>${logPath}</cyan>"...`
            });
            // cache id
            const cachedValue = yield cache.get(filePath);
            if (cachedValue) {
                // check integrity
                if (cachedValue.integrity === integrity) {
                    emit('log', {
                        group: `s-dependency-tree`,
                        value: `<green>[cache]</green> Cache validated for file "<cyan>${logPath}</cyan>"`
                    });
                    // return the actual valid value
                    return resolve(cachedValue.tree);
                }
            }
        }
        emit('log', {
            group: `s-dependency-tree`,
            value: `<yellow>[generate]</yellow> Generating dependency tree for file "<cyan>${logPath}</cyan>"...`
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
            value: `<green>[generated]</green> Dependency tree generated <green>successfully</green> for file "<cyan>${logPath}</cyan>"`
        });
        // caching tee if needed
        if (set.cache) {
            emit('log', {
                group: `s-dependency-tree`,
                value: `<yellow>[cache]</yellow> Caching dependency tree for file "<cyan>${logPath}</cyan>"...`
            });
            yield cache.set(filePath, {
                tree,
                integrity
            });
        }
        // returning the tree
        resolve(tree);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeVRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBlbmRlbmN5VHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLFdBQVcsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxnQkFBZ0IsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEtBQUssTUFBTSx3QkFBd0IsQ0FBQztBQUUzQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUF5QzlDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUNwQyxRQUFnQixFQUNoQixRQUFtRDtJQUVuRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEQsV0FBVztRQUNYLE1BQU0sR0FBRyxHQUFvQyxXQUFXLENBQ3REO1lBQ0UsSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztTQUNiLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUFDO1FBRUYsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlELDJCQUEyQjtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUNiLHdEQUF3RCxRQUFRLGlDQUFpQyxDQUNsRyxDQUFDO1NBQ0g7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxrQkFBa0IsR0FBRyxDQUFD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