module.exports = {
    testEnvironment: 'node',
    modulePathIgnorePatterns: [
        '.ts$',
        '<rootDir>/(.*)?.DS_Store',
        '/__WIP__',
        '/__wip__',
        '/__TESTS',
        '/__tests__.wip',
        '/node_modules',
    ],
    globalSetup: './src/node/jest/setup.js',
    // setupFiles: ['./src/node/jest/sugarConfigLoad.js'],
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
    transform: {
        '\\.jsx?$': 'babel-jest',
        // '\\.js$': 'jest-esm-transformer',
    },
};
