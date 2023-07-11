"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const chokidar_1 = __importDefault(require("chokidar"));
const onProcessExit_js_1 = __importDefault(require("../process/onProcessExit.js"));
function __getFiles(paths, settings) {
    return new s_promise_1.default(({ resolve, reject, emit }) => {
        var _a;
        const finalSettings = Object.assign({ cwd: (_a = settings === null || settings === void 0 ? void 0 : settings.cwd) !== null && _a !== void 0 ? _a : process.cwd(), watch: false, ignoreInitial: false, sFile: false, exclude: s_sugar_config_1.default.get('storage.exclude') }, (settings !== null && settings !== void 0 ? settings : {}));
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
                                ? s_file_1.default.new(filePath)
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
            const watcher = chokidar_1.default.watch(glob, {
                cwd: finalSettings.cwd,
                ignored: finalSettings.exclude,
                ignoreInitial: finalSettings.watch && finalSettings.ignoreInitial,
            });
            // make sure we close the watching process
            (0, onProcessExit_js_1.default)(() => {
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
                        file = s_file_1.default.new(filePath);
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
exports.default = __getFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBYztBQUNkLGtFQUEyQztBQUMzQyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELHdEQUFrQztBQUNsQyxtRkFBMEQ7QUFpRDFELFNBQXdCLFVBQVUsQ0FDOUIsS0FBd0IsRUFDeEIsUUFBcUM7SUFFckMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7UUFDaEQsTUFBTSxhQUFhLG1CQUNmLEdBQUcsRUFBRSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxHQUFHLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDbkMsS0FBSyxFQUFFLEtBQUssRUFDWixhQUFhLEVBQUUsS0FBSyxFQUNwQixLQUFLLEVBQUUsS0FBSyxFQUNaLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUMzQyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxVQUFVLEdBQWEsRUFBRSxFQUN6QixhQUFhLEdBQVUsRUFBRSxFQUN6QixhQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUV2QywyREFBMkQ7UUFDM0QsaURBQWlEO1FBQ2pELCtEQUErRDtRQUMvRCxtRUFBbUU7UUFDbkUsMENBQTBDO1FBQzFDLFNBQVMsY0FBYyxDQUFDLE9BQVk7WUFDaEMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDdkMsc0RBQXNEO2dCQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFH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