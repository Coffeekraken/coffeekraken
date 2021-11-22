var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBuilder from '@coffeekraken/s-builder';
import __SPromise from '@coffeekraken/s-promise';
import __SRequest from '@coffeekraken/s-request';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __remove from '@coffeekraken/sugar/node/fs/remove';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __SLog from '@coffeekraken/s-log';
import __path from 'path';
import { parseStringPromise } from 'xml2js';
import __copy from '@coffeekraken/sugar/node/fs/copy';
import __formatEstimation from '@coffeekraken/sugar/shared/time/formatEstimation';
export default class SStaticBuilder extends __SBuilder {
    /**
     * @name            staticBuilderSettings
     * @type            ISStaticBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get staticBuilderSettings() {
        return this._settings.staticBuilder;
    }
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            staticBuilder: Object.assign({}, __SSugarConfig.get('staticBuilder')),
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            _build
     * @type            Function
     * @async
     *
     * This method is the internal builder _build one.
     * It will be called by the SBuilder class with the final params
     * for the build
     *
     * @param       {Partial<ISStaticBuilderBuildParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _build(params) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start building your static website`,
            });
            // ensure input file exists
            if (!__fs.existsSync(params.input)) {
                throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            // clear if needed
            if (params.clear) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[clear]</yellow> Clearing the outDir "<cyan>${__path.relative(__packageRoot(), params.outDir)}</cyan>"...`,
                });
                yield __remove(params.outDir);
            }
            // reading the file
            const xmlStr = __fs
                .readFileSync(params.input, 'utf8')
                .toString();
            // parsing xml
            let xml = yield parseStringPromise(xmlStr);
            let failsCount = 0, failedUrls = [], currentDuration = 0;
            // xml = {
            //     urlset: {
            //         url: [
            //             {
            //                 loc: '/api/@coffeekraken.s-theme.config.themeBase.ui.default.paddingInline',
            //             },
            //         ],
            //     },
            // };
            // loop on each urls to get his content
            for (let i = 0; i < xml.urlset.url.length; i++) {
                const url = xml.urlset.url[i];
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Reaching the url "<cyan>${url.loc}</cyan>"...`,
                });
                const start = Date.now();
                const request = new __SRequest({
                    url: `${params.host}${url.loc}`,
                    timeout: params.requestTimeout,
                });
                const res = yield request.send().catch((e) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<red>[error]</red> The url "<cyan>${url.loc}</cyan>" cannot be reached...`,
                    });
                    failsCount++;
                    failedUrls.push(url.loc);
                    __writeFileSync(`${__packageRoot()}/SStaticBuilderFailedUrls.txt`, failedUrls.join('\n'));
                    if (params.failAfter !== -1 &&
                        failsCount >= params.failAfter) {
                        throw new Error(`<red>[error]</red> The static builder has reached the available issues which is set using the "<yellow>failAfter</yellow>" param that is set to <magenta>${params.failAfter}</magenta>`);
                    }
                });
                const end = Date.now();
                currentDuration += end - start;
                const average = currentDuration / i;
                // generating the output path for the current file
                const outPath = `${params.outDir}${url.loc}`;
                // @ts-ignore
                if (res === null || res === void 0 ? void 0 : res.data) {
                    // saving file
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[build]</green> Saving the page from url "<cyan>${url.loc}</cyan>"...`,
                    });
                    // @ts-ignore
                    __writeFileSync(`${outPath}.html`, res.data);
                }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${__formatEstimation(average * (xml.urlset.url.length - i))}</cyan> remaining`,
                });
                // if (i >= 5) break;
            }
            // assets
            if (params.assets) {
                for (let i = 0; i < Object.keys(params.assets).length; i++) {
                    const assetObj = params.assets[Object.keys(params.assets)[i]];
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[assets]</yellow> Copying assets "<yellow>${__path.relative(__packageRoot(), assetObj.from)}</yellow>" to "<cyan>${__path.relative(__packageRoot(), assetObj.to)}</cyan>"`,
                    });
                    // filesystem
                    if (assetObj.from.match(/^\//)) {
                        const to = `${assetObj.to}/${assetObj.from.split('/').slice(-1)[0]}`;
                        yield __copy(assetObj.from, to);
                        // url
                    }
                    else if (assetObj.from.match(/^https?:\/\//)) {
                        const req = new __SRequest({
                            url: assetObj.from,
                        });
                        const res = yield req.send().catch((error) => {
                            throw new Error(`<red>[error]</red> The requested asset "<yellow>${assetObj.from}</yellow>" is not reachable...`);
                        });
                        // @ts-ignore
                        let data = res.data;
                        try {
                            data = JSON.stringify(data);
                        }
                        catch (e) { }
                        __writeFileSync(assetObj.to, data);
                    }
                }
            }
            resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0YXRpY0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RhdGljQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQXFDLE1BQU0seUJBQXlCLENBQUM7QUFFNUUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFDMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDNUMsT0FBTyxNQUFNLE1BQU0sa0NBQWtDLENBQUM7QUFDdEQsT0FBTyxrQkFBa0IsTUFBTSxrREFBa0QsQ0FBQztBQXNFbEYsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsVUFBVTtJQUNsRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHFCQUFxQjtRQUNyQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBK0M7UUFDdkQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLGFBQWEsb0JBQ04sY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FDekM7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FB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