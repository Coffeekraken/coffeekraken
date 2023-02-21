import * as vscode from 'vscode';
import __colors from '../lib/colors';

function getDocmapObjByName(docmapJson: any, name: string): any {
    for (let [namespace, docmapObj] of Object.entries(docmapJson)) {
        if (name === docmapObj.name || name === `__${docmapObj.name}`) {
            return docmapObj;
        }
    }
}

export default function jsIntegration(docmapJson: any): void {
    function popinContent(docmapObj) {
        const params = docmapObj.param ?? {},
            settings = docmapObj.setting ?? {};

        const content = `# __${docmapObj.name}

${docmapObj.description}

${Object.keys(params)
    .map((param) => {
        const paramObj = params[param];
        return `
- <span style="color:${__colors.yellow};">**${
            paramObj.defaultStr ? `[${param}=${paramObj.defaultStr}]` : param
        }**</span>${'&nbsp;'.repeat(
            20 - param.length >= 0 ? 20 - param.length : 1,
        )}<span style="color:${__colors.cyan};">__{${
            paramObj.type.raw
        }}__</span>
    - ${paramObj.description}`;
    })
    .join('\n')}
${
    Object.keys(settings).length
        ? `
### Settings
`
        : ''
}

${Object.keys(settings)
    .map((setting) => {
        const settingObj = settings[setting];
        return `
- <span style="color:${__colors.yellow};">**${
            settingObj.defaultStr
                ? `[${setting}=${settingObj.defaultStr}]`
                : setting
        }**</span>${'&nbsp;'.repeat(
            20 - setting.length >= 0 ? 20 - setting.length : 1,
        )}<span style="color:${__colors.cyan};">__{${
            settingObj.type.raw
        }}__</span>
    - ${settingObj.description}`;
    })
    .join('\n')}

${docmapObj.example
    ?.map?.(
        (exampleObj) => `
### ${exampleObj.title ?? 'Example'}

\`\`\`${exampleObj.language}
${exampleObj.code}
\`\`\`
`,
    )
    .join('\n')}
    
### More

- [Full documentation](https://coffeekraken.io/api/${docmapObj.id})
    
    `;

        const docs: any = new vscode.MarkdownString(content);
        docs.supportHtml = true;
        docs.isTrusted = true;
        return docs;
    }

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

        // handle only class and functions
        if (type !== 'function' && type !== 'class') {
            continue;
        }

        let str = `__${docmapObj.name}`,
            label = `sugar ${str}`;

        const snippetCompletion = new vscode.CompletionItem(str);
        snippetCompletion.kind = vscode.CompletionItemKind.Function;
        snippetCompletion.label = label;
        snippetCompletion.insertText = new vscode.SnippetString(str);
        snippetCompletion.sup;
        snippetCompletion.command = {
            arguments: [docmapObj],
            command: 'coffeekraken.s.sugar.import',
        };

        const docs: any = popinContent(docmapObj);
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

                const popinContentStr = popinContent(docmapObj);
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
