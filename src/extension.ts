
import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	const editInput = vscode.window.createInputBox();
	editInput.title = 'Your Custom Status';
	editInput.placeholder = 'Pasta with eggs';
	const status: string = context.globalState.get('status') || '';
	if (status && context.globalState.get('displayed')) {
		vscode.window.setStatusBarMessage(status);
	}

	editInput.onDidAccept(() => {
		context.globalState.update('status', editInput.value);
		context.globalState.update('displayed', true);
		vscode.window.setStatusBarMessage(editInput.value);
		vscode.window.showInformationMessage('Successfully set your custom status.');
		editInput.hide();
	});

	const editFunction = vscode.commands.registerCommand('custom-status.edit', () => {
		editInput.value = context.globalState.get('status') || '';
		editInput.show();
	});

	const switchFunction = vscode.commands.registerCommand('custom-status.switch', () => {
		const displayed: boolean = context.globalState.get('displayed') || false;
		vscode.window.setStatusBarMessage(displayed ? '' : context.globalState.get('status')!);
		context.globalState.update('displayed', !displayed);
	});

	context.subscriptions.push(editFunction);
	context.subscriptions.push(switchFunction);
}