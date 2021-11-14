var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SCache from '@coffeekraken/s-cache';
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
        const cache = new __SCache('dependency-tree');
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
            const cachedValue = yield cache.get(filePath);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW5jeVRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXBlbmRlbmN5VHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sS0FBSyxNQUFNLHdCQUF3QixDQUFDO0FBQzNDLE9BQU8sV0FBVyxNQUFNLCtCQUErQixDQUFDO0FBQ3hELE9BQU8sZ0JBQWdCLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUEyQzlDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUNsQyxRQUFnQixFQUNoQixRQUFtRDtJQUVuRCxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDdEQsV0FBVztRQUNYLE1BQU0sR0FBRyxHQUFvQyxXQUFXLENBQ3BEO1lBQ0ksSUFBSSxFQUFFLEtBQUs7WUFDWCxLQUFLLEVBQUUsS0FBSztTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU5RCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FDWCx3REFBd0QsUUFBUSxpQ0FBaUMsQ0FDcEcsQ0FBQztTQUNMO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksa0JBQWtCLEdBQUcsQ0FB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