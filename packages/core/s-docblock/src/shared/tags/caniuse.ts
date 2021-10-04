// @ts-nocheck
import __caniuse from 'caniuse-api';
import __downloadGithubDirectory from '@coffeekraken/sugar/node/github/downloadRepository';
import __cacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __fs from 'fs';

/**
 * @name              caniuse
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the caniuse tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @contributor 	Olivier Bossel <olivier.bossel@gmail.com>
 */
async function caniuse(data, blockSettings) {
    data = Array.from(data);

    throw new Error(
        'Sorry but the caniuse docblock tag is not supported for now...',
    );

    const properties: any[] = [];

    for (let j = 0; j < data.length; j++) {
        const d = data[j];
        const props = d.value.split(/(,|\s)/).filter((l) => l.trim() !== '');
        const dest = `${__cacheDir()}/mdn/browser-compat-data`;
        // if (!__fs.existsSync(dest)) {
        console.log('download');
        await __downloadGithubDirectory('mdn/browser-compat-data', {
            dest,
            unzip: true,
        });
        // }

        // for (let i = 0; i < props.length; i++) {
        //     const prop = props[i];
        //     const support = __caniuse.find(prop);
        //     console.log('s', support);
        // }
    }

    return properties;
}
export default caniuse;
