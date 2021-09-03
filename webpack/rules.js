const os = require('os')

//

function getBabelConfiguration() {
    return {
        targets: {
            esmodules: true,
        },
        assumptions: {
            setPublicClassFields: true,
        },
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-proposal-decorators', {legacy: true}],
            ['@babel/plugin-proposal-class-properties'],
        ],
        presets: [
            ['@babel/preset-env', {modules: false}],
            '@babel/preset-react',
            '@babel/preset-typescript',
            'linaria/babel',
        ],
    }
}

function getBabelLoaderOptions(options) {
    const babelConfig = {
        ...getBabelConfiguration(options),
        cacheDirectory: os.tmpdir(),
        // https://babeljs.io/docs/en/options#babelrc
        babelrc: false,
        // https://babeljs.io/docs/en/options#configfile
        configFile: false,
    }
    return babelConfig
}

function getRulesLinaria() {
    return {
        test: /\.linaria-cache\/.*\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'postcss-loader'}],
    }
}

function getRulesJs(options) {
    return {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(ky|clipboard-polyfill)\/).*/,
        use: [
            {
                loader: 'babel-loader',
                options: getBabelLoaderOptions(options),
            },
            {
                loader: 'linaria/loader',
                options: {
                    sourceMap: process.env.NODE_ENV !== 'production',
                },
            },
        ],
    }
}

function getRules(options) {
    return [getRulesJs(options), getRulesLinaria(options)]
}

module.exports = {getBabelConfiguration, getRules}
