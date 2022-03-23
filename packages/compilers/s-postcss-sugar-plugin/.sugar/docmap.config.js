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
    exports.default = (env, config) => {
        if (env.platform !== 'node')
            return;
        return {
            build: {
            // exclude: [
            //     '**/__tests__/**/*',
            //     '**/__tests__.wip/**/*',
            //     '**/__wip__/**/*',
            //     '**/mixins/**/*',
            //     '**/functions/**/*',
            // ],
            },
        };
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxrQkFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMzQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFDcEMsT0FBTztZQUNILEtBQUssRUFBRTtZQUNILGFBQWE7WUFDYiwyQkFBMkI7WUFDM0IsK0JBQStCO1lBQy9CLHlCQUF5QjtZQUN6Qix3QkFBd0I7WUFDeEIsMkJBQTJCO1lBQzNCLEtBQUs7YUFDUjtTQUNKLENBQUM7SUFDTixDQUFDLENBQUMifQ==