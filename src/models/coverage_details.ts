import * as fs from 'fs';
import parseLCOV, { LinesDetails } from 'parse-lcov';

export class CoverageDetails {
  constructor(lcovPath: string) {
    const records = parseLCOV(lcovPath);
    this.files = records.map(
      (record) =>
        new FileCoverageDetails({
          path: record.file,
          linesHit: record.lines.hit,
          linesFound: record.lines.found,
          branchesHit: record.branches.hit,
          branchesFound: record.branches.found,
          functionsHit: record.functions.hit,
          functionsFound: record.functions.found,
          lineRecords: record.lines.details
        })
    );
  }

  /** The list of files found in the `lcov.info`. */
  files: FileCoverageDetails[];

  /** The total lines hit across all files. */
  get linesHit(): number {
    return this.files
      .map((file) => file.linesHit)
      .reduce((acc, curr) => acc + curr, 0);
  }

  /** The total lines found across all files. */
  get linesFound(): number {
    return this.files
      .map((file) => file.linesFound)
      .reduce((acc, curr) => acc + curr, 0);
  }
  /** The total functions hit across all files. */
  get functionsHit(): number {
    return this.files
      .map((file) => file.functionsHit)
      .reduce((acc, curr) => acc + curr, 0);
  }
  /** The total functions found across all files. */
  get functionsFound(): number {
    return this.files
      .map((file) => file.functionsFound)
      .reduce((acc, curr) => acc + curr, 0);
  }
  /** The total branches hit across all files. */
  get branchesHit(): number {
    return this.files
      .map((file) => file.branchesHit)
      .reduce((acc, curr) => acc + curr, 0);
  }
  /** The total branches found across all files. */
  get branchesFound(): number {
    return this.files
      .map((file) => file.branchesFound)
      .reduce((acc, curr) => acc + curr, 0);
  }
}

export class FileCoverageDetails {
  constructor(params: {
    path: string;
    linesHit: number;
    linesFound: number;
    branchesHit: number;
    branchesFound: number;
    functionsHit: number;
    functionsFound: number;
    lineRecords: LinesDetails[];
  }) {
    this.path = params.path;
    this.linesHit = params.linesHit;
    this.linesFound = params.linesFound;
    this.functionsHit = params.functionsHit;
    this.functionsFound = params.functionsFound;
    this.branchesHit = params.branchesHit;
    this.branchesFound = params.branchesFound;

    const fileContents = fs.readFileSync(params.path, 'utf-8');
    this.lines = fileContents.split('\n').map((line, index) => {
      const lineDetails = params.lineRecords.find(
        (lineRecord) => lineRecord.line === index
      );
      if (!lineDetails) {
        throw Error(`Cannot find line record for line ${index}`);
      }
      const lineCoverageDetail: LineCoverageDetails = {
        hit: lineDetails.hit,
        lineNumber: lineDetails.line,
        lineContent: line
      };
      return lineCoverageDetail;
    });
  }

  path: string;
  lines: LineCoverageDetails[];
  linesHit: number;
  linesFound: number;
  branchesHit: number;
  branchesFound: number;
  functionsHit: number;
  functionsFound: number;
}

export interface LineCoverageDetails {
  lineNumber: number;
  lineContent: string;
  hit: number;
}

export interface FunctionCoverageDetails {
  name: string;
  line: number;
  hit?: number;
}

export interface BrancheCoverageDetails {
  line: number;
  block: number;
  branch: number;
  taken: number;
}
