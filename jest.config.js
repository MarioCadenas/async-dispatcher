module.exports = {
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['<rootDir>/**/?(*.)(spec|test).js?(x)'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/config/setupTests.js'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  }
};
