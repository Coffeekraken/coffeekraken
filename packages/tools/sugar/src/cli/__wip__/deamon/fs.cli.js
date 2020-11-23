"use strict";
import __SFsDeamonProcess from '../../node/deamon/fs/SFsDeamonProcess';

export default (stringArgs = '') => {
    const pro = new __SFsDeamonProcess();
    pro.run(stringArgs);
};
