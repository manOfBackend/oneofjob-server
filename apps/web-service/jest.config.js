module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testRegex: 'test/web-service/.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['apps/web-service/src/**/*.(t|j)s'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/apps/web-service/src/$1',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
