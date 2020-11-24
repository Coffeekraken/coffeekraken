// @ts-nocheck

import _SFsDeamonProcess from '../../node/deamon/fs/SFsDeamonProcess';

export default (stringArgs = '') => {
  const pro = new _SFsDeamonProcess();
  pro.run(stringArgs);
};
