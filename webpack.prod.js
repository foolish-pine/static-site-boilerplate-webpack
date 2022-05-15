const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "production",
	output: {
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(scss|sass|css)$/,
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
									["postcss-sort-media-queries"],
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
