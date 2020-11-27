import { CoverageDetails } from './model';
/**
 * Parses an `lcov.info` file and generates details in a `CoverageDetails` object.
 * @param lcovPath  The path to the `lcov.info` file.
 * @param excludedFiles And optional list of files to exclude from coverage results.
 *  These files will still be parsed, but they will have the property `excluded` be true.
 *  Also supports `globs` to describe file patterns. ie `**.g.dart`.
 */
export declare function parseLcov(lcovPath: string, excludedFiles?: string[]): CoverageDetails;
