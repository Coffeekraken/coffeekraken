var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __wait } from '@coffeekraken/sugar/datetime';
import { __formatFileSize } from '@coffeekraken/sugar/format';
/**
 * @name            assetsSize
 * @namespace       js.checks
 * @type            Function
 * @platform        js
 * @status          beta
 * @async
 *
 * Check that all role attributes are on the good tags
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getAssetSize(url) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        window.fetchAssetResolve = function () {
            resolve(window.fetchedAssetSize);
        };
        console.log(`fetchAsset:${url}`);
    }));
}
function _handleItem(item, globalObj, $context) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        let itemType;
        if (item.name.match(/\.css/)) {
            itemType = 'links';
        }
        else if (item.name.match(/\.(jpg|jpeg|png|gif|webp|avif)/)) {
            itemType = 'imgs';
        }
        else if (item.name.match(/\.(ts|js|tsx|jsx)/)) {
            itemType = 'scripts';
        }
        else if (item.name.match(/\.(mp4|avi|webm|mov)/)) {
            itemType = 'videos';
        }
        const itemObj = {
            url: item.name,
            totalSize: item.decodedBodySize,
            external: item._isExternal,
        };
        // @ts-ignore
        if (!itemObj.totalSize && window.isPuppeteer) {
            itemObj.totalSize = yield getAssetSize(itemObj.url);
        }
        globalObj.totalSize += itemObj.totalSize;
        if (!globalObj[itemType]) {
            globalObj[itemType] = {
                totalSize: 0,
                assets: [],
            };
        }
        globalObj[itemType].totalSize += itemObj.totalSize;
        globalObj[itemType].assets.push(itemObj);
        resolve();
    }));
}
export default function (__SFrontendChecker) {
    return {
        id: 'assetsSize',
        name: 'Assets size',
        category: __SFrontendChecker.CATEGORY_PERFORMANCE,
        description: 'Check that the assets (images, styles, scripts, etc...) are not too heavy',
        level: 1,
        check({ $context, log }) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                const globalObj = {
                    totalSize: 0,
                    totalSizeCompressed: 0,
                    imgs: {
                        totalSize: 0,
                        compressionPercent: 30,
                        assets: [],
                    },
                    videos: {
                        totalSize: 0,
                        compressionPercent: 30,
                        assets: [],
                    },
                    scripts: {
                        totalSize: 0,
                        compressionPercent: 30,
                        assets: [],
                    },
                    links: {
                        totalSize: 0,
                        compressionPercent: 30,
                        assets: [],
                    },
                };
                const items = [];
                log('Gathering assets info from page...');
                const perf = ((_a = window.parent) !== null && _a !== void 0 ? _a : window).performance;
                for (let [i, item] of perf.getEntriesByType('resource').entries()) {
                    items.push(item);
                }
                const observer = new ((_b = window.parent) !== null && _b !== void 0 ? _b : window).PerformanceObserver((list) => {
                    list.getEntries().forEach((item) => {
                        items.push(item);
                    });
                });
                observer.observe({ type: 'resource', buffered: true });
                yield __wait(5000);
                for (let [i, item] of items.entries()) {
                    log(`Getting size for "${item.name}"`);
                    yield _handleItem(item, globalObj, $context);
                }
                let imagesStatus = 0, videosStatus = 0, scriptsStatus = 0, linksStatus = 0, totalStatus = 0;
                if (globalObj.imgs.totalSize > 5 * 1024) {
                    imagesStatus = 1;
                }
                else if (globalObj.imgs.totalSize > 10 * 1024) {
                    imagesStatus = 2;
                }
                if (globalObj.videos.totalSize > 10 * 1024) {
                    videosStatus = 1;
                }
                else if (globalObj.videos.totalSize > 20 * 1024) {
                    videosStatus = 2;
                }
                if (globalObj.scripts.totalSize > 0.5 * 1024) {
                    scriptsStatus = 1;
                }
                else if (globalObj.scripts.totalSize > 2 * 1024) {
                    scriptsStatus = 2;
                }
                if (globalObj.links.totalSize > 0.5 * 1024) {
                    linksStatus = 1;
                }
                else if (globalObj.links.totalSize > 2 * 1024) {
                    linksStatus = 2;
                }
                totalStatus =
                    imagesStatus + videosStatus + scriptsStatus + linksStatus;
                const totalScore = (100 / 8) * totalStatus;
                const messages = [];
                const imagesColor = imagesStatus === 1
                    ? 'yellow'
                    : imagesStatus === 2
                        ? 'red'
                        : 'green';
                messages.push(`<magenta>${globalObj.imgs.assets.length}</magenta> images : <${imagesColor}>${__formatFileSize(globalObj.imgs.totalSize)}</${imagesColor}>`);
                const videosColor = videosStatus === 1
                    ? 'yellow'
                    : videosStatus === 2
                        ? 'red'
                        : 'green';
                messages.push(`<magenta>${globalObj.videos.assets.length}</magenta> videos : <${videosColor}>${__formatFileSize(globalObj.videos.totalSize)}</${videosColor}>`);
                const scriptsColor = scriptsStatus === 1
                    ? 'yellow'
                    : scriptsStatus === 2
                        ? 'red'
                        : 'green';
                messages.push(`<magenta>${globalObj.scripts.assets.length}</magenta> scripts: <${scriptsColor}>${__formatFileSize(globalObj.scripts.totalSize)}</${scriptsColor}>`);
                const linksColor = linksStatus === 1
                    ? 'yellow'
                    : linksStatus === 2
                        ? 'red'
                        : 'green';
                messages.push(`<magenta>${globalObj.links.assets.length}</magenta> styles : <${linksColor}>${__formatFileSize(globalObj.links.totalSize)}</${linksColor}>`);
                messages.push(`Total  : <cyan>${__formatFileSize(globalObj.totalSize)}</cyan>`);
                log('End of test');
                return {
                    status: totalScore === 100
                        ? __SFrontendChecker.STATUS_SUCCESS
                        : totalScore <= 50
                            ? __SFrontendChecker.STATUS_WARNING
                            : __SFrontendChecker.STATUS_ERROR,
                    message: messages.join('\n'),
                };
            });
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUc5RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxTQUFTLFlBQVksQ0FBQyxHQUFHO0lBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxNQUFNLENBQUMsaUJBQWlCLEdBQUc7WUFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRO0lBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUIsUUFBUSxHQUFHLE9BQU8sQ0FBQztTQUN0QjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtZQUMxRCxRQUFRLEdBQUcsTUFBTSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzdDLFFBQVEsR0FBRyxTQUFTLENBQUM7U0FDeEI7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDaEQsUUFB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