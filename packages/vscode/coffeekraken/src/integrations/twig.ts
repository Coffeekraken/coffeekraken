// @ts-nocheck

import * as vscode from 'vscode';
import __colors from '../lib/colors';
import __popinContent from '../lib/popinContent';

function getDocmapObjByName(docmapJson: any, name: string): any {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj.name || name === `__${docmapObj.name}`) {
            return docmapObj;
        }
    }
}

export default function twigIntegration(docmapJson: any): void {
    const snippets: any[] = [];

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

        let str = `__${docmapObj.name}`,
            label = `${str}`;

        const snippetCompletion = new vscode.CompletionItem(str);
        snippetCompletion.kind = vscode.CompletionItemKind.Function;
        snippetCompletion.label = label;
        snippetCompletion.filterText = `${docmapObj.namespace}.${label}`;
        snippetCompletion.insertText = new vscode.SnippetString(str);

        const docs: any = __popinContent(docmapObj);
        snippetCompletion.documentation = docs;
        snippets.push(snippetCompletion);
    }

    vscode.languages.registerHoverProvider(
        [
            {
                scheme: 'file',
                language: 'twig',
            },
        ],
        {
            provideHover(doc, pos, token) {
                const editor = vscode.window.activeTextEditor,
                    range = editor?.document.getWordRangeAtPosition(
                        new vscode.Position(pos.line, pos.e),
                    ),
                    hoveredText = editor?.document.getText(range);

                if (!hoveredText) {
                    return;
                }

                const docmapObj = getDocmapObjByName(docmapJson, hoveredText);

                if (!docmapObj) {
                    return;
                }

                const popinContentStr = __popinContent(docmapObj);
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
                language: 'twig',
            },
        ],
        {
            provideCompletionItems(document, position, token, context) {
                return snippets;
            },
        },
    );
}
