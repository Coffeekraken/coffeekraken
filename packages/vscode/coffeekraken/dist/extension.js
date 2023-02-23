/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// @ts-nocheck
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(2);
const __fs = __webpack_require__(3);
function docmapJson() {
    const rootDir = vscode.workspace.workspaceFolders[0].uri.fsPath;
    let docmapJson = {}, docmapJsonMap = {};
    // if (__fs.existsSync(`${rootDir}/docmap.json`)) {
    //     docmapJson = JSON.parse(
    //         __fs.readFileSync(`${rootDir}/docmap.json`).toString(),
    //     );
    //     if (docmapJson.generated?.map) {
    //         docmapJsonMap = docmapJson.generated.map;
    //     }
    // }
    const packageJsonPath = `${rootDir}/package.json`;
    if (!__fs.existsSync(packageJsonPath)) {
        return {};
    }
    const packageJson = JSON.parse(__fs.readFileSync(packageJsonPath).toString());
    const deps = {
        ...(packageJson.devDependencies ?? {}),
        ...(packageJson.dependencies ?? {}),
    };
    const parts = rootDir.split('/');
    let monoRootDir;
    while (parts.length >= 1) {
        parts.pop();
        if (__fs.existsSync(`${parts.join('/')}/node_modules`)) {
            monoRootDir = parts.join('/');
            break;
        }
    }
    Object.keys(deps).forEach((packageName) => {
        // const pkgDocmapJsonPath = await import(`${pkg}/docmap.json`);
        const packagePath = `${rootDir}/node_modules/${packageName}/docmap.json`, monoPackagePath = `${monoRootDir ?? ''}/node_modules/${packageName}/docmap.json`;
        let packageDocmapJsonPath;
        if (__fs.existsSync(packagePath)) {
            packageDocmapJsonPath = __fs.realpathSync(packagePath);
        }
        else if (__fs.existsSync(monoPackagePath)) {
            packageDocmapJsonPath = __fs.realpathSync(monoPackagePath);
        }
        else {
            return;
        }
        const packageDocmapJson = JSON.parse(__fs.readFileSync(packageDocmapJsonPath).toString());
        if (packageDocmapJson.generated?.map) {
            docmapJsonMap = {
                ...docmapJsonMap,
                ...packageDocmapJson.generated.map,
            };
        }
    });
    // filter docmap with only what we want for this extension
    for (let [key, docmapObj] of Object.entries(docmapJsonMap)) {
        let isValid = true;
        const type = docmapObj.type?.raw?.toLowerCase?.();
        if (!docmapObj.snippet) {
            delete docmapJsonMap[key];
            continue;
        }
        if (![
            'class',
            'function',
            'postcssmixin',
            'postcssfunction',
            'twigfunction',
            'twigfilter',
        ].includes(type)) {
            delete docmapJsonMap[key];
            continue;
        }
        // only beta and stable items
        if (!docmapObj.status) {
            console.log(`[Coffeekraken] The namespace ${docmapObj.id} does not have any status defined...`);
        }
        if (docmapObj.status !== 'beta' && docmapObj.status !== 'stable') {
            isValid = false;
        }
        if (!docmapObj.author?.name) {
            console.log(`[Coffeekraken] The namespace ${docmapObj.id} does not have any author defined...`);
            isValid = false;
        }
        if (!docmapObj.platform) {
            console.log(`[Coffeekraken] The namespace ${docmapObj.id} does not have any platform defined...`);
            isValid = false;
        }
        if (!isValid) {
            delete docmapJsonMap[key];
        }
    }
    return docmapJsonMap;
}
exports["default"] = docmapJson;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// @ts-nocheck
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(2);
const popinContent_1 = __webpack_require__(5);
function getDocmapObjByName(docmapJson, name) {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj.name || name === `__${docmapObj.name}`) {
            return docmapObj;
        }
    }
}
function jsIntegration(docmapJson) {
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
                    // ending ";"
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
        // handle only js stuff
        let isEligible = false;
        for (let platformObj of docmapObj.platform) {
            if (platformObj.name === 'js' || platformObj.name === 'node') {
                isEligible = true;
                break;
            }
        }
        if (!isEligible) {
            continue;
        }
        let str = `__${docmapObj.name}`, label = `${str}`;
        const snippetCompletion = new vscode.CompletionItem(docmapObj.snippet.label);
        snippetCompletion.kind = vscode.CompletionItemKind.Function;
        snippetCompletion.label = docmapObj.snippet.label.split('(')[0];
        snippetCompletion.insertText = new vscode.SnippetString(docmapObj.snippet.code ?? docmapObj.snippet.label);
        snippetCompletion.command = {
            arguments: [docmapObj],
            command: 'coffeekraken.s.sugar.import',
        };
        const docs = (0, popinContent_1.default)(docmapObj);
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
            const popinContentStr = (0, popinContent_1.default)(docmapObj);
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


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// @ts-nocheck
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(2);
const colors_1 = __webpack_require__(6);
function popinContent(docmapObj, metas) {
    const params = docmapObj.param ?? {}, settings = docmapObj.setting ?? {};
    const content = `## ${docmapObj.async
        ? `<span style="color:${colors_1.default.yellow};">async</span>`
        : ''} ${metas?.title ?? `__${docmapObj.name}`}
<span style="color:${colors_1.default.grey};">${docmapObj.id}</span><br/>
Status: <span style="color:${docmapObj.status === 'beta'
        ? colors_1.default.red
        : docmapObj.status === 'stable'
            ? colors_1.default.green
            : colors_1.default.red};">**${docmapObj.status ?? 'beta'}**</span> | Since: <span style="color:${colors_1.default.magenta};">**${docmapObj.since ?? '...'}**</span>

${Object.keys(params)
        .map((param) => {
        const paramObj = params[param];
        return `
@param ${'&nbsp;'.repeat(5)} <span style="color:${colors_1.default.yellow};">**${paramObj.defaultStr ? `[${param}=${paramObj.defaultStr}]` : param}**</span> - <span style="color:${colors_1.default.cyan};">{${paramObj.type.raw}}</span><br/>
${paramObj.description}`;
    })
        .join('\n')}
${docmapObj.return
        ? `
@return ${'&nbsp;'.repeat(5)} <span style="color:${colors_1.default.cyan};">{${docmapObj.return.type.raw}}</span><br/>
${docmapObj.return.description}`
        : ''}

${Object.keys(settings).length
        ? `
### Settings
`
        : ''}

${Object.keys(settings)
        .map((setting) => {
        const settingObj = settings[setting];
        return `
@setting ${'&nbsp;'.repeat(5)} <span style="color:${colors_1.default.yellow};">**${settingObj.defaultStr
            ? `[${setting}=${settingObj.defaultStr}]`
            : setting}**</span> - <span style="color:${colors_1.default.cyan};">{${settingObj.type.raw}}</span><br/>
${settingObj.description}`;
    })
        .join('\n')}

${docmapObj.example
        ?.map?.((exampleObj) => `
### ${exampleObj.title ?? 'Example'} (${exampleObj.language})

\`\`\`${exampleObj.language}
${exampleObj.code}
\`\`\`
`)
        .join('\n')}

### Description

${docmapObj.description}

${docmapObj.author
        ? `### Author

- ${docmapObj.author.name} [${docmapObj.author.email}](mailto:${docmapObj.author.email})`
        : ''}

### More

![Coffeekraken](https://cdnv2.coffeekraken.io/coffeekraken-logo-vscode-popin.png)

- [Full documentation](https://coffeekraken.io/api/${docmapObj.id})
- [Report an issue](https://github.com/Coffeekraken/coffeekraken/issues)
- [Join us on Discord](https://discord.com/login?redirect_to=%2Fchannels%2F940362961682333767%2F940362962223378494)


    `;
    const docs = new vscode.MarkdownString(content);
    docs.supportHtml = true;
    docs.isTrusted = true;
    return docs;
}
exports["default"] = popinContent;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {


// @ts-nocheck
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
    grey: '#666666',
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// @ts-nocheck
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(2);
const popinContent_1 = __webpack_require__(5);
function getDocmapObjByCssId(docmapJson, name) {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj._cssId) {
            return docmapObj;
        }
    }
}
function cssIntegration(docmapJson) {
    const snippets = [];
    // snippets
    for (let [key, docmapObj] of Object.entries(docmapJson)) {
        const type = docmapObj.type?.raw?.toLowerCase?.();
        // handle only class and functions
        if (type !== 'postcssmixin') {
            continue;
        }
        // handle only css stuff
        let isEligible = false;
        for (let platformObj of docmapObj.platform) {
            if (platformObj.name === 'postcss' || platformObj.name === 'css') {
                isEligible = true;
                break;
            }
        }
        if (!isEligible) {
            continue;
        }
        let lastPart = '';
        let str = `@sugar.${docmapObj.id
            .split('.')
            .slice(2)
            .filter((p) => {
            if (p === lastPart) {
                return false;
            }
            lastPart = p;
            return true;
        })
            .join('.')
            .replace('node.mixin.', '')}`, label = `${str}`;
        docmapObj._cssId = str;
        const snippetCompletion = new vscode.CompletionItem(str);
        snippetCompletion.kind = vscode.CompletionItemKind.Function;
        snippetCompletion.label = label;
        snippetCompletion.filterText = `${docmapObj.namespace}.${label}`;
        snippetCompletion.insertText = new vscode.SnippetString(str);
        snippetCompletion.sup;
        // snippetCompletion.command = {
        //     arguments: [docmapObj],
        //     command: 'coffeekraken.s.sugar.css.import',
        // };
        const docs = (0, popinContent_1.default)(docmapObj, {
            title: str,
        });
        snippetCompletion.documentation = docs;
        snippets.push(snippetCompletion);
    }
    vscode.languages.registerHoverProvider([
        {
            scheme: 'file',
            language: 'css',
        },
    ], {
        provideHover(doc, pos, token) {
            const editor = vscode.window.activeTextEditor;
            // pos.e
            const range = editor?.document.getWordRangeAtPosition(new vscode.Position(pos.line, pos.e), /[a-zA-Z0-9-_\.\@]+/);
            const lineStr = editor?.document.lineAt(pos.line).text, hoveredText = editor?.document.getText(range);
            if (!hoveredText) {
                return;
            }
            const docmapObj = getDocmapObjByCssId(docmapJson, hoveredText);
            if (!docmapObj) {
                return;
            }
            const popinContentStr = (0, popinContent_1.default)(docmapObj, {
                title: docmapObj._cssId,
            });
            return {
                contents: [popinContentStr],
            };
        },
    });
    vscode.languages.registerCompletionItemProvider([
        {
            scheme: 'file',
            language: 'css',
        },
    ], {
        provideCompletionItems(document, position, token, context) {
            return snippets;
        },
    });
}
exports["default"] = cssIntegration;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// @ts-nocheck
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(2);
const popinContent_1 = __webpack_require__(5);
function getDocmapObjByName(docmapJson, name) {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj.name || name === `__${docmapObj.name}`) {
            return docmapObj;
        }
    }
}
function twigIntegration(docmapJson) {
    const snippets = [];
    // snippets
    for (let [key, docmapObj] of Object.entries(docmapJson)) {
        const type = docmapObj.type?.raw?.toLowerCase?.();
        // handle only class and functions
        if (type !== 'twigfunction' && type !== 'twigfilter') {
            continue;
        }
        // handle only js stuff
        let isEligible = false;
        for (let platformObj of docmapObj.platform) {
            if (platformObj.name === 'twig') {
                isEligible = true;
                break;
            }
        }
        if (!isEligible) {
            continue;
        }
        let str = `__${docmapObj.name}`, label = `${str}`;
        const snippetCompletion = new vscode.CompletionItem(str);
        snippetCompletion.kind = vscode.CompletionItemKind.Function;
        snippetCompletion.label = label;
        snippetCompletion.filterText = `${docmapObj.namespace}.${label}`;
        snippetCompletion.insertText = new vscode.SnippetString(str);
        const docs = (0, popinContent_1.default)(docmapObj);
        snippetCompletion.documentation = docs;
        snippets.push(snippetCompletion);
    }
    vscode.languages.registerHoverProvider([
        {
            scheme: 'file',
            language: 'twig',
        },
    ], {
        provideHover(doc, pos, token) {
            const editor = vscode.window.activeTextEditor, range = editor?.document.getWordRangeAtPosition(new vscode.Position(pos.line, pos.e)), hoveredText = editor?.document.getText(range);
            if (!hoveredText) {
                return;
            }
            const docmapObj = getDocmapObjByName(docmapJson, hoveredText);
            if (!docmapObj) {
                return;
            }
            const popinContentStr = (0, popinContent_1.default)(docmapObj);
            return {
                contents: [popinContentStr],
            };
        },
    });
    vscode.languages.registerCompletionItemProvider([
        {
            scheme: 'file',
            language: 'twig',
        },
    ], {
        provideCompletionItems(document, position, token, context) {
            return snippets;
        },
    });
}
exports["default"] = twigIntegration;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// @ts-nocheck
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(2);
const popinContent_1 = __webpack_require__(5);
function getDocmapObjByPhpId(docmapJson, name) {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj._phpId) {
            return docmapObj;
        }
    }
}
function phpIntegration(docmapJson) {
    const snippets = [];
    // snippets
    for (let [key, docmapObj] of Object.entries(docmapJson)) {
        const type = docmapObj.type?.raw?.toLowerCase?.();
        // handle only class and functions
        if (type !== 'function' && type !== 'class') {
            continue;
        }
        // handle only css stuff
        let isEligible = false;
        for (let platformObj of docmapObj.platform) {
            if (platformObj.name === 'php') {
                isEligible = true;
                break;
            }
        }
        if (!isEligible) {
            continue;
        }
        let str = `\\Sugar\\${docmapObj.id
            .split('.')
            .slice(3)
            .join('.')
            .replace(/\./gm, '\\')}`, label = `${str}`;
        docmapObj._phpId = str;
        const snippetCompletion = new vscode.CompletionItem(docmapObj.snippet.label);
        snippetCompletion.kind = vscode.CompletionItemKind.Function;
        snippetCompletion.label = docmapObj.snippet.label.split('(')[0];
        snippetCompletion.insertText = new vscode.SnippetString(docmapObj.snippet.code ?? docmapObj.snippet.label);
        const docs = (0, popinContent_1.default)(docmapObj, {
            title: str,
        });
        snippetCompletion.documentation = docs;
        snippets.push(snippetCompletion);
    }
    vscode.languages.registerHoverProvider([
        {
            scheme: 'file',
            language: 'php',
        },
    ], {
        provideHover(doc, pos, token) {
            const editor = vscode.window.activeTextEditor;
            // pos.e
            const range = editor?.document.getWordRangeAtPosition(new vscode.Position(pos.line, pos.e), /[a-zA-Z0-9-_\\]+/);
            const lineStr = editor?.document.lineAt(pos.line).text, hoveredText = editor?.document.getText(range);
            if (!hoveredText) {
                return;
            }
            const docmapObj = getDocmapObjByPhpId(docmapJson, hoveredText);
            if (!docmapObj) {
                return;
            }
            const popinContentStr = (0, popinContent_1.default)(docmapObj, {
                title: docmapObj._phpId,
            });
            return {
                contents: [popinContentStr],
            };
        },
    });
    vscode.languages.registerCompletionItemProvider([
        {
            scheme: 'file',
            language: 'php',
        },
    ], {
        provideCompletionItems(document, position, token, context) {
            return snippets;
        },
    });
}
exports["default"] = phpIntegration;


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
const docmapJson_1 = __webpack_require__(1);
const js_1 = __webpack_require__(4);
const css_1 = __webpack_require__(7);
const twig_1 = __webpack_require__(8);
const php_1 = __webpack_require__(9);
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
async function activate(context) {
    // load the docmap
    const docmapJson = (0, docmapJson_1.default)();
    // js integration
    (0, js_1.default)(docmapJson);
    // css integration
    (0, css_1.default)(docmapJson);
    // twig integration
    (0, twig_1.default)(docmapJson);
    // php integration
    (0, php_1.default)(docmapJson);
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