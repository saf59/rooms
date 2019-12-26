/*
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
*/
var path = require('path');
module.exports = {
    devServer: {
        port: 3000,
        https: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
/*
    configureWebpack: {
        plugins: [
            // Remove unused CSS using PurgeCSS. See https://github.com/FullHuman/purgecss
            // for more information about PurgeCSS.
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(__dirname, './../src/index.html'),
                    path.join(__dirname, './../!**!/!*.vue'),
                    path.join(__dirname, './src/!*.vue'),
                    path.join(__dirname, './../src/!**!/!*.js')
                ])
            })
        ]
    },
*/
    chainWebpack: config => {
        config.plugin('copy').tap(args => {
            args[0].push({ // to add rule
                from: 'src/manifest.xml',
                transform: (content, path) => {
                    const find = 'localhost:3000';
                    const replacement = 'rooms-258209.appspot.com';
                    return Promise.resolve(content.toString().split(find).join(replacement));
                }
            });
            return args;
        })
    }
};