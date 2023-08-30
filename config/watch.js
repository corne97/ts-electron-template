const { writeFileSync } = require("fs");
const webpack = require("webpack");
const find = require("find-process");
const { exec, fork } = require("child_process");

const installElectron = require("./electron-install");
const paths = require("./paths");

let isStarting = false;
let isServerStarting = false;

let proc = null;
let serverProc = null;

let watchers = [];

const killApp = () => new Promise(async (res) => 
{
	if (proc)
	{
		console.log("Killing app...");
		const list = await find("name", "electron");
		list.forEach(({ pid, bin }) => 
		{
			if (bin.includes(String(paths.dist)))
			{
				try { process.kill(pid); } catch { }
			}
		});

		proc.on("exit", res);
		try { proc.kill(); } catch { }
		proc = null;
	}
	else
	{
		res();
	}
});

const startApp = async () =>
{
	if (isStarting)
		return;

	isStarting = true;
	await killApp();
	console.log("Starting app...");
	proc = exec(`${paths.resolve("dist/electron.exe")} --remote-debugging-port=9223`, {});
	proc.stdout.pipe(process.stdout);
	proc.stdin.pipe(process.stdin);
	proc.stderr.pipe(process.stderr);
	proc.on("exit", () => { proc = null; });
	isStarting = false;
}

const killServer = () => new Promise(async (res) => 
{
	if (serverProc)
	{
		console.log("Killing server...");
		serverProc.on("exit", res);
		try { serverProc.kill(); } catch { }
		serverProc = null;
	}
	else
	{
		res();
	}
});

const startServer = async () =>
{
	if (isServerStarting)
		return;

	isServerStarting = true;
	await killServer();

	serverProc = fork(paths.resolve("server-dist/main.bundle.js"), { stdio: "pipe", cwd: paths.dist.server });
	serverProc.stdout.pipe(process.stdout);
	serverProc.stdin.pipe(process.stdin);
	serverProc.stderr.pipe(process.stderr);
	serverProc.on("exit", () => { serverProc = null; });
	isServerStarting = false;
}

const watch = async () =>
{
	await installElectron();

	try
	{
		const handler = (cb = () => { }) => (err, stats) => 
		{
			if (err)
				console.error(err);

			if (stats)
				console.log(stats.toString("minimal"));

			cb();
		}

		watchers = [
			webpack(require("./app-config")).watch({}, handler()),
			webpack(require("./electron-config")).watch({}, handler(startApp)),
			webpack(require("./server-config")).watch({}, handler(startServer))
		];
	}
	catch (e)
	{
		console.log(e.message);
		writeFileSync(paths.resolve("watch-error.json"), JSON.stringify(e.message, null, 4), "utf-8");
	}
}



console.clear();

const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout
});

const restart = () => watchers.forEach(w => w.invalidate());

rl.on("line", async (line) => 
{
	switch (line)
	{
		case "r":
		case "restart":
			return restart();
		case "build":
		case "b":
			await restart();
			await killApp();
			await startApp();
			break;

	}
});

if (process.platform === "win32")
{
	rl.on("SIGINT", () => process.emit("SIGINT"));
}

process.on("SIGINT", async () =>
{
	console.log("Waiting for shutdown...");
	await killApp();
	process.exit();
});

watch();
