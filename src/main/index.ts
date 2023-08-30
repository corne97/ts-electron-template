import { app, BrowserWindow, ipcMain } from "electron";
import { watch } from "fs";
import path from "path";
import { devices } from "node-hid";

(process.env as any)["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;

let window: BrowserWindow | null = null;

const watchAppChanges = () =>
{
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
}

app.whenReady().then(async () => 
{
	window = new BrowserWindow({
		show: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			allowRunningInsecureContent: false,
			devTools: env.isDev,
			experimentalFeatures: true,
			autoplayPolicy: "no-user-gesture-required",
			sandbox: false
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

	watchAppChanges();
});

ipcMain.handle("get-hid-devices", () => devices());

ipcMain.handle("get-hid-device-info", (_event, id) => {
	return {
		id: id,
		bla: "bla"
	};
});