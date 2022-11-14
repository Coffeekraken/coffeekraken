var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __chokidar from 'chokidar';
export default function __getFiles(paths, settings) {
    return new __SPromise(({ resolve, reject, emit }) => {
        var _a;
        const finalSettings = Object.assign({ cwd: (_a = settings === null || settings === void 0 ? void 0 : settings.cwd) !== null && _a !== void 0 ? _a : process.cwd(), watch: false, ignoreInitial: false, sFile: false, exclude: __SSugarConfig.get('storage.exclude') }, (settings !== null && settings !== void 0 ? settings : {}));
        let foundFiles = [], watchersReady = [], buildPromises = [];
        // function used only when the finalSettings.watch is false
        // and keeping track on the watchers ready state.
        // when all the watchers are in ready state, this mean that the
        // buildPromises array is full of build promises and we can resolve
        // this process when they are all resolved
        function onWatcherReady(watcher) {
            watchersReady.push(watcher);
            if (watchersReady.length === globs.length) {
                // when all promises are resolved, resolve the promise
                Promise.all(buildPromises).then(() => {
                    resolve({
                        cwd: finalSettings.cwd,
                        sFile: finalSettings.sFile,
                        exclude: finalSettings.exclude,
                        files: foundFiles.map((filePath) => {
                            return finalSettings.sFile
                                ? __SFile.new(filePath)
                                : filePath;
                        }),
                    });
                });
            }
        }
        const globs = Array.isArray(paths) ? paths : [paths];
        // loop on each glob(s) and build the files
        globs.forEach((glob) => {
            // listen for file update and add
            const watcher = __chokidar.watch(glob, {
                cwd: finalSettings.cwd,
                ignored: finalSettings.exclude,
                ignoreInitial: finalSettings.watch && finalSettings.ignoreInitial,
            });
            // make sure we close the watching process
            __onProcessExit(() => {
                return watcher.close();
            });
            // keep track on the watchers ready state
            // to know when we can watch for all the buildPromises
            // state and resolve the process at them end...
            if (!finalSettings.watch) {
                watcher.on('ready', () => {
                    onWatcherReady(watcher);
                });
            }
            ['add', 'change', 'unlink'].forEach((listener) => {
                watcher.on(listener, (relPath) => __awaiter(this, void 0, void 0, function* () {
                    const filePath = `${finalSettings.cwd}/${relPath}`;
                    let file = filePath;
                    if (finalSettings.sFile) {
                        file = __SFile.new(filePath);
                    }
                    let handleFilePromiseResolve;
                    const handleFilePromise = new Promise((resolve) => {
                        handleFilePromiseResolve = resolve;
                    });
                    buildPromises.push(handleFilePromise);
                    // emit an event
                    emit(listener, {
                        file,
                        resolve: handleFilePromiseResolve,
                    });
                    if (listener === 'add' && !foundFiles.includes(file)) {
                        foundFiles.push(file);
                    }
                }));
            });
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBZ0RsQyxNQUFNLENBQUMsT0FBTyxVQUFVLFVBQVUsQ0FDOUIsS0FBd0IsRUFDeEIsUUFBcUM7SUFFckMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztRQUNoRCxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEdBQUcsbUNBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNuQyxLQUFLLEVBQUUsS0FBSyxFQUNaLGFBQWEsRUFBRSxLQUFLLEVBQ3BCLEtBQUssRUFBRSxLQUFLLEVBQ1osT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFDM0MsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLElBQUksVUFBVSxHQUFhLEVBQUUsRUFDekIsYUFBYSxHQUFVLEVBQUUsRUFDekIsYUFBYSxHQUFtQixFQUFFLENBQUM7UUFFdkMsMkRBQTJEO1FBQzNELGlEQUFpRDtRQUNqRCwrREFBK0Q7UUFDL0QsbUVBQW1FO1FBQ25FLDBDQUEwQztRQUMxQyxTQUFTLGNBQWMsQ0FBQyxPQUFZO1lBQ2hDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIs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