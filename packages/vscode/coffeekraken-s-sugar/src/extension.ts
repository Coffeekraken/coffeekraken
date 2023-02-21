// @ts-nocheck

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import __SDocmap from '@coffeekraken/s-docmap';
import * as __fs from 'fs';
import * as __glob from 'glob';
import __findPkgJson from 'find-package-json';
import __colors from './lib/colors';
import __docmapJson from './lib/docmapJson';

import __jsIntegration from './integrations/js';
import __cssIntegration from './integrations/css';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    // load the docmap
    const docmapJson = __docmapJson();

    // js integration
    __jsIntegration(docmapJson);

    // css integration
    __cssIntegration(docmapJson);
}

// This method is called when your extension is deactivated
export function deactivate() {}
