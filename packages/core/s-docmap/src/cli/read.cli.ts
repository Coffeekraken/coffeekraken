// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from '../node/SDocMap';
import __SDocMapParamsReadInterface from '../node/interface/SDocMapReadParamsInterface';

export default async (stringArgs = '') => {
  const docmap = new __SDocMap();
  const pro = await __SProcess.from(docmap.read.bind(docmap), {
    process: {
      interface: __SDocMapParamsReadInterface
    }
  });
  const res = await pro.run(stringArgs);
  console.log(res.value.menu);
};
