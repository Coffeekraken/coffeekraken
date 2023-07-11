// @ts-nocheck

import * as vscode from 'vscode';
import __popinContent from '../lib/popinContent.js';

function getDocmapObjByPhpId(docmapJson: any, name: string): any {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj._phpId) {
            return docmapObj;
        }
    }
}

export default function phpIntegration(docmapJson: any): void {
    const snippets: any[] = [];

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
                .replace(/\./gm, '\\')}`,
            label = `${str}`;

        docmapObj._phpId = str;

        const snippetCompletion = new vscode.CompletionItem(
            docmapObj.snippet.label,
        );
        snippetCompletion.kind = vscode.CompletionItemKind.Function;
        snippetCompletion.label = docmapObj.snippet.label.split('(')[0];
        snippetCompletion.insertText = new vscode.SnippetString(
            docmapObj.snippet.code ?? docmapObj.snippet.label,
        );

        const docs: any = __popinContent(docmapObj, {
            title: str,
        });
        snippetCompletion.documentation = docs;
        snippets.push(snippetCompletion);
    }

    vscode.languages.registerHoverProvider(
        [
            {
                scheme: 'file',
                language: 'php',
            },
        ],
        {
            provideHover(doc, pos, token) {
                const editor = vscode.window.activeTextEditor;

                // pos.e
                const range = editor?.document.getWordRangeAtPosition(
                    new vscode.Position(pos.line, pos.e),
                    /[a-zA-Z0-9-_\\]+/,
                );

                const lineStr = editor?.document.lineAt(pos.line).text,
                    hoveredText = editor?.document.getText(range);

                if (!hoveredText) {
                    return;
                }

                const docmapObj = getDocmapObjByPhpId(docmapJson, hoveredText);

                if (!docmapObj) {
                    return;
                }

                const popinContentStr = __popinContent(docmapObj, {
                    title: docmapObj._phpId,
                });
                return {
                    contents: [popinContentStr],
                };
            },
        },
    );

    vscode.languages.registerCompletionItemProvider(
        [
            {
                scheme: 'file',
                language: 'php',
            },
        ],
        {
            provideCompletionItems(document, position, token, context) {
                return snippets;
            },
        },
    );
}
