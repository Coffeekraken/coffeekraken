"use strict";
// @ts-nocheck
module.exports = () => {
    return (typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node');
};
