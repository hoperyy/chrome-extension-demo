/*
 * @bio.config.js
 */

module.exports = ({ userDir, srcDir, distDir, taskName, webpack, webpackDevServer }) => {
    return {
        distDir: './dist', // dist dir; default is './dist'

        // port: 9000, // debug port; default is 9000

        // webpack config to be merged; webpack config style required
        webpackConfig: {
            
        },
    };
};
