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
        routes: {
            '/config/explorer/*': {
                handler: 'view',
                request: {
                    params: {
                        '0': 'pages/config/explorer',
                    },
                },
            },
            '/config/explorer': {
                handler: 'redirect',
                request: {
                    redirect: '/config/explorer/docmap.config.js'
                },
            },
            '/doc/api': {
                handler: 'view',
                request: {
                    params: {
                        '0': 'pages/doc/list',
                    },
                },
            },
        },
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsa0JBQWU7UUFDWCxNQUFNLEVBQUU7WUFDSixvQkFBb0IsRUFBRTtnQkFDbEIsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsT0FBTyxFQUFFO29CQUNMLE1BQU0sRUFBRTt3QkFDSixHQUFHLEVBQUUsdUJBQXVCO3FCQUMvQjtpQkFDSjthQUNKO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixPQUFPLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLG1DQUFtQztpQkFDaEQ7YUFDSjtZQUNELFVBQVUsRUFBRTtnQkFDUixPQUFPLEVBQUUsTUFBTTtnQkFDZixPQUFPLEVBQUU7b0JBQ0wsTUFBTSxFQUFFO3dCQUNKLEdBQUcsRUFBRSxnQkFBZ0I7cUJBQ3hCO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUMifQ==