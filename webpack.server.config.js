const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  // Node.js環境向けにバンドルすることを指定
  target: "node",

  // 開発モードを指定。本番環境では 'production' に変更する
  mode: "development",

  // エントリーポイントとなるファイルを指定
  entry: "./server/index.ts",

  // バンドルの出力設定
  output: {
    // 出力先のディレクトリ
    path: path.resolve(__dirname, "dist"),
    // 出力ファイル名
    filename: "server.js",
  },

  // node_modules内のモジュールをバンドルから除外
  externals: [nodeExternals()],

  // ローダーの設定
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};
