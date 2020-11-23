"use strict";

export default (stringArgs = '') => {
    require('../monorepo/all.cli')(stringArgs);
};
