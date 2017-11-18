'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');


const extractCSS = new ExtractTextPlugin(
    addHash('[name].css', '[contenthash]'), {
        allChunks: true
    }
);


function addHash(template, hash) {
    return template + '?hash=' + hash;
}

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: __dirname + '/dist/static/',
        publicPath: 'static/',
        filename: addHash('[name].js', '[chunkhash]')
    },
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'source-map',

    context: __dirname,
    postcss:  function () {
        return [autoprefixer];
    },
    plugins: [
        extractCSS,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _: 'underscore'
        })
    ],
    module: {
        loaders: [
            {
                test: __dirname,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: [ 'es2015' ]

                }
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract(
                    'style',
                    'css?importLoaders=1' +
                    '!postcss'
                )
            },
            {
                test: /\.scss$/,
                loader: extractCSS.extract(
                    'style',
                    'css?importLoaders=2' +
                    '!postcss' +
                    '!sass'
                )
            },
        ]
    }
};