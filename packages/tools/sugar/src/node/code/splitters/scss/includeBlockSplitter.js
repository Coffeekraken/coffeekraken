"use strict";
// @ts-nocheck
// @shared
module.exports = {
    type: 'include.block',
    prefix: /@include\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
    open: '{',
    close: '}'
};
