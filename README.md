# very-good-coverage-core

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

### generateReport

This takes the coverageDetails object, and an output path, and builds html reports at that path.

```typescript
const coverageDetails = parseLcov('./coverage/lcov.info');
generateReport(coverageDetails, './coverage');
```
