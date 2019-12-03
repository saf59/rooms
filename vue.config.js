module.exports = {
    devServer: {
        port: 3000,
        https: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    chainWebpack: config => {
        config.plugin('copy').tap(args => {
            args[0].push({ // to add rule
                    from: 'src/manifest.xml',
                    transform: function(content, path) {
                        var find = 'localhost:3000'
                        var replacement = 'rooms-258209.appspot.com'
                        return Promise.resolve(content.toString().split(find).join(replacement));
                    }
                })
            return args;
        })
    }
};