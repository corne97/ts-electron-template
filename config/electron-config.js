const paths = require("./paths");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const createDefines = require("./create-defines");
const { isDev } = require("./env");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: paths.src.mainEntry,
	mode: isDev ? "development" : "production",
	devtool: isDev ? "inline-source-map" : undefined,
	target: "electron-main",
	output: {
		filename: "[name].bundle.js",
		path: paths.dist.app,
	},
	externals: [nodeExternals()],
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
		plugins: [
			new TsconfigPathsPlugin()
		]
	},
	plugins: [
		createDefines("main"),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		]
	},
	experiments: {
		topLevelAwait: true
	}
};
