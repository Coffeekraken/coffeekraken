/** @type {import('next').NextConfig} */

const AliasPlugin = require('enhanced-resolve/lib/');

const nextConfig = {
    experimental: {
        esmExternals: 'loose',
    },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
    ) => {
        config.resolve.extensions = [
            // '.config.js',
            ...config.resolve.extensions,
        ];

        // config.resolve.modules = [...config.resolve.modules, '/'];

        config.module = {
            ...config.module,
            exprContextCritical: false,
            rules: [
                ...config.module.rules,
                {
                    test: /\.node$/,
                    loader: 'node-loader',
                },
            ],
        };

        // console.log(config);

        // Important: return the modified config
        return config;
    },
};

module.exports = nextConfig;
