// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from './SDocMap';
import __SDocMapParamsReadInterface from './interface/SDocMapReadParamsInterface';

export default async (stringArgs = '') => {
  const docmap = new __SDocMap();
  const pro = __SProcess.from(docmap.read.bind(docmap), {
    process: {
      interface: __SDocMapParamsReadInterface
    }
  });
  console.log(await pro.run(stringArgs));
};
