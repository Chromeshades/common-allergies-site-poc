module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^common-allergies-js$': '<rootDir>/src/__mocks__/common-allergies-js.js'
    },
    transform: {
        '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }]
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(common-allergies-js)/)'
    ],
    testPathIgnorePatterns: ['/node_modules/'],
    moduleDirectories: ['node_modules', 'src']
};