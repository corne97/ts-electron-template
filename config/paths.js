const path = require("path");

const root = path.resolve(__dirname, "..");
const resolve = (...parts) => path.resolve(root, ...parts);

module.exports = {
	root,
	resolve,
	dist: resolve("dist"),
	src: Object.assign(resolve("src"), {
		mainEntry: resolve("src", "main","index.ts"),
		appEntry: resolve("src", "app", "index.tsx"),
		serverEntry: resolve("src", "server", "index.ts"),
	}),
	dist: Object.assign(resolve("dist"), {
		server: resolve("server-dist"),
		app: resolve("dist/resources/app"),
		webApp: resolve("dist/resources/app/app"),
		package: resolve("dist/resources/app/package.json"),
		asar: resolve("dist/resources/default_app.asar"),
	}),
	public: resolve("public")
};
