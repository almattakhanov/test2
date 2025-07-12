const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.20.28',
                port: '9000',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.20.36',
                port: '9000',
                pathname: '/**',
            },
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    // typescript: {
    //     ignoreBuildErrors: true,
    // },
};

module.exports = nextConfig;
