// @ts-nocheck

import _linkPackages from '../../node/monorepo/linkPackages';
import _output from '../../node/process/output';

export = (stringArgs = '') => {
  const process = _linkPackages();
  _output(process);
};
