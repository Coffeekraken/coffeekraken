"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("../node/path/packageRoot"));
const sugar_1 = __importDefault(require("../shared/config/sugar"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXItYXBwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1Z2FyLWFwcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyRUFBcUQ7QUFDckQsbUVBQW1EO0FBRW5ELGtCQUFlO0lBQ2IsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLGdCQUFnQjtLQUMvQjtJQUNELE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRTtZQUNkLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixXQUFXLEVBQ1QsZ0ZBQWdGO1lBQ2xGLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEdBQUcscUJBQWEsQ0FDM0IsU0FBUyxDQUNWLGtEQUFrRDtZQUNuRCxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDbEIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixhQUFhO1lBQ2IsWUFBWTtZQUNaLGdDQUFnQztZQUNoQyxnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLDhCQUE4QjtZQUM5QixRQUFRO1lBQ1IsTUFBTTtZQUNOLElBQUk7U0FDTDtRQUNELE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLDBCQUEwQjtZQUNoQyxXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLEdBQUcscUJBQWEsQ0FDM0IsU0FBUyxDQUNWLHNDQUFzQztZQUN2QyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDbEIsTUFBTSxvQkFDRCxlQUFhLENBQUMsUUFBUSxDQUFDLENBQzNCO1NBQ0Y7UUFDRCxFQUFFLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSTtZQUNSLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSxHQUFHLHFCQUFhLENBQzNCLFNBQVMsQ0FDVix5Q0FBeUM7WUFDMUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ2xCLE1BQU0sa0NBQ0QsZUFBYSxDQUFDLFlBQVksQ0FBQyxLQUM5QixLQUFLLEVBQUUsSUFBSSxFQUNYLE1BQU0sRUFBRSxJQUFJLEdBQ2I7U0FDRjtRQUNELElBQUksRUFBRTtZQUNKLEVBQUUsRUFBRSxNQUFNO1lBQ1YsSUFBSSxFQUFFLGVBQWU7WUFDckIsV0FBVyxFQUNULDZEQUE2RDtZQUMvRCxPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSxHQUFHLHFCQUFhLENBQzNCLFNBQVMsQ0FDViw2Q0FBNkM7WUFDOUMsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ2xCLE1BQU0sa0NBQ0QsZUFBYSxDQUFDLGNBQWMsQ0FBQyxLQUNoQyxLQUFLLEVBQUUsSUFBSSxHQUNaO1NBQ0Y7UUFDRCxNQUFNLEVBQUU7WUFDTixFQUFFLEVBQUUsUUFBUTtZQUNaLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSxHQUFHLHFCQUFhLENBQzNCLFNBQVMsQ0FDVixpREFBaUQ7WUFDbEQsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ2xCLE1BQU0sa0NBQ0QsZUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUM3QixLQUFLLEVBQUUsSUFBSSxHQUNaO1NBQ0Y7UUFDRCxFQUFFLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSTtZQUNSLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSxHQUFHLHFCQUFhLENBQzNCLFNBQVMsQ0FDVixpREFBaUQ7WUFDbEQsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ2xCLE1BQU0sa0NBQ0QsZUFBYSxDQUFDLFlBQVksQ0FBQyxLQUM5QixLQUFLLEVBQUUsSUFBSSxHQUNaO1NBQ0Y7S0FDRjtDQUNGLENBQUMifQ==