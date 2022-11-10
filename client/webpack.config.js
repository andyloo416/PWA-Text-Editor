const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest, GenerateSW } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JAKE",
      }),
      new GenerateSW(),
      new WebpackPwaManifest({
        name: "JUST ANOTEHR TEXT EDITOR",
        short_name: "JATE",
        description: "My awesome JATE!",
        background_color: "#ffffff",
        crossorigin: "use-credentials", //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve("src/assets/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
          {
            src: path.resolve("src/assets/large-icon.png"),
            size: "1024x1024", // you can also use the specifications pattern
          },
          {
            src: path.resolve("src/assets/large-icon.png"),
            size: "1024x1024",
            purpose: "maskable",
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
      ],
    },
  };
};
