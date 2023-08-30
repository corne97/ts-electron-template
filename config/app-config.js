
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("./paths");
const createDefines = require("./create-defines");
const { isDev } = require("./env");

module.exports = {
	entry: paths.src.appEntry,
	mode: isDev ? "development" : "production",
	devtool: isDev ? "inline-source-map" : undefined,
	target: "electron-renderer",
	output: {
		filename: "js/[name].bundle.js",
		chunkFilename: "js/[id].chunk.js",
		path: paths.dist.webApp,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
		plugins: [
			new TsconfigPathsPlugin()
		]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
		]
	},
	plugins: [
		createDefines("app"),
		new MiniCssExtractPlugin({
			filename: "css/[name].bundle.css"
		}),
		new CopyPlugin({
			patterns: [
				{ from: paths.public, to: paths.dist.editor },
			],
		}),
	],
	experiments: {
		topLevelAwait: true
	}
};
