// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __findInFiles from 'find-in-files';
import __minimatch from 'minimatch';
import __fs from 'fs';
import __path from 'path';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __SDocblock from '../../shared/SDocblock';
/**
 * @name                  firstDocblockWithNamespaceInFolder
 * @namespace           sugar.node.docblock
 * @type                  Function
 * @async
 * @status              wip
 *
 * This function search in the passed folder for files containing a "@namespace" tag (and an "@name" optional one)
 * and generate a SNav instance with all these founded files as sources...
 *
 * @param         {String}          directory               The directory in which to search for files with the namespace tag
 * @param         {Object}          [settings={}]           A settings object to configure your navigation generation:
 * - exclude ('**\/+(__tests__ | __wip__)\/**') {String}: Specify a glob pattern representing the files to exclude from the generation
 * @return        {Object}                                    An object containing the docblocks holded in each namespaces as properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import firstDocblockWithNamespaceInFolder from '@coffeekraken/sugar/node/nav/firstDocblockWithNamespaceInFolder';
 * firstDocblockWithNamespaceInFolder('my/cool/folder');
 *
 * @since       2.0.0
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function firstDocblockWithNamespaceInFolder(directory, settings = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        settings = __deepMerge({
            exclude: '**/+(__tests__|__wip__)/**',
        }, settings);
        if (!__fs.existsSync(directory))
            return {};
        const founded = yield __findInFiles.find(`@namespace`, directory);
        const namespaceObj = {};
        for (let i = 0; i < Object.keys(founded).length; i++) {
            const path = founded[Object.keys(founded)[i]];
            const relativePath = __path.relative(directory, path);
            if (__minimatch(relativePath, settings.exclude))
                return;
            const content = __fs.readFileSync(path, 'utf8');
            const docblocks = new __SDocblock(content);
            yield docblocks.parse();
            const docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;
            if (!docblock)
                return;
            delete docblock.object.raw;
            const name = docblock.object.name || __getFilename(path).replace(`.${__extension(path)}`, '');
            namespaceObj[docblock.object.namespace + '.' + name] = Object.assign(Object.assign({}, docblock.object), { path: relativePath });
        }
        return namespaceObj;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyc3REb2NibG9ja3NXaXRoTmFtZXNwYWNlSW5Gb2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaXJzdERvY2Jsb2Nrc1dpdGhOYW1lc3BhY2VJbkZvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sYUFBYSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pFLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBZ0Isa0NBQWtDLENBQUMsU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFOztRQUNyRixRQUFRLEdBQUcsV0FBVyxDQUNsQjtZQUNJLE9BQU8sRUFBRSw0QkFBNEI7U0FDeEMsRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRTNDLE1BQU0sT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbEUsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RELElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUFFLE9BQU87WUFFeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsTUFBTSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRWxFLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU87WUFDdEIsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUUzQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFOUYsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsbUNBQzdDLFFBQVEsQ0FBQyxNQUFNLEtBQ2xCLElBQUksRUFBRSxZQUFZLEdBQ3JCLENBQUM7U0FDTDtRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7Q0FBQSJ9