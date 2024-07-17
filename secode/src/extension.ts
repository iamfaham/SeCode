import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    console.log('Activating extension "secode"...');
    vscode.window.showInformationMessage('Activating extension "secode"...');

    let disposable = vscode.commands.registerCommand('secode.analyzeCode', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const code = document.getText();
            console.log('Sending code for analysis:', code);

            try {
                const response = await axios.post('https://secode-backend.onrender.com/analyze', { code });
                const suggestions = response.data.suggestions;
                vscode.window.showInformationMessage(`Security Analysis: ${suggestions}`);
            } catch (error: any) {
                // Handle 'error' as an AxiosError or any other known type
                if (axios.isAxiosError(error)) {
                    vscode.window.showErrorMessage(`Axios error: ${error.message}`);
                    console.error(`Axios error: ${error.message}`);
                } else {
                    vscode.window.showErrorMessage(`Unexpected error: ${String(error)}`);
                    console.error(`Unexpected error: ${String(error)}`);
                }
            }
        } else {
            vscode.window.showErrorMessage('No active editor found.');
        }
    });

    context.subscriptions.push(disposable);
    console.log('Extension "secode" is now active and command registered!');
    vscode.window.showInformationMessage('Extension "secode" is now active and command registered!');
}

export function deactivate() {
    console.log('Extension "secode" is now deactivated.');
}
