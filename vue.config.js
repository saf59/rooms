const whitelister = require('purgecss-whitelister');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const { resolve } = require('path');
module.exports = {
    devServer: {
        port: 3000,
        https: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    configureWebpack: {
        plugins: [
            // Remove unused CSS using PurgeCSS. See https://github.com/FullHuman/purgecss
            // for more information about PurgeCSS.
            new PurgecssPlugin({
                keyframes: false, // https://goo.gl/bACbDW
                styleExtensions: ['.css'],
                paths: glob.sync([
                    resolve(resolve(), 'src/**/*.js'),
                    resolve(resolve(), 'src/index.ejs')
                ]),

                // `whiltelist` needed to ensure Typer classes stay in the bundle.
                whitelist: whitelister('./node_modules/typer-js/typer.css'), // There's the magic!
                extractors: [
                    {
                        // https://goo.gl/hr6mdb
                        extractor: class AvoidBacktickIssue {
                            static extract(content) {
                                return content.match(/[A-Za-z0-9_-]+/g) || [];
                            }
                        },
                        extensions: ['js'] // file extensions
                    }
                ]
            })
        ]
    },
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