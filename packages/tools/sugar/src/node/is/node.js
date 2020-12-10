"use strict";
// @ts-nocheck
// @shared
module.exports = () => {
    return (typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node');
};
//# sourceMappingURL=module.js.map