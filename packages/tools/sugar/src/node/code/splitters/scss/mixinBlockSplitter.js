"use strict";
// @ts-nocheck
// @shared
module.exports = {
    type: 'mixin.block',
    prefix: /@mixin\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
    open: '{',
    close: '}'
};
//# sourceMappingURL=mixinBlockSplitter.js.map