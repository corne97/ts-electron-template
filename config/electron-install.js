const fs = require("fs");
const paths = require("./paths");

const remove = (path, file = true) => fs.existsSync(path) && (file ? fs.unlinkSync(path) : fs.rmdirSync(path));
const mkdir = (path) => !fs.existsSync(path) && fs.mkdirSync(path);
const writePackage = ({ devDependencies, ...pkg }) => fs.writeFileSync(paths.dist.package, JSON.stringify(pkg));
const copy = (from, to) => fs.cpSync(from, to, { force: true, recursive: true, preserveTimestamps: true });

module.exports = async () =>
{
	if (!fs.existsSync(String(paths.dist)))
	{
		const pkg = require("../package.json");
		copy(paths.resolve("node_modules/electron/dist"), String(paths.dist));
		remove(paths.dist.asar);
		mkdir(paths.dist.app);
		writePackage(pkg);
	}
};
