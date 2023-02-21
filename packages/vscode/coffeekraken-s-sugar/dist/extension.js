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

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    black: '#3b4252',
    red: '#bf616a',
    green: '#a3be8c',
    yellow: '#ebcb8b',
    blue: '#81a1c1',
    magenta: '#b48ead',
    cyan: '#88c0d0',
    white: '#e5e9f0',
};


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
const __fs = __webpack_require__(2);
function docmapJson() {
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
    return docmapJsonMap;
}
exports["default"] = docmapJson;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
const colors_1 = __webpack_require__(3);
function getDocmapObjByName(docmapJson, name) {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj.name || name === `__${docmapObj.name}`) {
            return docmapObj;
        }
    }
}
function jsIntegration(docmapJson) {
    function popinContent(docmapObj) {
        const params = docmapObj.param ?? {}, settings = docmapObj.setting ?? {};
        const content = `# __${docmapObj.name}

${docmapObj.description}

${Object.keys(params)
            .map((param) => {
            const paramObj = params[param];
            return `
- <span style="color:${colors_1.default.yellow};">**${paramObj.defaultStr ? `[${param}=${paramObj.defaultStr}]` : param}**</span>${'&nbsp;'.repeat(20 - param.length >= 0 ? 20 - param.length : 1)}<span style="color:${colors_1.default.cyan};">__{${paramObj.type.raw}}__</span>
    - ${paramObj.description}`;
        })
            .join('\n')}
${Object.keys(settings).length
            ? `
### Settings
`
            : ''}

${Object.keys(settings)
            .map((setting) => {
            const settingObj = settings[setting];
            return `
- <span style="color:${colors_1.default.yellow};">**${settingObj.defaultStr
                ? `[${setting}=${settingObj.defaultStr}]`
                : setting}**</span>${'&nbsp;'.repeat(20 - setting.length >= 0 ? 20 - setting.length : 1)}<span style="color:${colors_1.default.cyan};">__{${settingObj.type.raw}}__</span>
    - ${settingObj.description}`;
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
    
### More

- [Full documentation](https://coffeekraken.io/api/${docmapObj.id})
    
    `;
        const docs = new vscode.MarkdownString(content);
        docs.supportHtml = true;
        docs.isTrusted = true;
        return docs;
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
    for (let [key, docmapObj] of Object.entries(docmapJson)) {
        const type = docmapObj.type?.raw?.toLowerCase?.();
        // handle only class and functions
        if (type !== 'function' && type !== 'class') {
            continue;
        }
        let str = `__${docmapObj.name}`, label = `sugar ${str}`;
        const snippetCompletion = new vscode.CompletionItem(str);
        snippetCompletion.kind = vscode.CompletionItemKind.Function;
        snippetCompletion.label = label;
        snippetCompletion.insertText = new vscode.SnippetString(str);
        snippetCompletion.sup;
        snippetCompletion.command = {
            arguments: [docmapObj],
            command: 'coffeekraken.s.sugar.import',
        };
        const docs = popinContent(docmapObj);
        snippetCompletion.documentation = docs;
        snippets.push(snippetCompletion);
    }
    vscode.languages.registerHoverProvider([
        {
            scheme: 'file',
            language: 'typescript',
        },
        {
            scheme: 'file',
            language: 'javascript',
        },
    ], {
        provideHover(doc, pos, token) {
            const editor = vscode.window.activeTextEditor;
            // pos.e
            const range = editor?.document.getWordRangeAtPosition(new vscode.Position(pos.line, pos.e));
            const hoveredText = editor?.document.getText(range);
            if (!hoveredText) {
                return;
            }
            const docmapObj = getDocmapObjByName(docmapJson, hoveredText);
            if (!docmapObj) {
                return;
            }
            const popinContentStr = popinContent(docmapObj);
            return {
                contents: [popinContentStr],
            };
        },
    });
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
            return snippets;
        },
    });
}
exports["default"] = jsIntegration;


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
const docmapJson_1 = __webpack_require__(4);
const js_1 = __webpack_require__(5);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
async function activate(context) {
    // load the docmap
    const docmapJson = (0, docmapJson_1.default)();
    // js integration
    (0, js_1.default)(docmapJson);
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