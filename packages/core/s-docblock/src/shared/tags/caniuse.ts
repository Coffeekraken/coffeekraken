// @ts-nocheck
import __caniuse from 'caniuse-api';
import __downloadGithubDirectory from 'github-download-directory';
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
function caniuse(data, blockSettings) {
    data = Array.from(data);

    const properties: any[] = [];

    for (let j = 0; j < data.length; j++) {
        const d = data[j];
        const props = d.value.split(/(,|\s)/).filter((l) => l.trim() !== '');

        if (!__fs.existsSync(`${__cacheDir()}/mdn/css`)) {
            console.log('download');
            __downloadGithubDirectory
                .download('mdn', 'browser-compat-data')
                .then(console.log, console.error);
        }

        // for (let i = 0; i < props.length; i++) {
        //     const prop = props[i];
        //     const support = __caniuse.find(prop);
        //     console.log('s', support);
        // }
    }

    return properties;
}
export default caniuse;
