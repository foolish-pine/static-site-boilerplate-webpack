const path = require("path");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		top: "./src/js/pages/top/index.js",
		about: "./src/js/pages/about/index.js",
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "assets/js/[name].bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, "src"),
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				],
			},
			{
				test: /\.ejs$/,
				include: path.resolve(__dirname, "src"),
				use: [
					{
						loader: "html-loader",
					},
					{
						loader: "ejs-plain-loader",
					},
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg|ico)$/i,
				include: path.resolve(__dirname, "src"),
				type: "asset/resource",
				generator: {
					filename: "assets/img/[name][ext]",
				},
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								quality: 65,
								progressive: true,
							},
							pngquant: { quality: [0.65, 0.8], speed: 1 },
							gifsicle: {
								optimizationLevel: 3,
							},
							svgo: {
								plugins: [
									{
										removeViewBox: false,
									},
								],
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	optimization: {
		minimizer: [`...`, new CssMinimizerPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/ejs/index.ejs",
			filename: "index.html",
			chunks: ["top"],
			inject: "body",
		}),
		new HtmlWebpackPlugin({
			template: "./src/ejs/about.ejs",
			filename: "about.html",
			chunks: ["about"],
			inject: "body",
		}),
		new MiniCssExtractPlugin({
			filename: "./assets/css/[name].bundle.css",
		}),
	],
};
