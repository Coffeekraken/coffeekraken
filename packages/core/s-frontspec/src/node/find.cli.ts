// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SFrontspec from './SFrontspec';
import __SFrontspecFindParamsInterface from './interface/SFrontspecFindParamsInterface';

export default (stringArgs = '') => {
  const frontspec = new __SFrontspec();
  const pro = __SProcess.from(frontspec.find.bind(frontspec), {
    process: {
      interface: __SFrontspecFindParamsInterface
    }
  });
  pro.run(stringArgs);
};
