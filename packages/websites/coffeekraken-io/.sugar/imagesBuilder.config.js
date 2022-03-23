(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        specificParams: {
            'idflood/**/*': {
                width: 100,
                resolution: [1]
            }
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzQnVpbGRlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbWFnZXNCdWlsZGVyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGtCQUFlO1FBRVgsY0FBYyxFQUFFO1lBQ1osY0FBYyxFQUFFO2dCQUNaLEtBQUssRUFBRSxHQUFHO2dCQUNWLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNsQjtTQUNKO0tBRUosQ0FBQSJ9