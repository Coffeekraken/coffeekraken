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
                value: `<yellow>[build]</yellow> Start building your static website`,
            });
            // ensure input file exists
            if (!__fs.existsSync(params.input)) {
                throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            // clear if needed
            if (params.clear) {
                emit('log', {
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
                    value: `<yellow>[build]</yellow> Reaching the url "<cyan>${url.loc}</cyan>"...`,
                });
                const start = Date.now();
                const request = new __SRequest({
                    url: `${params.host}${url.loc}`,
                    timeout: params.requestTimeout,
                });
                const res = yield request.send().catch((e) => {
                    emit('log', {
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
                        value: `<green>[build]</green> Saving the page from url "<cyan>${url.loc}</cyan>"...`,
                    });
                    // @ts-ignore
                    __writeFileSync(`${outPath}.html`, res.data);
                }
                emit('log', {
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${__formatEstimation(average * (xml.urlset.url.length - i))}</cyan> remaining`,
                });
                // if (i >= 5) break;
            }
            // assets
            if (params.assets) {
                for (let i = 0; i < Object.keys(params.assets).length; i++) {
                    const assetObj = params.assets[Object.keys(params.assets)[i]];
                    emit('log', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0YXRpY0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RhdGljQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQXFDLE1BQU0seUJBQXlCLENBQUM7QUFFNUUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFDMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDNUMsT0FBTyxNQUFNLE1BQU0sa0NBQWtDLENBQUM7QUFDdEQsT0FBTyxrQkFBa0IsTUFBTSxrREFBa0QsQ0FBQztBQXNFbEYsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsVUFBVTtJQUNsRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHFCQUFxQjtRQUNyQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBK0M7UUFDdkQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLGFBQWEsb0JBQ04sY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FDekM7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFB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