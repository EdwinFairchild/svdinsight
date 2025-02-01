const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
  // Register the helloWorld command
  let disposable = vscode.commands.registerCommand('svdview.svdviewer', () => {
    // Create and show a new webview panel
    const panel = vscode.window.createWebviewPanel(
      'helloWorld',           // Internal identifier for the webview panel
      'Hello World',          // Title of the panel displayed to the user
      vscode.ViewColumn.One,  // Editor column to show the new webview panel in
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, 'assets')
        ]
      }
    );

    // Set the webview panel's HTML content.
    // In this example, we load an HTML file from the assets folder.
    panel.webview.html = getWebviewContent(context.extensionUri, panel.webview);
	// Listen for messages from the webview.
    panel.webview.onDidReceiveMessage(message => {
		switch (message.command) {
		  case 'fileSelected':
			// For now, simply show an information message.
			vscode.window.showInformationMessage("File selected: " + message.filePath);
			console.log("File selected: ", message.filePath);
			break;
		}
	  });
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(extensionUri, webview) {
  // Construct the path to your HTML file in the assets folder.
  const assetPath = vscode.Uri.joinPath(extensionUri, 'assets', 'webview.html');
  let html = fs.readFileSync(assetPath.fsPath, 'utf8');

  // (Optional) You can replace placeholders if your HTML references local resources.
  // For example, if your HTML contains %SCRIPT_URI%, you might do:
  // const scriptPath = vscode.Uri.joinPath(extensionUri, 'assets', 'script.js');
  // const scriptUri = webview.asWebviewUri(scriptPath);
  // html = html.replace(/%SCRIPT_URI%/g, scriptUri.toString());

  return html;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
