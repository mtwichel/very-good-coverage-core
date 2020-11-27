import { CoverageDetails } from './model';
/**
 *
 * @param detail A `CoverageDetails` object returned from the `parseLcov` method. These are the values that will be filled into the reports.
 * @param outputPath The path to where you would like the files written to.
 * @param mediumThreshold The percentage (0-1) of when cells should move from red to yellow. Defaults to 0.75.
 * @param highThreshold The percentage (0-1) of when cells should move from yellow to green. Defaults to 1.0.
 */
export declare function generateReport(detail: CoverageDetails, outputPath: string, mediumThreshold?: number, highThreshold?: number): void;
