const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "source-map",
	cache: {
		type: "filesystem",
		buildDependencies: {
			config: [__filename],
		},
	},
	output: {
		clean: {
			keep: "assets/img/",
		},
	},
	devServer: {
		open: true,
		watchFiles: ["src/**/*.ejs"],
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass|css)$/,
				include: [
					path.resolve(__dirname, "src"),
					path.resolve(__dirname, "node_modules/destyle.css"),
					path.resolve(__dirname, "node_modules/swiper"),
				],
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
											autoprefixer: { grid: true },
										},
									],
								],
							},
						},
					},
					{
						loader: "sass-loader",
					},
				],
			},
		],
	},
});
