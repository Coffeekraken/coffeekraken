// @ts-nocheck

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import __SDocmap from '@coffeekraken/s-docmap';
import * as __fs from 'fs';
import * as __glob from 'glob';
import __colors from './lib/colors';
import __docmapJson from './lib/docmapJson';

import __jsIntegration from './integrations/js';
import __cssIntegration from './integrations/css';
import __twigIntegration from './integrations/twig';
import __phpIntegration from './integrations/php';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
    // load the docmap
    const docmapJson = __docmapJson();

    // js integration
    __jsIntegration(docmapJson);

    // css integration
    __cssIntegration(docmapJson);

    // twig integration
    __twigIntegration(docmapJson);

    // php integration
    __phpIntegration(docmapJson);
}

// This method is called when your extension is deactivated
export function deactivate() {}
