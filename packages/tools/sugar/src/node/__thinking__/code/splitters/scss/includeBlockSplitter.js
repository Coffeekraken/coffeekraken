"use strict";
// @ts-nocheck
module.exports = {
    type: 'include.block',
    prefix: /@include\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
    open: '{',
    close: '}'
};
