module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testEnvironment: 'node',
  testRegex: 'test/job-crawler.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/apps/job-crawler/src/$1',
    '^@lib/(.*)$': '<rootDir>/libs/$1',
  },
};
