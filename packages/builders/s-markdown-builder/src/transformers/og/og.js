import __scrapeUrl from '@coffeekraken/sugar/node/og/scrapeUrl';

export default async function(data) {
    const og = await __scrapeUrl(data[1]);
    return og ?? {};
}