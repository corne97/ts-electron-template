import { app, BrowserWindow } from "electron";
import { watch } from "fs";
import path from "path";

(process.env as any)["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;

let window: BrowserWindow | null = null;

app.whenReady().then(async () => 
{
	window = new BrowserWindow({
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			backgroundThrottling: true,
			allowRunningInsecureContent: true,
			devTools: true,
			experimentalFeatures: true,
		}
	});

	window.setMenu(null);

	window.loadFile(path.resolve(__dirname, "app/index.html"));

	window.once("ready-to-show", () => 
	{
		window?.maximize();
		window?.show();
		window?.webContents.openDevTools();
	});

	if (env.isDev)
	{
		let reloadTimeout: null | NodeJS.Timeout = null

		watch(path.resolve(__dirname, "app"), { recursive: true }, () => 
		{
			if (reloadTimeout)
				clearTimeout(reloadTimeout);

			reloadTimeout = setTimeout(() =>
			{
				console.log("Reloading webContents\n");
				window?.webContents.reload();
				reloadTimeout = null;
			}, 15);
		});
	}
});
