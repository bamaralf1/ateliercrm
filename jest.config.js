module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: ['js/atelier-crm.js'],
  moduleNameMapper: {
    '^pinia$': '<rootDir>/__mocks__/pinia.js',
  },
};