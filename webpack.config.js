const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: {
		top: "./src/js/pages/top/index.js",
		about: "./src/js/pages/about/index.js",
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "./assets/js/[name]-[contenthash].bundle.js",
		clean: true,
	},
	devServer: {
		open: true,
		watchFiles: ["src/**/*.ejs"],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
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
			{
				test: /\.(gif|png|jpe?g|svg|ico)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/img/[name]-[contenthash][ext]",
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
			filename: "./assets/css/[name].css",
		}),
	],
};
