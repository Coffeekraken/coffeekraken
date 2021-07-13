// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from '../node/SDocMap';
import __SDocmapInstallSnapshotParamsInterface from '../node/interface/SDocmapInstallSnapshotParamsInterface';

export default async (stringArgs = '') => {
  const docmap = new __SDocMap();
  const pro = await __SProcess.from(docmap.installSnapshot.bind(docmap), {
    process: {
      interface: __SDocmapInstallSnapshotParamsInterface
    }
  });
  pro.run(stringArgs);
};
