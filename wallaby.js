module.exports = function (wallaby) {
  return {
    files: [
      {
        pattern: 'tsconfig.json',
        ignore: false,
        instrument: false,
        load: false,
      },
      {
        pattern: 'jest.config.js',
        ignore: false,
        instrument: false,
        load: false,
      },
      { pattern: 'src/**/*.ts', instrument: true, load: true, ignore: false },
      { pattern: 'lib/**/*.js', ignore: true, instrument: false, load: false },
      {
        pattern: 'src/**/*.spec.ts',
        ignore: true,
        instrument: false,
        load: false,
      },
      {
        pattern: 'src/**/*.test.ts',
        ignore: true,
        instrument: false,
        load: false,
      },
    ],

    tests: ['src/**/*.spec.ts', 'src/**/*.test.ts'],

    env: {
      type: 'node',
    },

    testFramework: 'jest',
    debug: true,
    reportConsoleErrorAsError: true,
    lowCoverageThreshold: 80,

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        /* TypeScript compiler specific options
         * https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
         * (no need to duplicate tsconfig.json, if you have it, it will be automatically used) */
        useStandardDefaults: true,
      }),
    },
  }
}
