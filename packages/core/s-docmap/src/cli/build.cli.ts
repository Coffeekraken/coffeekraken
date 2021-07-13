// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from '../node/SDocMap';
import __SDocMapBuildParamsInterface from '../node/interface/SDocMapBuildParamsInterface';

export default async (stringArgs = '') => {
  const docmap = new __SDocMap();
  const pro = await __SProcess.from(docmap.build.bind(docmap), {
    process: {
      interface: __SDocMapBuildParamsInterface
    }
  });
  pro.run(stringArgs);
};
