export default {
  rootDir: '.',
  projects: [
    '<rootDir>/apps/job-crawler/jest-e2e.config.js',
    '<rootDir>/apps/web-service/jest-e2e.config.js',
  ],
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/libs/$1',
    '^@apps/(.*)$': '<rootDir>/apps/$1',
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'mjs'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
