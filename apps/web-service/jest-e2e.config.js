module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../../',
  testEnvironment: 'node',
  testRegex: 'test/apps/web-service/.*.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/apps/web-service/src/$1',
  },
};
