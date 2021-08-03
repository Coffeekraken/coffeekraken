// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import __axios from 'axios';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "s-vscode-sugar" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('s-vscode-sugar.activate', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('VSCode Sugar extention actiated with success');
    });
    context.subscriptions.push(disposable);

	let _config;

    let disposableConfigurationExplorer = vscode.commands.registerCommand(
        's-vscode-sugar.configurationExplorer',
        () => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user

			function displaySelector() {
				const quickPick = vscode.window.createQuickPick();

				quickPick.items = Object.keys(_config).map(label => {
					return {
						label,
						description: _config[label]?.toString() ?? ''
					};
				});
				quickPick.onDidChangeSelection(selection => {
					if (selection[0]) {
						const value = _config[selection[0].label];



						options[selection[0].label](context)
							.catch(console.error);
					}
				});
				quickPick.onDidHide(() => quickPick.dispose());
				quickPick.show();

			}

			if (!_config) {
				__axios.get('http://localhost:8888/api/config?flat=1').then((data) => {
					_config = data.data;
					displaySelector();
				});
			} else {
				displaySelector();
			}


			



            // const input = vscode.window.createInputBox();
            // input.onDidChangeValue((e) => {
            //     console.log(e);
            //     // output.appendLine(e);
            // });
            // input.show();

            

            // vscode.window.showInformationMessage('VSCode Sugar extention actiated with success');
        },
    );
    context.subscriptions.push(disposableConfigurationExplorer);
}

// this method is called when your extension is deactivated
export function deactivate() {}
