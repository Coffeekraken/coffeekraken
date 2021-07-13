// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from '../node/SDocMap';
import __SDocMapSnapshotParamsInterface from '../node/interface/SDocMapSnapshotParamsInterface';

export default async (stringArgs = '') => {
  const docmap = new __SDocMap();
  const pro = await __SProcess.from(docmap.snapshot.bind(docmap), {
    process: {
      interface: __SDocMapSnapshotParamsInterface
    }
  });
  pro.run(stringArgs);
};
