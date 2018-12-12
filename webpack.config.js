const path = require('path'); // Node method to get the path
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.scss' }); 

    return { 
    entry: './src/app.js', 
    output: {
        path: path.join(__dirname, 'public', 'dist'), 
    },
    module: {
        rules: [{
            loader:'babel-loader', 
            test: /\.js$/, 
            exclude: /node_modules/ 
        }, {
            test: /\.s?css$/, 
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }] 
    },
    plugins: [
        CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map', 
    devServer: {
        contentBase: path.join(__dirname, 'public'), 
        publicPath: '/dist/'
    }
};
};