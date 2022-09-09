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
import __chokidar from 'chokidar';
import __onProcessExit from '../process/onProcessExit';
export default function __getFiles(paths, settings) {
    return new __SPromise(({ resolve, reject, emit }) => {
        const finalSettings = Object.assign({ cwd: process.cwd(), watch: false, ignoreInitial: false, sFile: false, exclude: __SSugarConfig.get('storage.exclude') }, (settings !== null && settings !== void 0 ? settings : {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxlQUFlLE1BQU0sMEJBQTBCLENBQUM7QUFnRHZELE1BQU0sQ0FBQyxPQUFPLFVBQVUsVUFBVSxDQUM5QixLQUF3QixFQUN4QixRQUFxQztJQUVyQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDaEQsTUFBTSxhQUFhLG1CQUNmLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2xCLEtBQUssRUFBRSxLQUFLLEVBQ1osYUFBYSxFQUFFLEtBQUssRUFDcEIsS0FBSyxFQUFFLEtBQUssRUFDWixPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUMzQyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxVQUFVLEdBQWEsRUFBRSxFQUN6QixhQUFhLEdBQVUsRUFBRSxFQUN6QixhQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUV2QywyREFBMkQ7UUFDM0QsaURBQWlEO1FBQ2pELCtEQUErRDtRQUMvRCxtRUFBbUU7UUFDbkUsMENBQTBDO1FBQzFDLFNBQVMsY0FBYyxDQUFDLE9BQVk7WUFDaEMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDdkMsc0RBQXNE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