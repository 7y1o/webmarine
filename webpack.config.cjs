const {resolve} = require('path');
const chalk = require('chalk');
const {ProgressPlugin} = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

// Progress function
const ph = (per, mes, ...args) => {

    let processReady = Math.round(40 * per);
    let processLine = '█'.repeat(processReady) + '░'.repeat(40 - processReady);

    console.clear();

    console.log();
    console.log(' ╭' + '─'.repeat(42) + '╮');
    console.log(' │ ' + (processReady < 10 ? chalk.red(processLine) : processReady < 30 ? chalk.yellow(processLine) : chalk.green(processLine)) + ` │ ${chalk.bgBlack(chalk.whiteBright(`${Math.round(per * 100)}%`))}`);
    console.log(' ╰' + '─'.repeat(42) + `╯ ${chalk.bgBlack(chalk.whiteBright(mes))}`);
    console.log();
}

// Config data
module.exports = {
    mode: 'development',
    entry: './lib/index.js',
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'webmarine.js',
        library: {
            type: 'module'
        },
        module: true,
        iife: true
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: resolve(__dirname, './src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-7-esnext', '@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        modules: ['node_modules', resolve(__dirname, 'src')],
        extensions: ['.js']
    },
    devtool: 'source-map',
    target: 'web',
    plugins: [
        new ProgressPlugin(ph)
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()]
    }
};