import { __wait } from '@coffeekraken/sugar/datetime';
import { __formatFileSize } from '@coffeekraken/sugar/format';
import { __uniqid } from '@coffeekraken/sugar/string';
import type { ISFrontendChecker } from '../types';

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
    return new Promise(async (resolve) => {
        const id = __uniqid();
        window.fetchImageResolve = function () {
            resolve(window.fetchedImageSize);
        };
        console.log(`fetchImage:${id}:${url}`);
    });
}

function _handleItem(item, globalObj, $context): Promise<void> {
    return new Promise(async (resolve) => {
        let itemType;
        if (item.name.match(/\.css/)) {
            itemType = 'links';
        } else if (item.name.match(/\.(jpg|jpeg|png|gif|webp|avif)/)) {
            itemType = 'imgs';
        } else if (item.name.match(/\.(ts|js|tsx|jsx)/)) {
            console.log('script', item.name, JSON.stringify(item, null, 2));
            itemType = 'scripts';
        } else if (item.name.match(/\.(mp4|avi|webm|mov)/)) {
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
            itemObj.totalSize = await getAssetSize(itemObj.url, $context);
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
    });
}

export default function (__SFrontendChecker: ISFrontendChecker) {
    return {
        id: 'assetsSize',
        name: 'Assets size',
        category: __SFrontendChecker.CATEGORY_PERFORMANCE,
        description:
            'Check that the assets (images, styles, scripts, etc...) are not too heavy',
        level: 1,
        async check({ $context }) {
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

            const perf = (window.parent ?? window).performance;
            for (let [i, item] of perf.getEntriesByType('resource').entries()) {
                items.push(item);
            }

            const observer = new (window.parent ?? window).PerformanceObserver(
                (list) => {
                    list.getEntries().forEach((item) => {
                        items.push(item);
                    });
                },
            );
            observer.observe({ type: 'resource', buffered: true });

            await __wait(5000);

            for (let [i, item] of items.entries()) {
                await _handleItem(item, globalObj, $context);
            }

            let imagesStatus = 0,
                videosStatus = 0,
                scriptsStatus = 0,
                linksStatus = 0,
                totalStatus = 0;
            if (globalObj.imgs.totalSize > 5 * 1024) {
                imagesStatus = 1;
            } else if (globalObj.imgs.totalSize > 10 * 1024) {
                imagesStatus = 2;
            }

            if (globalObj.videos.totalSize > 10 * 1024) {
                videosStatus = 1;
            } else if (globalObj.videos.totalSize > 20 * 1024) {
                videosStatus = 2;
            }

            if (globalObj.scripts.totalSize > 0.5 * 1024) {
                scriptsStatus = 1;
            } else if (globalObj.scripts.totalSize > 2 * 1024) {
                scriptsStatus = 2;
            }

            if (globalObj.links.totalSize > 0.5 * 1024) {
                linksStatus = 1;
            } else if (globalObj.links.totalSize > 2 * 1024) {
                linksStatus = 2;
            }

            totalStatus =
                imagesStatus + videosStatus + scriptsStatus + linksStatus;
            const totalScore = (100 / 8) * totalStatus;

            const messages: string[] = [];
            const imagesColor =
                imagesStatus === 1
                    ? 'yellow'
                    : imagesStatus === 2
                    ? 'red'
                    : 'green';
            messages.push(
                `Images : <${imagesColor}>${__formatFileSize(
                    globalObj.imgs.totalSize,
                )}</${imagesColor}>`,
            );
            const videosColor =
                videosStatus === 1
                    ? 'yellow'
                    : videosStatus === 2
                    ? 'red'
                    : 'green';
            messages.push(
                `Videos : <${videosColor}>${__formatFileSize(
                    globalObj.videos.totalSize,
                )}</${videosColor}>`,
            );
            const scriptsColor =
                scriptsStatus === 1
                    ? 'yellow'
                    : scriptsStatus === 2
                    ? 'red'
                    : 'green';
            messages.push(
                `Scripts: <${scriptsColor}>${__formatFileSize(
                    globalObj.scripts.totalSize,
                )}</${scriptsColor}>`,
            );
            const linksColor =
                linksStatus === 1
                    ? 'yellow'
                    : linksStatus === 2
                    ? 'red'
                    : 'green';
            messages.push(
                `Styles : <${linksColor}>${__formatFileSize(
                    globalObj.links.totalSize,
                )}</${linksColor}>`,
            );

            return {
                status:
                    totalScore === 100
                        ? __SFrontendChecker.STATUS_SUCCESS
                        : totalScore <= 50
                        ? __SFrontendChecker.STATUS_WARNING
                        : __SFrontendChecker.STATUS_ERROR,
                message: messages.join('\n'),
            };
        },
    };
}
