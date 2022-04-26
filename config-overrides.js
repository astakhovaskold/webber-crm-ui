/**
 * Created by ASTAKHOV A.A. on 26.04.2022
 */

const {override, addLessLoader, fixBabelImports, addWebpackAlias, adjustStyleLoaders} = require('customize-cra');
const modifyVars = require('./src/styles/modifyVars');

module.exports = override(
    addWebpackAlias({
        '@': require('path').resolve(__dirname, 'src'),
    }),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        modifyVars,
        javascriptEnabled: true,
    }),
    adjustStyleLoaders(({use: [, , postcss]}) => {
        const postcssOptions = postcss.options;
        postcss.options = {postcssOptions};
    }),
);
