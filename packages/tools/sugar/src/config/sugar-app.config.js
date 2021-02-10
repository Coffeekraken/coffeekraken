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
        // compileTs: {
        //   id: 'compileTs',
        //   name: 'Compile Typescript',
        //   autoRun: true,
        //   description:
        //     'Expose an HTTP server using ExpressJs and serve requested files, views, etc...',
        //   processPath: `${__packageRoot(
        //     __dirname
        //   )}/src/node/typescript/compile/SCompileTsProcess`,
        //   stdio: ['terminal', 'socket'],
        //   params: {
        //     stacks: ['js', 'node'],
        //     transpileOnly: true,
        //     watch: true
        //   }
        // }
        // buildScss: {
        //   id: 'buildScss',
        //   name: 'Sugar App Build SCSS',
        //   description:
        //     'Watch and build the SCSS files to production ready CSS ones',
        //   module: `${__packageRoot(
        //     __dirname
        //   )}/src/node/build/scss/SBuildScssSugarAppModule`,
        //   interface: `${__packageRoot(
        //     __dirname
        //   )}/src/node/build/scss/interface/SBuildScssInterface`,
        //   ui: `${__packageRoot(
        //     __dirname
        //   )}/src/node/build/scss/SBuildScssSugarAppTerminalUi`,
        //   params: '@config.build.scss',
        //   shortcuts: {
        //     'ctrl+b': {
        //       name: 'Build',
        //       params: {},
        //       settings: {}
        //     },
        //     'ctrl+p': {
        //       name: 'Build prod',
        //       params: {
        //         prod: true
        //       },
        //       settings: {}
        //     }
        //   }
        // },
        // buildJs: {
        //   id: 'buildJs',
        //   name: 'Sugar App Build JS',
        //   description: 'Watch and build the JS files to production ready ones',
        //   module: `${__packageRoot(
        //     __dirname
        //   )}/src/node/build/js/SBuildJsSugarAppModule`,
        //   interface: `${__packageRoot(
        //     __dirname
        //   )}/src/node/build/js/interface/SBuildJsInterface`,
        //   ui: `${__packageRoot(
        //     __dirname
        //   )}/src/node/build/js/SBuildJsSugarAppTerminalUi`,
        //   params: '@config.build.js',
        //   shortcuts: {
        //     'ctrl+b': {
        //       name: 'Build all',
        //       params: {},
        //       settings: {}
        //     },
        //     'ctrl+p': {
        //       name: 'Build prod',
        //       params: {
        //         prod: true
        //       },
        //       settings: {}
        //     }
        //   }
        // }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VnYXItYXBwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1Z2FyLWFwcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyRUFBcUQ7QUFDckQsaUVBQWlEO0FBRWpELGtCQUFlO0lBQ2IsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLGdCQUFnQjtLQUMvQjtJQUNELE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRTtZQUNkLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixXQUFXLEVBQ1QsZ0ZBQWdGO1lBQ2xGLE9BQU8sRUFBRSxJQUFJO1lBQ2IsV0FBVyxFQUFFLEdBQUcscUJBQWEsQ0FDM0IsU0FBUyxDQUNWLGtEQUFrRDtZQUNuRCxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDbEIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixhQUFhO1lBQ2IsWUFBWTtZQUNaLGdDQUFnQztZQUNoQyxnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLDhCQUE4QjtZQUM5QixRQUFRO1lBQ1IsTUFBTTtZQUNOLElBQUk7U0FDTDtRQUNELE1BQU0sRUFBRTtZQUNOLEVBQUUsRUFBRSxRQUFRO1lBQ1osSUFBSSxFQUFFLDBCQUEwQjtZQUNoQyxXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsV0FBVyxFQUFFLEdBQUcscUJBQWEsQ0FDM0IsU0FBUyxDQUNWLHNDQUFzQztZQUN2QyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDbEIsTUFBTSxvQkFDRCxlQUFhLENBQUMsUUFBUSxDQUFDLENBQzNCO1NBQ0Y7UUFDRCxFQUFFLEVBQUU7WUFDRixFQUFFLEVBQUUsSUFBSTtZQUNSLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsV0FBVyxFQUFFLHNDQUFzQztZQUNuRCxPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSxHQUFHLHFCQUFhLENBQzNCLFNBQVMsQ0FD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