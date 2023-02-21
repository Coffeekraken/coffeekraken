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

export default function jsIntegration(docmapJson: any): void {
    const snippets: any[] = [];

    vscode.commands.registerCommand(
        'coffeekraken.s.sugar.import',
        (docmapObj) => {
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

                        const editor = vscode.window.activeTextEditor,
                            curPos = editor.selection.active;

                        const restorePosition = editor?.selection.active.with(
                            curPos.c + 1,
                            curPos.e,
                        );

                        if (editor) {
                            // avoid multiple add
                            if (
                                editor?.document.getText().includes(importStr)
                            ) {
                                return;
                            }
                            editor.insertSnippet(
                                new vscode.SnippetString(`${importStr}\n`),
                                new vscode.Position(0, 0),
                            );
                            var newSelection = new vscode.Selection(
                                restorePosition,
                                restorePosition,
                            );
                            editor.selection = newSelection;
                        }
                    }
                    break;
            }
        },
    );

    // snippets
    for (let [key, docmapObj] of Object.entries(docmapJson)) {
        const type = docmapObj.type?.raw?.toLowerCase?.();

        // only beta and stable items
        if (docmapObj.status !== 'beta' && docmapObj.status !== 'stable') {
            continue;
        }

        // handle only class and functions
        if (type !== 'function' && type !== 'class') {
            continue;
        }

        if (!docmapObj.author?.name) {
            console.log(
                `[Sugar] The namespace ${docmapObj.id} does not have any author defined...`,
            );
            continue;
        }

        // handle only js stuff
        let isEligible = false;
        if (!docmapObj.platform) {
            console.log(
                `The namespace ${docmapObj.id} does not have any platform defined...`,
            );
            continue;
        }
        for (let platformObj of docmapObj.platform) {
            if (platformObj.name === 'js' || platformObj.name === 'node') {
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
        snippetCompletion.sup;
        snippetCompletion.command = {
            arguments: [docmapObj],
            command: 'coffeekraken.s.sugar.import',
        };

        const docs: any = __popinContent(docmapObj);
        snippetCompletion.documentation = docs;
        snippets.push(snippetCompletion);
    }

    vscode.languages.registerHoverProvider(
        [
            {
                scheme: 'file',
                language: 'typescript',
            },
            {
                scheme: 'file',
                language: 'javascript',
            },
        ],
        {
            provideHover(doc, pos, token) {
                const editor = vscode.window.activeTextEditor;

                // pos.e
                const range = editor?.document.getWordRangeAtPosition(
                    new vscode.Position(pos.line, pos.e),
                );
                const hoveredText = editor?.document.getText(range);

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
                language: 'typescript',
            },
            {
                scheme: 'file',
                language: 'javascript',
            },
        ],
        {
            provideCompletionItems(document, position, token, context) {
                return snippets;
            },
        },
    );
}
