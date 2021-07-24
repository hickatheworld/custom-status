
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	const editInput = vscode.window.createInputBox();
	editInput.title = 'Your Custom Status';
	editInput.placeholder = 'Pasta with eggs';
	let status: string;
	let displayed = false;
	editInput.onDidAccept(() => {
		status = editInput.value;
		displayed = true;
		vscode.window.setStatusBarMessage(status);
		vscode.window.showInformationMessage('Successfully set your custom status.');
		editInput.hide();
	});

	const editFunction = vscode.commands.registerCommand('custom-status.edit', () => {
		editInput.show();
	});

	const switchFunction = vscode.commands.registerCommand('custom-status.switch', () => {
		vscode.window.setStatusBarMessage(displayed ? '' : status);
		displayed = !displayed;
	});

	context.subscriptions.push(editFunction);
	context.subscriptions.push(switchFunction);
}