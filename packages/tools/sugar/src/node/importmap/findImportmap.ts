import __SFile from '../fs/SFile';
import __SFindImportmapInterface from './interface/SFindImportmapInterface';
import __deepMerge from '../object/deepMerge';
import __fs from 'fs';
import __path from 'path';

/**
 * @name            findImportmap
 * @namespace       sugar.node.importmap
 * @type            Function
 * @async
 *
 * This function simply search for some "importmap.json" (or whatever names setted in the settings)
 * and returns the list of founded files back
 *
 * @param       {IFindImportmapParams}        [params={}]          Some params to configure your search
 * - {Boolean}           [SFile=false]              Specify if you want to get back an array of SFile instances or simple strings
 * - {Array<String>}        [dirs=sugar.config.importmap.file.dirs]     Specify where to search for importmap files
 * - {Array<String>}        [names=sugar.config.importmap.file.names]       Specify the names that the importmap file can have
 * @return      {Promise<SFile>|Promise<string[]>}                            A promise resolved with all the importMap files founded either in SFile instance format, or just as an absolute string path
 *
 * @example         js
 * import findImportmap from '@coffeekraken/sugar/node/importmap/findImportmap';
 * await findImportmap(); // => [SFile, SFile];
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IFindImportmapParams {
  SFile: boolean;
  dirs: string[];
  names: string[];
}

export default async function findImportmap(
  params?: Partial<IFindImportmapParams>
): Promise<string[] | __SFile[]> {
  const par = <IFindImportmapParams>(
    __deepMerge(__SFindImportmapInterface.defaults(), params || {})
  );

  let foundFiles: any[] = [];

  // loop on potential folders
  for (let path of par.dirs) {
    // loop on potential names
    for (let name of par.names) {
      // check for file
      const filePath = `${path}/${name}`;
      if (__fs.existsSync(filePath)) foundFiles.push(filePath);
    }
  }

  // mao to SFile if wanted
  if (par.SFile === true) {
    foundFiles = foundFiles.map((path) => {
      return new __SFile(path);
    });
  }

  return foundFiles;
}
