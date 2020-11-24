"use strict";
// @ts-nocheck
module.exports = {
    type: 'mixin.block',
    prefix: /@mixin\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
    open: '{',
    close: '}'
};
