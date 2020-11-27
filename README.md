# very-good-coverage-core

![GitHub package.json version](https://img.shields.io/github/package-json/v/mtwichel/very-good-coverage-core)
![GitHub](https://img.shields.io/github/license/mtwichel/very-good-coverage-core)

A package for analyzing lcov.info files and generating reports from them for use in developer tools. Check out the online [documentation](https://mtwichel.github.io/very-good-coverage-core/) for details.

## Motivation

This package is an attempt to abstract some core functionality from [very-good-coverage](https://github.com/VeryGoodOpenSource/very_good_coverage) to make things like very-good-coverage-cli, a CLI for processing lcov files, possible.

More specifically it adds a typescript interface for defining coverage information, a parsing function to generate that interface, and functionality for generating html reports from `lcov.info` files.

## API

This package exposes two functions you can use in your own project:

### parseLcov

This takes a path to your lcov file, and

1. parses it using [parse-lcov](https://www.npmjs.com/package/parse-lcov)
2. reads the source files
3. combines them into a data structure returned by the function

```typescript
const coverageDetails = parseLcov('./coverage/lcov.info');
```

You can also pass a list of strings in `glob` format to mark files as excluded. They will still be included in the output object, but the files will have `excluded=true`.

```typescript
const coverageDetails = parseLcov('./coverage/lcov.info', [
  '**/*.g.dart',
  'coverage/**'
]);
```

### generateReport

This takes the coverageDetails object, and an output path, and builds html reports at that path.

```typescript
const coverageDetails = parseLcov('./coverage/lcov.info');
generateReport(coverageDetails, './coverage');
```

You can also specify when cells in the report should be yellow or green by specifying the `mediumThreshold` and `highThreshold`.
