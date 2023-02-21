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
     * @name          loadSpecs
     * @type          Function
     *
     * This method allows you to load the specs specified in the config.carpenter.sources configuration
     *
     * @return        {Promise}                                     A promise resolved with the corresponding specs loaded
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadSpecs(settings) {
        const finalSettings = __deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {});
        return new Promise((resolve) => {
            const specsMap = {}, specsBySources = {};
            for (let [key, source] of Object.entries(finalSettings.sources)) {
                if (!specsBySources[key]) {
                    specsBySources[key] = Object.assign(Object.assign({}, source), { specs: {} });
                }
                const specsInstance = new __SSpecs();
                const specsArray = specsInstance.list(source.specsNamespaces);
                specsArray.forEach((specs) => {
                    const specsJson = specs.read();
                    specsBySources[key].specs[specs.dotpath] = specsJson;
                    specsMap[specs.dotpath] = specsJson;
                });
            }
            resolve({
                specsMap,
                specsBySources,
            });
        });
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order display your components library in a nice and coherent interface
     *
     * @param         {Partial<ISCarpenterStartParams>}          params        The params to use to start your mitosis env
     * @return        {Promise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = (__deepMerge(__SCarpenterStartParamsInterface.defaults(), params));
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            console.log(`<yellow>[start]</yellow> Starting a new carpenter server...`);
            const app = __express(), watchers = {};
            const { specsMap, specsBySources } = yield this.loadSpecs();
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
            console.log(`<green>[start]</green> Your carpenter server is available at:`);
            console.log(`<green>[start]</green> <cyan>http://127.0.0.1:${finalParams.port}</cyan>`);
            __onProcessExit(() => {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>mitosis server</cyan>...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQThDMUYsTUFBTSxVQUFXLFNBQVEsUUFBUTtJQUM3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFlBQVk7YUFDbkI7U0FDSixFQUNELGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQy9CLFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUyxDQUFDLFFBQXVDO1FBQzdDLE1BQU0sYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixNQUFNLFFBQVEsR0FBRyxFQUFFLEVB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