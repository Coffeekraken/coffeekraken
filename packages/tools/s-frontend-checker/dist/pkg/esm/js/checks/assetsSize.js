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
function getAssetSize(url, $context) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        // const id = __uniqid();
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
            return resolve();
            itemType = 'videos';
        }
        const itemObj = {
            url: item.name,
            totalSize: item.decodedBodySize,
            external: item._isExternal,
        };
        // @ts-ignore
        if (!itemObj.totalSize && window.isPuppeteer) {
            itemObj.totalSize = yield getAssetSize(itemObj.url, $context);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUc5RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUUsUUFBUTtJQUMvQixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7UUFDakMseUJBQXlCO1FBQ3pCLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRztZQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVE7SUFDMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLElBQUksUUFBUSxDQUFDO1FBQ2IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQixRQUFRLEdBQUcsT0FBTyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFO1lBQzFELFFBQVEsR0FBRyxNQUFNLENBQUM7U0FDckI7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDN0MsUUFBUSxHQUFHLFNBQVMsQ0FBQztTQUN4QjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JB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