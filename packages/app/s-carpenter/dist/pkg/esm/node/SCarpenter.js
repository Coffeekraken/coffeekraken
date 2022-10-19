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
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __express from 'express';
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
            const viewRenderer = new __SViewRenderer({
                rootDirs: [`${__packageRootDir(__dirname())}/src/views`],
            });
            const app = __express(), watchers = {}, specsBySources = {};
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
                    specsBySources[key] = Object.assign(Object.assign({}, source), { specs: [] });
                }
                // console.log(key, source);
                const specs = new __SSpecs();
                const specsArray = specs.list(source.specsNamespaces);
                specsBySources[key].specs = [
                    ...specsBySources[key].specs,
                    specsArray,
                ];
                specsArray.forEach((spec) => {
                    // listen for request on that particular component
                    app.get(`/${spec.dotpath}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                        console.log(specsBySources);
                        const result = yield viewRenderer.render('index', {});
                        res.type('text/html');
                        res.send(result.value);
                    }));
                });
            }
            app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.type('text/html');
                res.send('Hello');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBNkMxRixNQUFNLFVBQVcsU0FBUSxRQUFRO0lBQzdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBdUM7UUFDL0MsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLEVBQ0QsY0FBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFDL0IsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsS0FBSyxDQUFDLE1BQXVDO1FBQ3pDLE1BQU0sV0FBVyxHQUEyQixDQUN4QyxXQUFXLENBQUMsZ0NBQWdDLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQ25FLENBQUM7UUFFRixPQUFPLElBQUks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