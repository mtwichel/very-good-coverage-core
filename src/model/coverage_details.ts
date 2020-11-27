import { FileCoverageDetails } from '.';

/**
 * Parsed details from an lcov file, including
 *  total lines, branches, and functions found, as well as details for each file.
 */
export interface CoverageDetails {
  /** The list of files found in the `lcov.info`. */
  files: FileCoverageDetails[];

  /** The total lines hit across all non-excluded files. */
  linesHit: number;

  /** The total lines found across all non-excluded files. */
  linesFound: number;

  /** The total functions hit across all non-excluded files. */
  functionsHit: number;

  /** The total functions found across all non-excluded files. */
  functionsFound: number;

  /** The total branches hit across all non-excluded files. */
  branchesHit: number;

  /** The total branches found across all non-excluded files. */
  branchesFound: number;

  /** The total lines hit across all files, including excluded files. */
  totalLinesHit: number;

  /** The total lines found across all files, including excluded files. */
  totalLinesFound: number;

  /** The total functions hit across all files, including excluded files. */
  totalFunctionsHit: number;

  /** The total functions found across all files, including excluded files. */
  totalFunctionsFound: number;

  /** The total branches hit across all files, including excluded files. */
  totalBranchesHit: number;

  /** The total branches found across all files, including excluded files. */
  totalBranchesFound: number;
}
