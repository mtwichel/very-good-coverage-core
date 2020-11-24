import { FileCoverageDetails } from '.';

/**
 * Parsed details from an lcov file, including
 *  total lines, branches, and functions found, as well as details for each file.
 */
export interface CoverageDetails {
  /** The list of files found in the `lcov.info`. */
  files: FileCoverageDetails[];

  /** The total lines hit across all files. */
  linesHit: number;

  /** The total lines found across all files. */
  linesFound: number;

  /** The total functions hit across all files. */
  functionsHit: number;

  /** The total functions found across all files. */
  functionsFound: number;

  /** The total branches hit across all files. */
  branchesHit: number;

  /** The total branches found across all files. */
  branchesFound: number;
}
