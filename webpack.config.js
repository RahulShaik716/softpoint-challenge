const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "flags/",
            },
          },
        ],
      },
      // ... other rules
    ],
  },
  resolve: {
    // ... other resolve configurations
    alias: {
      flags: path.resolve(__dirname, "public/flags"),
    },
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: true,
      reportFilename: "bundle-report.html",
    }),
  ],
};
