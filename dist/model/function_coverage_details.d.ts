/** Parsed details of whether a function was ran. */
export interface FunctionCoverageDetails {
    /** The name of the function. */
    name?: string;
    /** The line number where this function is declared. */
    line: number;
    /** How many times the function was hit. */
    hit?: number;
    /** Whether this function was found as a function that should be tested. */
    found: boolean;
}
