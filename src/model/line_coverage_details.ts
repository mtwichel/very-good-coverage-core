/** Parsed details of a line from a source file . */
export interface LineCoverageDetails {
  /** The line number of the file. */
  lineNumber: number;
  /** The content of the file. */
  lineContent: string;
  /** Whether this line was found as a line that should be tested. */
  found: boolean;
  /** How many times this line was ran. */
  hit?: number;
}
