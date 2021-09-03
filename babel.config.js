const {getBabelConfiguration} = require('./webpack/rules')

function isJestCaller(caller) {
    return caller && caller.name === 'babel-jest'
}

function isEslintCaller(caller) {
    return caller && caller.name === '@babel/eslint-parser'
}

function isLinariaCaller(caller) {
    return caller && caller.name === 'linaria'
}

function unknownCaller(caller) {
    console.warn('unknown caller', caller && caller.name)
    return false
}

module.exports = api => {
    const babelConfiguration = getBabelConfiguration()

    //
    // Jest requires transform of dynamic import
    // and a module resolver
    if (api.caller(isJestCaller)) {
        return {
            targets: {
                esmodules: true,
            },
            assumptions: {
                setPublicClassFields: true,
            },
            plugins: [
                'babel-plugin-transform-dynamic-import',
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                '@babel/plugin-proposal-class-properties',
                [
                    'babel-plugin-module-resolver',
                    {
                        root: [__dirname],
                        alias: getAlias({dirname: '.'}),
                    },
                ],
            ],
            presets: [
                ['@babel/preset-env', {modules: 'auto'}],
                '@babel/preset-react',
                '@babel/preset-typescript',
                'linaria/babel',
            ],
        }
    }

    //
    // ESLint requires not much so bare minimum
    if (api.caller(isEslintCaller)) {
        return {
            assumptions: {
                setPublicClassFields: true,
            },
            plugins: [
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                '@babel/plugin-proposal-class-properties',
            ],
            presets: ['@babel/preset-env', '@babel/preset-react'],
        }
    }

    //
    // Linaria
    if (api.caller(isLinariaCaller)) {
        return {
            assumptions: {
                setPublicClassFields: true,
            },
            plugins: [
                ['@babel/plugin-proposal-decorators', {legacy: true}],
                '@babel/plugin-proposal-class-properties',
            ],
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        }
    }

    api.caller(unknownCaller)
    // Jest snapshot?
    return babelConfiguration
}
