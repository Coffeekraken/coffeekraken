import __findImportmap from '../../node/importmap/findImportmap';
import __SFindImportmapProcess from '../../node/importmap/SFindImportmapProcess';

import __SFindImportmapInterface from '../../node/importmap/interface/SFindImportmapInterface';

export default async (stringArgs = '') => {
  const pro = new __SFindImportmapProcess();
  const files = await pro.run(stringArgs);
};
