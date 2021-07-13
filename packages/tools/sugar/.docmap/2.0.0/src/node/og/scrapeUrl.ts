/**
*
* @name            scrapeUrl
* @namespace       node.og
* @type            Function
* @async
* @platform        ts
* @platform        node
* @status          beta
*
* This function allows you to scrape a url and get back the open graph metadata
* like "ogTitle", "ogDescription", etc...
*
* @feature         Promise based API
* @feature         Caching strategy
*
* @setting        {String}         [id=undefined]          Specify an id used for the cache
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
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/