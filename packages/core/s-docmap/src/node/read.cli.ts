// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from './SDocMap';
import __SDocMapParamsInterface from './interface/SDocMapFindParamsInterface';

export default (stringArgs = '') => {
  const docmap = new __SDocMap();
  const pro = __SProcess.from(docmap.read.bind(docmap), {
    process: {
      interface: __SDocMapParamsInterface
    }
  });
  pro.run(stringArgs);
};
