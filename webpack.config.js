const path = require('path');
module.exports = {
    mode: 'development',
    entry: { main: './wwwroot/js/app.tsx' },
    output: {
        path: path.resolve(__dirname, './wwwroot/js/dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx']
    },
    module: {
        rules: [
            //{
            //    test: /\.ts|\.tsx$/,
            //    use: [
            //        {
            //            loader: 'babel-loader',
            //            options: {
            //                "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
            //            }
            //        }
            //    ]
            //},
            //{
            //    test: /\.css$/,
            //    use: ['css-loader'],
            //},
            {
               test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
               loader: 'file-loader'
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.s?css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "sass-loader" }
                ]
            }
        ]
    }
};