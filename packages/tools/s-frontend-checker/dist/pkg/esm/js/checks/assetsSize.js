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
import { __uniqid } from '@coffeekraken/sugar/string';
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
        const id = __uniqid();
        window.fetchImageResolve = function () {
            resolve(window.fetchedImageSize);
        };
        console.log(`fetchImage:${id}:${url}`);
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
            console.log('script', item.name, JSON.stringify(item, null, 2));
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
        check({ $context }) {
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
                messages.push(`Images : <${imagesColor}>${__formatFileSize(globalObj.imgs.totalSize)}</${imagesColor}>`);
                const videosColor = videosStatus === 1
                    ? 'yellow'
                    : videosStatus === 2
                        ? 'red'
                        : 'green';
                messages.push(`Videos : <${videosColor}>${__formatFileSize(globalObj.videos.totalSize)}</${videosColor}>`);
                const scriptsColor = scriptsStatus === 1
                    ? 'yellow'
                    : scriptsStatus === 2
                        ? 'red'
                        : 'green';
                messages.push(`Scripts: <${scriptsColor}>${__formatFileSize(globalObj.scripts.totalSize)}</${scriptsColor}>`);
                const linksColor = linksStatus === 1
                    ? 'yellow'
                    : linksStatus === 2
                        ? 'red'
                        : 'green';
                messages.push(`Styles : <${linksColor}>${__formatFileSize(globalObj.links.totalSize)}</${linksColor}>`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHdEQ7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsU0FBUyxZQUFZLENBQUMsR0FBRyxFQUFFLFFBQVE7SUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLE1BQU0sRUFBRSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRztZQUN2QixPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRO0lBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtRQUNqQyxJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUIsUUFBUSxHQUFHLE9BQU8sQ0FBQztTQUN0QjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtZQUMxRCxRQUFRLEdBQUcsTUFBTSxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFF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