"use strict";
import __linkPackages from '../../node/monorepo/linkPackages';
import __output from '../../node/process/output';

export default (stringArgs = '') => {
    const process = __linkPackages();
    __output(process);
};
