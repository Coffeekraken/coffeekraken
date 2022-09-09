import __deepMerge from '../../shared/object/deepMerge';
import __openGraphScraper from 'open-graph-scraper';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';

/**
 * @name            scrapeUrl
 * @namespace       node.og
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to scrape a url and get back the open graph metadata
 * like "ogTitle", "ogDescription", etc...
 *
 * @feature         Promise based API
 * @feature         Caching strategy
 *
 * @setting        {String}         [id=undefined]          Specify an id used for the cache
 * @setting        {Any}            [scraper={}]            Specify settings for the sraper. See https://www.npmjs.com/package/open-graph-scraper for more infos
 * @setting         {ISCacheSettings}       [cache={}]      Specify some settings for the caching behavior. Default ttl set to 1 week
 *
 * @param       {String}        url             The url to scrape
 * @param       {IScrapeUrlSettings}        [settings={}]       Some settings to tweak scraping behavior
 *
 * @todo          tests
 *
 * @example         js
 * import scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';
 * await scrapeUrl('https://www.npmjs.com/package/open-graph-scraper');
 *
 * @see         https://www.npmjs.com/package/open-graph-scraper
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IScrapeUrlSettings {
    id: string;
    scraper: any;
    cache: Partial<ISCacheSettings>;
}

export interface IScrapeUrlResult {
    ogTitle: string;
    ogType: string;
    ogUrl: string;
    ogDescription: string;
    ogImage: {
        url: string;
        width: number;
        height: number;
        type: string;
    };
    requestUrl: string;
    success: boolean;
}

export default function srapeUrl(
    url: string,
    settings: Partial<IScrapeUrlSettings> = {},
): Promise<IScrapeUrlResult> {
    return new Promise(async (resolve, reject) => {
        const finalSettings = <IScrapeUrlSettings>__deepMerge(
            {
                id: undefined,
                scraper: {},
                cache: {
                    ttl: '1w',
                },
            },
            settings,
        );

        const cacheFilePath = `${__packageCacheDir()}/sugar/scrapeUrl.json`;

        let cacheJson = {};

        // leverage cache
        if (finalSettings.cache && __fs.existsSync(cacheFilePath)) {
            cacheJson = __readJsonSync(cacheFilePath);
            if (cacheJson[url]) {
                return resolve(cacheJson[url]);
            }
        }

        // process to actual scraping
        const data = await __openGraphScraper({
            ...finalSettings.scraper,
            url,
        });

        // check if got some results
        if (data.error) {
            return reject(data.result);
        }

        // cache if needed
        if (finalSettings.cache && data.result) {
            cacheJson[url] = data.result;
            __writeJsonSync(cacheFilePath, cacheJson);
        }

        // return the resuls
        return resolve(data.result);
    });
}
