const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const projectName = process
    .cwd()
    .split(path.sep)
    .slice(-1)[0];

module.exports = {
    devServer: {
        disableHostCheck: true,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        before: require('./mock/index.js')
    },
    outputDir: NODE_ENV == 'production' ? `dist/${projectName}` : 'dist',
    lintOnSave: false,
    runtimeCompiler: true,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    /**
     * Multiple Single-Pages-Apps
     */
    pages: {
        home: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            files: {
                css: ['styles/global.css']
            },
            chunks: ['vue-libs', 'chunk-libs', 'home']
        }
    },
    chainWebpack: config => {
        // config.module
        //     .rule('css')
        //     .test(/\.css$/)
        //     .oneOf('vue')
        //     .resourceQuery(/\?vue/)
        //     .use('px2rem')
        //     .loader('px2rem-loader')
        //     .options({
        //         remUnit: 37.5
        //     })
        config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                },
                vue: {
                    name: 'vue-libs',
                    test({ context }) {
                        const vueArr = [
                            'vue',
                            'vue-router',
                            'vuex',
                            'vue-i18n',
                            'axios'
                        ].map(item =>
                            path.join(process.cwd(), `node_modules/${item}`)
                        );
                        return vueArr.some(item => context.startsWith(item));
                    },
                    priority: 20,
                    chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                    name: 'chunk-commons',
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    test: path.join(__dirname, 'src/components'),
                    reuseExistingChunk: true
                },
                asyncCommon: {
                    chunks: 'async',
                    name: 'async-commons',
                    minChunks: 1, //  minimum common number
                    priority: 10,
                    test: path.join(__dirname, 'src/components'),
                    reuseExistingChunk: true
                }
            }
        });
        // config.optimization.runtimeChunk('single');
        config.plugin('define').tap(definitions => {
            Object.assign(definitions[0]['process.env'], {
                VUE_APP_BUILD_TIME: '"' + new Date().toISOString() + '"'
            });
            console.log(definitions, 'definitions');
            return definitions;
        });
    },
    css: {
        loaderOptions: {
            css: {
                importLoaders: true
            },
            sass: {
                // prependData: '@import "~src/assets/style/util.scss";'
            },
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 37.5, // 换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了。
                        unitPrecision: 2
                    })
                ]
            }
        }
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/styles/*.css',
                        to: 'styles',
                        flatten: true
                    }
                ]
            })
        ],
        resolve: {
            extensions: ['.scss'],
            alias: {
                styles: path.resolve(__dirname, 'src/styles'),
                src: path.resolve(__dirname, 'src'),
                util: path.resolve(__dirname, 'src/util'),
                route: path.resolve(__dirname, 'src/router'),
                component: path.resolve(__dirname, 'src/components'),
                store: path.resolve(__dirname, 'src/store')
            }
        }
    }
};
