// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from './SDocMap';
import __SDocMapFindParamsInterface from './interface/SDocMapFindParamsInterface';

export default (stringArgs = '') => {
  const docmap = new __SDocMap();
  const pro = __SProcess.from(docmap.find.bind(docmap), {
    process: {
      interface: __SDocMapFindParamsInterface
    }
  });
  pro.run(stringArgs);
};
