/**
 * Created by ASTAKHOV A.A. on 18.04.2022
 */

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const CracoLessPlugin = require('craco-less');
const {whenProd} = require('@craco/craco');

module.exports = {
    reactScriptsVersion: 'react-scripts',
    webpack: {
        plugins: [
            new WebpackBar({profile: true}),
            ...(process.env.NODE_ENV === 'development' ? [new BundleAnalyzerPlugin({openAnalyzer: false})] : []),
        ],
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@btn-border-radius-base': '20px',
                            '@table-border-radius-base': '20px',
                            '@card-radius': '10px',

                            '@line-height-base': '140%',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    style: {
        postcss: {
            plugins: plugins => whenProd(() => [...plugins], []),
        },
    },
};
