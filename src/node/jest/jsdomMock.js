(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "jsdom"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const jsdom_1 = require("jsdom");
    module.exports = function () {
        const dom = new jsdom_1.JSDOM();
        global.document = dom.window.document;
        global.window = dom.window;
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNkb21Nb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsianNkb21Nb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsaUNBQThCO0lBRTlCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7UUFDYixNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDdEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQy9CLENBQUMsQ0FBQyJ9