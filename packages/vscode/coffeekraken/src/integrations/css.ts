// @ts-nocheck

import * as vscode from 'vscode';
import __popinContent from '../lib/popinContent.js';

function getDocmapObjByCssId(docmapJson: any, name: string): any {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj._cssId) {
            return docmapObj;
        }
    }
}

export default function cssIntegration(docmapJson: any): void {
    const snippets: any[] = [];

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

                .replace('node.mixin.', '')}`,
            label = `${str}`;

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
                language: 'css',
            },
        ],
        {
            provideHover(doc, pos, token) {
                const editor = vscode.window.activeTextEditor;

                // pos.e
                const range = editor?.document.getWordRangeAtPosition(
                    new vscode.Position(pos.line, pos.e),
                    /[a-zA-Z0-9-_\.\@]+/,
                );

                const lineStr = editor?.document.lineAt(pos.line).text,
                    hoveredText = editor?.document.getText(range);

                if (!hoveredText) {
                    return;
                }

                const docmapObj = getDocmapObjByCssId(docmapJson, hoveredText);

                if (!docmapObj) {
                    return;
                }

                const popinContentStr = __popinContent(docmapObj, {
                    title: docmapObj._cssId,
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
                language: 'css',
            },
        ],
        {
            provideCompletionItems(document, position, token, context) {
                return snippets;
            },
        },
    );
}
