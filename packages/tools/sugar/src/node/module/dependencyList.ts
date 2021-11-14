import __SPromise from '@coffeekraken/s-promise';
import __deepMap from '../../shared/object/deepMap';
import __dependencyTree, {
    IDependencyTreeExtendedSettings,
} from './dependencyTree';

/**
 * @name                dependencyList
 * @namespace            node.module
 * @type                Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function make use of the ```dependencyTree``` one and returns the result into a simple array of file pathes
 *
 * @param       {String}                    filePath                The absolute file path you want to get the dependency tree from
 * @param       {IDependencyTreeExtendedSettings}       [settings={}]       Some settings (like all the dependency-tree supported ones (excluding filename and directory)), and some additional like caching.
 * @return      {SPromise}                               An SPromise instance through which you can get logs, and that will be resolved once the process is over
 *
 * @example         js
 * import dependencyList from '@coffeekraken/sugar/node/module/dependencyList';
 * await dependencyList('/something/cool.js', {
 *      cache: true,
 *      // etc...
 * });
 *
 * @see             https://www.npmjs.com/package/dependency-tree
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export default function dependencyList(
    filePath: string,
    settings?: Partial<IDependencyTreeExtendedSettings>,
): any {
    return new __SPromise(async ({ resolve, pipe }) => {
        const tree = await pipe(__dependencyTree(filePath, settings));
        const list: string[] = [];
        __deepMap(
            tree,
            ({ prop, value }) => {
                if (list.indexOf(prop) === -1) list.push(prop);
                return value;
            },
            {
                processObjects: true,
            },
        );
        resolve(list);
    });
}
