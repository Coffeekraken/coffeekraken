// @ts-nocheck
import __namespaceCompliant from '@coffeekraken/sugar/shared/string/namespaceCompliant';

/**
 * @name              namespace
 * @namespace           shared.tags
 * @type              Function
 * @status              wip
 *
 * Parse the namespace tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param       {ISDocblockBlockSettings}     blockSettings     The SDocblockBlock settings
 * @return      {Object}                      The formated object
 *
 * @todo      interface
 * @todo      doc
 *
 * @since       2.0.0
 * @namespace 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function namespace(data, blockSettings) {
    if (
        data &&
        data.value &&
        typeof data.value === 'string' &&
        data.value.trim() === ''
    ) {
        return true;
    }

    let namespace = data.value;
    if (blockSettings.packageJson) {
        namespace = __namespaceCompliant(
            `${blockSettings.packageJson.name.replace(
                '/',
                '.',
            )}.${namespace.replace(/\s{1,9999999}/gm, '-')}`,
        );
    }
    return __namespaceCompliant(namespace.replace(/\s{1,999999}/gm, '-'));
}
export default namespace;
