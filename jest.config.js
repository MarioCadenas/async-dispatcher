module.exports = {
  verbose: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).js?(x)'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  }
};
