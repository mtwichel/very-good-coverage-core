"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLcov = void 0;
const fse = require("fs-extra");
const minimatch = require("minimatch");
const parse_lcov_1 = require("parse-lcov");
/**
 * Parses an `lcov.info` file and generates details in a `CoverageDetails` object.
 * @param lcovPath  The path to the `lcov.info` file.
 * @param excludedFiles And optional list of files to exclude from coverage results.
 *  These files will still be parsed, but they will have the property `excluded` be true.
 *  Also supports `globs` to describe file patterns. ie `**.g.dart`.
 */
function parseLcov(lcovPath, excludedFiles = []) {
    const lcovString = fse.readFileSync(lcovPath, 'utf-8');
    const records = parse_lcov_1.default(lcovString);
    const files = records.map((record) => lcovRecordToFileCoverageDetails(record, excludedFiles));
    const linesHit = files
        .filter((file) => !file.excluded)
        .reduce((acc, file) => acc + file.linesHit, 0);
    const linesFound = files
        .filter((file) => !file.excluded)
        .reduce((acc, file) => acc + file.linesFound, 0);
    const functionsHit = files
        .filter((file) => !file.excluded)
        .reduce((acc, file) => acc + file.functionsHit, 0);
    const functionsFound = files
        .filter((file) => !file.excluded)
        .reduce((acc, file) => acc + file.functionsFound, 0);
    const branchesHit = files
        .filter((file) => !file.excluded)
        .reduce((acc, file) => acc + file.branchesHit, 0);
    const branchesFound = files
        .filter((file) => !file.excluded)
        .reduce((acc, file) => acc + file.branchesFound, 0);
    const totalLinesHit = files.reduce((acc, file) => acc + file.linesHit, 0);
    const totalLinesFound = files.reduce((acc, file) => acc + file.linesFound, 0);
    const totalFunctionsHit = files.reduce((acc, file) => acc + file.functionsHit, 0);
    const totalFunctionsFound = files.reduce((acc, file) => acc + file.functionsFound, 0);
    const totalBranchesHit = files.reduce((acc, file) => acc + file.branchesHit, 0);
    const totalBranchesFound = files.reduce((acc, file) => acc + file.branchesFound, 0);
    return {
        files,
        linesHit,
        linesFound,
        branchesHit,
        branchesFound,
        functionsHit,
        functionsFound,
        totalLinesHit,
        totalLinesFound,
        totalFunctionsHit,
        totalFunctionsFound,
        totalBranchesHit,
        totalBranchesFound
    };
}
exports.parseLcov = parseLcov;
function lcovRecordToFileCoverageDetails(record, excludedFiles) {
    const fileContents = fse.readFileSync(record.file, 'utf-8');
    const fileLines = fileContents.split('\n');
    const lines = fileLines.map((line, index) => getLineDetails(line, index, record));
    const functions = record.functions.details.map((functionDetail) => getFunctionDetails(functionDetail));
    return {
        path: record.file,
        lines: lines,
        functions: functions,
        linesHit: record.lines.hit,
        linesFound: record.lines.found,
        branchesHit: record.branches.hit,
        branchesFound: record.branches.found,
        functionsHit: record.functions.hit,
        functionsFound: record.functions.found,
        excluded: shouldBeExcluded(record.file, excludedFiles)
    };
}
function getLineDetails(line, index, record) {
    const lineDetail = record.lines.details.find((lineRecord) => lineRecord.line === index + 1);
    if (!lineDetail) {
        const lineCoverageDetail = {
            found: false,
            lineNumber: index + 1,
            lineContent: line
        };
        return lineCoverageDetail;
    }
    else {
        const lineCoverageDetail = {
            hit: lineDetail.hit,
            lineNumber: lineDetail.line,
            lineContent: line,
            found: true
        };
        return lineCoverageDetail;
    }
}
function getFunctionDetails(functionDetails) {
    return {
        line: functionDetails.line,
        name: functionDetails.name,
        found: true,
        hit: functionDetails.hit
    };
}
function shouldBeExcluded(fileName, excludedFiles) {
    return excludedFiles.some((testFile) => minimatch(fileName, testFile));
}
//# sourceMappingURL=parse-lcov.js.map