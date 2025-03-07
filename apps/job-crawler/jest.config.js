module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testRegex: 'test/crawlers/.*\\.spec\\.ts$|test/job-crawler\\.e2e-spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['apps/job-crawler/src/**/*.(t|j)s'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/apps/job-crawler/src/$1',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
