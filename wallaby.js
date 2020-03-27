module.exports = function wallabyConfig(wallaby) {
  return {
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        /* TypeScript compiler specific options
         * https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
         * (no need to duplicate tsconfig.json, if you have it, it will be automatically used) */
        useStandardDefaults: true,
      }),
    },

    debug: true,

    env: {
      type: 'node',
    },

    files: [
      {
        ignore: false,
        instrument: false,
        load: false,
        pattern: 'tsconfig.json',
      },
      {
        ignore: false,
        instrument: false,
        load: false,
        pattern: 'jest.config.js',
      },
      {
        ignore: false,
        instrument: true,
        load: true,
        pattern: 'src/**/*.ts',
      },
      {
        ignore: true,
        instrument: false,
        load: false,
        pattern: 'lib/**/*.js',
      },
      {
        ignore: true,
        instrument: false,
        load: false,
        pattern: 'src/**/*.spec.ts',
      },
      {
        ignore: true,
        instrument: false,
        load: false,
        pattern: 'src/**/*.test.ts',
      },
    ],


    lowCoverageThreshold: 80,
    reportConsoleErrorAsError: true,
    runMode: 'onsave',
    testFramework: 'jest',
    tests: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
  }
}
