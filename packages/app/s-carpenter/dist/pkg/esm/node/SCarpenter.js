var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __express from 'express';
import __fs from 'fs';
import __SCarpenterStartParamsInterface from './interface/SCarpenterStartParamsInterface';
class SCarpenter extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({
            metas: {
                id: 'SCarpenter',
            },
        }, __SSugarConfig.get('carpenter'), settings || {}));
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order display your components library in a nice and coherent interface
     *
     * @param         {Partial<ISCarpenterStartParams>}          params        The params to use to start your mitosis env
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = (__deepMerge(__SCarpenterStartParamsInterface.defaults(), params));
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[start]</yellow> Starting a new carpenter server...`,
            });
            const app = __express(), watchers = {}, specsMap = {}, specsBySources = {};
            for (let [key, source] of Object.entries(this.settings.sources)) {
                // watchers[key] = __chokidar.watch(source.glob, {
                //     cwd: source.inDir,
                //     ignoreInitial: false,
                // });
                // watchers[key].on('add', (newFileRelPath) => {
                //     const newFileAbsPath = `${source.inDir}/${newFileRelPath}`;
                //     const spec = new __SSpecs();
                //     console.log(newFileAbsPath);
                //     console.log(spec.read(newFileAbsPath));
                // });
                // watchers[key].on('change', (updatedFilePath) => {});
                if (!specsBySources[key]) {
                    specsBySources[key] = Object.assign(Object.assign({}, source), { specs: {} });
                }
                // console.log(key, source);
                const specsInstance = new __SSpecs();
                const specsArray = specsInstance.list(source.specsNamespaces);
                // specsBySources[key].specs = [
                //     ...specsBySources[key].specs,
                //     ...specsArray,
                // ];
                specsArray.forEach((specs) => {
                    const specsJson = specs.read();
                    specsBySources[key].specs[specs.dotpath] = specsJson;
                    specsMap[specs.dotpath] = specsJson;
                    // listen for request on that particular component
                    // app.get(`/json/${specs.dotpath}`, async (req, res) => {
                    //     specs.specs = specs.read();
                    //     res.type('application/json');
                    //     res.send(specs);
                    // });
                });
            }
            // // listen for request on that particular component
            // app.get(`/${specs.dotpath}`, async (req, res) => {
            //     // load html here to have updated html without reloading the server
            //     const html = __fs
            //         .readFileSync(
            //             `${__packageRootDir(
            //                 __dirname(),
            //             )}/src/views/index.html`,
            //         )
            //         .toString();
            //     res.type('text/html');
            //     res.send(html);
            // });
            // listen for requesting the global data like specs by sources, etc...
            app.get(`/carpenter`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.type('application/json');
                res.send({
                    specsMap,
                    specsBySources,
                });
            }));
            app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
                // load html here to have updated html without reloading the server
                const html = __fs
                    .readFileSync(`${__packageRootDir(__dirname())}/src/views/index.html`)
                    .toString();
                res.type('text/html');
                res.send(html);
            }));
            app.get('/dist/css/index.css', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const cssFilePath = `${__packageRootDir(__dirname())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            app.get('/dist/js/index.esm.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${__packageRootDir(__dirname())}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            }));
            let server;
            yield new Promise((_resolve) => {
                server = app.listen(finalParams.port, () => {
                    _resolve();
                });
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[start]</green> Your carpenter server is available at:`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[start]</green> <cyan>http://127.0.0.1:${finalParams.port}</cyan>`,
            });
            __onProcessExit(() => {
                emit('log', {
                    value: `<red>[kill]</red> Gracefully killing the <cyan>mitosis server</cyan>...`,
                });
                return new Promise((resolve) => {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        // @ts-ignore
                        resolve();
                    }));
                });
            });
        }));
    }
}
export default SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQTZDMUYsTUFBTSxVQUFXLFNBQVEsUUFBUTtJQUM3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFlBQVk7YUFDbkI7U0FDSixFQUNELGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQy9CLFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEtBQUssQ0FBQyxNQUF1QztRQUN6QyxNQUFNLFdBQVcsR0FBMkIsQ0FDeEMsV0FBVyxDQUFDLGdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUNuRSxDQUFDO1FBRUYsT0FBTyxJQUFJLFVB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