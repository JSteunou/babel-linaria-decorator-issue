const {getRules} = require('./webpack/rules')

const dirname = __dirname
const options = {
    dirname,
}

module.exports = {
    entry: {
        app: `${__dirname}/src/index.js`,
    },

    module: {
        rules: getRules(options),
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
}
