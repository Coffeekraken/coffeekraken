/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("fs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

// @ts-nocheck
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
// import __SDocmap from '@coffeekraken/s-docmap';
const __fs = __webpack_require__(2);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
async function activate(context) {
    const rootDir = vscode.workspace.workspaceFolders[0].uri.fsPath;
    let docmapJson = {}, docmapJsonMap = {};
    if (__fs.existsSync(`${rootDir}/docmap.json`)) {
        docmapJson = JSON.parse(__fs.readFileSync(`${rootDir}/docmap.json`).toString());
        if (docmapJson.generated?.map) {
            docmapJsonMap = docmapJson.generated.map;
        }
    }
    const parts = rootDir.split('/');
    let monoRootDir;
    while (parts.length >= 1) {
        parts.pop();
        if (__fs.existsSync(`${parts.join('/')}/node_modules`)) {
            monoRootDir = parts.join('/');
            break;
        }
    }
    if (docmapJson.generated?.extends?.length) {
        for (let pkg of docmapJson.generated.extends) {
            // const pkgDocmapJsonPath = await import(`${pkg}/docmap.json`);
            const packagePath = `${rootDir}/node_modules/${pkg}/docmap.json`, monoPackagePath = `${monoRootDir ?? ''}/node_modules/${pkg}/docmap.json`;
            let packageDocmapJsonPath;
            if (__fs.existsSync(packagePath)) {
                packageDocmapJsonPath = packagePath;
            }
            else if (__fs.existsSync(monoPackagePath)) {
                packageDocmapJsonPath = monoPackagePath;
            }
            const packageDocmapJson = JSON.parse(__fs.readFileSync(packageDocmapJsonPath).toString());
            if (packageDocmapJson.generated?.map) {
                docmapJsonMap = {
                    ...docmapJsonMap,
                    ...packageDocmapJson.generated.map,
                };
            }
        }
    }
    const snippets = [];
    vscode.commands.registerCommand('coffeekraken.s.sugar.import', (docmapObj) => {
        const type = docmapObj.type?.raw?.toLowerCase?.();
        switch (docmapObj.extension) {
            case 'js':
            case 'ts':
                if (docmapObj.example?.length) {
                    const firstExample = docmapObj.example[0];
                    let importStr = firstExample.code.split('\n')[0];
                    if (!importStr.match(/^import\s/)) {
                        return;
                    }
                    const editor = vscode.window.activeTextEditor, curPos = editor.selection.active;
                    const restorePosition = editor?.selection.active.with(curPos.c + 1, curPos.e);
                    if (editor) {
                        // avoid multiple add
                        if (editor?.document.getText().includes(importStr)) {
                            return;
                        }
                        editor.insertSnippet(new vscode.SnippetString(`${importStr}\n`), new vscode.Position(0, 0));
                        var newSelection = new vscode.Selection(restorePosition, restorePosition);
                        editor.selection = newSelection;
                    }
                }
                break;
        }
    });
    // snippets
    for (let [key, docmapObj] of Object.entries(docmapJsonMap)) {
        const type = docmapObj.type?.raw?.toLowerCase?.();
        // handle only class and functions
        if (type !== 'function' && type !== 'class') {
            continue;
        }
        let str = `__${docmapObj.name}(`;
        if (docmapObj.param) {
            let i = 0, params = [];
            for (let [name, paramObj] of Object.entries(docmapObj.param)) {
                params.push(`\${${i}}`);
                i++;
            }
            str += params.join(', ');
        }
        str += ');';
        const snippetCompletion = new vscode.CompletionItem(str);
        snippetCompletion.insertText = new vscode.SnippetString(str);
        snippetCompletion.command = {
            arguments: [docmapObj],
            command: 'coffeekraken.s.sugar.import',
        };
        const params = docmapObj.param ?? {}, settings = docmapObj.setting ?? {};
        const docs = new vscode.MarkdownString(`# __${docmapObj.name}

${docmapObj.description}

${Object.keys(params)
            .map((param) => {
            const paramObj = params[param];
            return `
**<span style="color: #f00;">${param}</span>** __{${paramObj.type.raw}}__       
${paramObj.description}
    `;
        })
            .join('\n')}

${Object.keys(settings)
            .map((setting) => {
            const settingObj = settings[setting];
            return `
**<span style="color: #f00;">${setting}</span>** __{${settingObj.type.raw}}__
${settingObj.description}
    `;
        })
            .join('\n')}

${docmapObj.example
            ?.map?.((exampleObj) => `
### ${exampleObj.title ?? 'Example'}

\`\`\`${exampleObj.language}
${exampleObj.code}
\`\`\`
`)
            .join('\n')}
        `);
        docs.supportHtml = true;
        docs.isTrusted = true;
        snippetCompletion.documentation = docs;
        snippets.push(snippetCompletion);
    }
    vscode.languages.registerCompletionItemProvider([
        {
            scheme: 'file',
            language: 'typescript',
        },
        {
            scheme: 'file',
            language: 'javascript',
        },
    ], {
        provideCompletionItems(document, position, token, context) {
            console.log(snippets.length);
            return snippets;
        },
        // provideHover(document, position, token) {
        //     return {
        //         contents: ['Hover Content'],
        //     };
        // },
    });
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map