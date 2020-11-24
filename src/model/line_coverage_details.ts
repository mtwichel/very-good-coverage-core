export interface LineCoverageDetails {
  lineNumber: number;
  lineContent: string;
  found: boolean;
  hit?: number;
}
