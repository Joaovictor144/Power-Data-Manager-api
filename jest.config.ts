import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
    coverageProvider: 'v8',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/src/',
    }),
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    // testPathIgnorePatterns: [/node_modules/]
};