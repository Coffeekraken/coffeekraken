"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = __importDefault(require("path"));
exports.default = (api) => {
    const packageJsonHighest = (0, package_1.__packageJsonSync)(process.cwd(), {
        highest: true,
    });
    let dashboardLazyProxyUrl = '', dashboardInitProxyUrl = '';
    if (packageJsonHighest.name === '@coffeekraken/coffeekraken') {
        const dashboardLazyPath = path_1.default.resolve((0, fs_1.__dirname)(), '../../../../src/js/lazy.ts');
        dashboardLazyProxyUrl = `http://localhost:5173/@fs${dashboardLazyPath}`;
        const dashboardInitPath = path_1.default.resolve((0, fs_1.__dirname)(), '../../../../src/js/init.ts');
        dashboardInitProxyUrl = `http://localhost:5173/@fs${dashboardInitPath}`;
    }
    return {
        server: {
            proxy: {
                '/sugar/dashboard/lazy.js': {
                    target: dashboardLazyProxyUrl,
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/sugar/dashboard/lazy.js', ''),
                },
                '/sugar/dashboard/init.js': {
                    target: dashboardInitProxyUrl,
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/sugar/dashboard/init.js', ''),
                },
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW1EO0FBQ25ELHlEQUFnRTtBQUNoRSxnREFBMEI7QUFFMUIsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixNQUFNLGtCQUFrQixHQUFHLElBQUEsMkJBQWlCLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3hELE9BQU8sRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUVILElBQUkscUJBQXFCLEdBQUcsRUFBRSxFQUMxQixxQkFBcUIsR0FBRyxFQUFFLENBQUM7SUFFL0IsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssNEJBQTRCLEVBQUU7UUFDMUQsTUFBTSxpQkFBaUIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNwQyxJQUFBLGNBQVMsR0FBRSxFQUNYLDRCQUE0QixDQUMvQixDQUFDO1FBQ0YscUJBQXFCLEdBQUcsNEJBQTRCLGlCQUFpQixFQUFFLENBQUM7UUFDeEUsTUFBTSxpQkFBaUIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNwQyxJQUFBLGNBQVMsR0FBRSxFQUNYLDRCQUE0QixDQUMvQixDQUFDO1FBQ0YscUJBQXFCLEdBQUcsNEJBQTRCLGlCQUFpQixFQUFFLENBQUM7S0FDM0U7SUFFRCxPQUFPO1FBQ0gsTUFBTSxFQUFFO1lBQ0osS0FBSyxFQUFFO2dCQUNILDBCQUEwQixFQUFFO29CQUN4QixNQUFNLEVBQUUscUJBQXFCO29CQUM3QixZQUFZLEVBQUUsSUFBSTtvQkFDbEIsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsQ0FBQztpQkFDbkQ7Z0JBQ0QsMEJBQTBCLEVBQUU7b0JBQ3hCLE1BQU0sRUFBRSxxQkFBcUI7b0JBQzdCLFlBQVksRUFBRSxJQUFJO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxDQUFDO2lCQUNuRDthQUNKO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=