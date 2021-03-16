"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../node/path/packageRoot"));
const sugar_1 = __importDefault(require("../node/config/sugar"));
exports.default = {
    welcome: {
        serverModule: 'frontendServer'
    },
    modules: {
        frontendServer: {
            id: 'frontendServer',
            name: 'Frontend Server',
            description: 'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
            autoRun: true,
            processPath: `${packageRoot_1.default(__dirname)}/src/node/server/frontend/SFrontendServerProcess`,
            stdio: ['blessed'],
            params: '[config.frontend]'
            // presets: {
            //   prod: {
            //     name: 'Build production',
            //     key: 'p',
            //     params: {
            //       hostname: 'localhost'
            //     }
            //   }
            // }
        },
        docMap: {
            id: 'docMap',
            name: 'docMap.json file builder',
            description: 'Build docMap.json file',
            autoRun: false,
            processPath: `${packageRoot_1.default(__dirname)}/src/node/docMap/SBuildDocMapProcess`,
            stdio: ['blessed'],
            params: Object.assign({}, sugar_1.default('docMap'))
        },
        js: {
            id: 'js',
            name: 'Javascript Compiler',
            description: 'Watch and build the javascript files',
            autoRun: true,
            processPath: `${packageRoot_1.default(__dirname)}/src/node/js/compile/SJsCompilerProcess`,
            stdio: ['blessed'],
            params: Object.assign(Object.assign({}, sugar_1.default('js.compile')), { watch: true, bundle: true })
        },
        scss: {
            id: 'scss',
            name: 'SCSS Compiler',
            description: 'Watch and build the SCSS files to production ready CSS ones',
            autoRun: true,
            processPath: `${packageRoot_1.default(__dirname)}/src/node/scss/compile/SScssCompilerProcess`,
            stdio: ['blessed'],
            params: Object.assign(Object.assign({}, sugar_1.default('scss.compile')), { watch: true })
        },
        svelte: {
            id: 'svelte',
            name: 'Svelte Compiler',
            description: 'Watch and build the svelte files',
            autoRun: true,
            processPath: `${packageRoot_1.default(__dirname)}/src/node/svelte/compile/SSvelteCompilerProcess`,
            stdio: ['blessed'],
            params: Object.assign(Object.assign({}, sugar_1.default('ts.svelte')), { watch: true })
        },
        ts: {
            id: 'ts',
            name: 'Typescript Compiler',
            description: 'Watch and build the typescript files',
            autoRun: true,
            processPath: `${packageRoot_1.default(__dirname)}/src/node/typescript/compile/STsCompilerProcess`,
            stdio: ['blessed'],
            params: Object.assign(Object.assign({}, sugar_1.default('ts.compile')), { watch: true })
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXItYXBwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvc3VnYXItYXBwLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJFQUFxRDtBQUNyRCxpRUFBaUQ7QUFFakQsa0JBQWU7SUFDYixPQUFPLEVBQUU7UUFDUCxZQUFZLEVBQUUsZ0JBQWdCO0tBQy9CO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFO1lBQ2QsRUFBRSxFQUFFLGdCQUFnQjtZQUNwQixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLFdBQVcsRUFDVCxnRkFBZ0Y7WUFDbEYsT0FBTyxFQUFFLElBQUk7WUFDYixXQUFXLEVBQUUsR0FBRyxxQkFBYSxDQUMzQixTQUFTLENBQ1Ysa0RBQWtEO1lBQ25ELEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNsQixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLGFBQWE7WUFDYixZQUFZO1lBQ1osZ0NBQWdDO1lBQ2hDLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsOEJBQThCO1lBQzlCLFFBQVE7WUFDUixNQUFNO1lBQ04sSUFBSTtTQUNMO1FBQ0QsTUFBTSxFQUFFO1lBQ04sRUFBRSxFQUFFLFFBQVE7WUFDWixJQUFJLEVBQUUsMEJBQTBCO1lBQ2hDLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsT0FBTyxFQUFFLEtBQUs7WUFDZCxXQUFXLEVBQUUsR0FBRyxxQkFBYSxDQUMzQixTQUFTLENBQ1Ysc0NBQXNDO1lBQ3ZDLEtBQUssRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNsQixNQUFNLG9CQUNELGVBQWEsQ0FBQyxRQUFRLENBQUMsQ0FDM0I7U0FDRjtRQUNELEVBQUUsRUFBRTtZQUNGLEVBQUUsRUFBRSxJQUFJO1lBQ1IsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEdBQUcscUJBQWEsQ0FDM0IsU0FBUyxDQUNWLHlDQUF5QztZQUMxQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDbEIsTUFBTSxrQ0FDRCxlQUFhLENBQUMsWUFBWSxDQUFDLEtBQzlCLEtBQUssRUFBRSxJQUFJLEVBQ1gsTUFBTSxFQUFFLElBQUksR0FDYjtTQUNGO1FBQ0QsSUFBSSxFQUFFO1lBQ0osRUFBRSxFQUFFLE1BQU07WUFDVixJQUFJLEVBQUUsZUFBZTtZQUNyQixXQUFXLEVBQ1QsNkRBQTZEO1lBQy9ELE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEdBQUcscUJBQWEsQ0FDM0IsU0FBUyxDQUNWLDZDQUE2QztZQUM5QyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDbEIsTUFBTSxrQ0FDRCxlQUFhLENBQUMsY0FBYyxDQUFDLEtBQ2hDLEtBQUssRUFBRSxJQUFJLEdBQ1o7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEdBQUcscUJBQWEsQ0FDM0IsU0FBUyxDQUNWLGlEQUFpRDtZQUNsRCxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDbEIsTUFBTSxrQ0FDRCxlQUFhLENBQUMsV0FBVyxDQUFDLEtBQzdCLEtBQUssRUFBRSxJQUFJLEdBQ1o7U0FDRjtRQUNELEVBQUUsRUFBRTtZQUNGLEVBQUUsRUFBRSxJQUFJO1lBQ1IsSUFBSSxFQUFFLHFCQUFxQjtZQUMzQixXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEdBQUcscUJBQWEsQ0FDM0IsU0FBUyxDQUNWLGlEQUFpRDtZQUNsRCxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDbEIsTUFBTSxrQ0FDRCxlQUFhLENBQUMsWUFBWSxDQUFDLEtBQzlCLEtBQUssRUFBRSxJQUFJLEdBQ1o7U0FDRjtLQUNGO0NBQ0YsQ0FBQyJ9