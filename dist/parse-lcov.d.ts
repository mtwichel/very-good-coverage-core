import { CoverageDetails } from './model';
/** Parses an `lcov.info` file and generates details in a `CoverageDetails` object. */
export declare function parseLcov(lcovPath: string): CoverageDetails;
