// @ts-nocheck

import __linkPackages from '../../node/monorepo/linkPackages';
import __stdio from '../../node/process/stdio';

export = (stringArgs = '') => {
  const pro = __linkPackages();
  __stdio(pro);
};
