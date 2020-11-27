import { FunctionCoverageDetails, LineCoverageDetails } from '.';
/**
 * Parsed details from an indidual file, including
 *  lines, branches, and functions found, as well as details for each line.
 */
export interface FileCoverageDetails {
    /** The path of the file. */
    path: string;
    /** Coverage details for each particular line. */
    lines: LineCoverageDetails[];
    /** Coverage details for each particular function. */
    functions: FunctionCoverageDetails[];
    /** Total lines hit in this file. */
    linesHit: number;
    /** Total lines found in this file. */
    linesFound: number;
    /** Total branches hit in this file. */
    branchesHit: number;
    /** Total branches found in this file. */
    branchesFound: number;
    /** Total functions hit in this file. */
    functionsHit: number;
    /** Total functions found in this file. */
    functionsFound: number;
    /** If true, this file should be excluded from code coverage. */
    excluded: boolean;
}
