"use strict";
// @ts-nocheck
// @shared
module.exports = (value) => {
    if (typeof value !== 'string')
        return value;
    value = value.split('⠀').join('').trim();
    try {
        return Function(`
      "use strict";
      return (${value});
    `)();
    }
    catch (e) {
        return value;
    }
};
//# sourceMappingURL=parse.js.map