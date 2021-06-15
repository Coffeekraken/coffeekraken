// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SDocMap from './SDocMap';
import __SDocMapGenerateParamsInterface from './interface/SDocMapGenerateParamsInterface';

export default (stringArgs = '') => {
  console.log('COCC', stringArgs)
  const docmap = new __SDocMap();
  const pro = __SProcess.from(docmap.generate.bind(docmap), {
    process: {
      interface: __SDocMapGenerateParamsInterface
    }
  });
  pro.run(stringArgs);
};
