// @ts-nocheck

import __SProcess from '@coffeekraken/s-process';
import __SFrontspec from './SFrontspec';
import __SFrontspecParamsInterface from './interface/SFrontspecFindParamsInterface';

export default (stringArgs = '') => {
  const frontspec = new __SFrontspec();
  const pro = __SProcess.from(frontspec.read.bind(frontspec), {
    process: {
      interface: __SFrontspecParamsInterface
    }
  });
  pro.run(stringArgs);
};
