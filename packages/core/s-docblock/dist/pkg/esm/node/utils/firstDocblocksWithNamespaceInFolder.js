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
import { __extension, __fileName } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __findInFiles from 'find-in-files';
import __fs from 'fs';
import __minimatch from 'minimatch';
import __path from 'path';
import __SDocblock from '../../shared/SDocblock';
/**
 * @name                  firstDocblockWithNamespaceInFolder
 * @namespace           node.utils
 * @type                  Function
 * @async
 * @platform            node
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
 * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            const name = docblock.object.name ||
                __fileName(path).replace(`.${__extension(path)}`, '');
            namespaceObj[docblock.object.namespace + '.' + name] = Object.assign(Object.assign({}, docblock.object), { path: relativePath });
        }
        return namespaceObj;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxXQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBZ0Isa0NBQWtDLENBQzVELFNBQVMsRUFDVCxRQUFRLEdBQUcsRUFBRTs7UUFFYixRQUFRLEdBQUcsV0FBVyxDQUNsQjtZQUNJLE9BQU8sRUFBRSw0QkFBNEI7U0FDeEMsRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRTNDLE1BQU0sT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbEUsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RELElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUFFLE9BQU87WUFFeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsTUFBTSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRWxFLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU87WUFDdEIsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUUzQixNQUFNLElBQUksR0FDTixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUk7Z0JBQ3BCLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUxRCxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxtQ0FDN0MsUUFBUSxDQUFDLE1BQU0sS0FDbEIsSUFBSSxFQUFFLFlBQVksR0FDckIsQ0FBQztTQUNMO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztDQUFBIn0=