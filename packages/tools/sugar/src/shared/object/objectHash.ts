import __objectHash from 'object-hash';

/**
 * @name            objectHash
 * @namespace       node.fs
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function allows you to get back an integrity hash passed object.
 *
 * @param           {any}            obj      The object to hash
 * @param           {IObjectHashSettings}       [settings={}]       Some settings to configure your hash generation process
 * @return          {String}                            The calculated folder hash
 *
 * @example         js
 * import objectHash from '@coffeekraken/sugar/node/fs/objectHash';
 * objectHash('my/cool/folder'); // => YZOrKDx9LCLd8X39PoFTflXGpRU=,
 *
 * @see             https://www.npmjs.com/package/object-hash
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IObjectHashSettings {}

export default function objectHash(
    obj: any,
    settings: Partial<IObjectHashSettings> = {},
): string {
    settings = <IObjectHashSettings>{
        ...settings,
    };
    return __objectHash(obj);
}
