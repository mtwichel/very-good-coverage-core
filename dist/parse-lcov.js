"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLcov = void 0;
const fse = require("fs-extra");
const parse_lcov_1 = require("parse-lcov");
/** Parses an `lcov.info` file and generates details in a `CoverageDetails` object. */
function parseLcov(lcovPath) {
    const lcovString = fse.readFileSync(lcovPath, 'utf-8');
    const records = parse_lcov_1.default(lcovString);
    const files = records.map((record) => {
        const fileContents = fse.readFileSync(record.file, 'utf-8');
        const lines = fileContents.split('\n').map((line, index) => {
            const lineDetails = record.lines.details.find((lineRecord) => lineRecord.line === index + 1);
            if (!lineDetails) {
                const lineCoverageDetail = {
                    found: false,
                    lineNumber: index,
                    lineContent: line
                };
                return lineCoverageDetail;
            }
            else {
                const lineCoverageDetail = {
                    hit: lineDetails.hit,
                    lineNumber: lineDetails.line,
                    lineContent: line,
                    found: true
                };
                return lineCoverageDetail;
            }
        });
        const fileCoverageDetails = {
            path: record.file,
            lines: lines,
            linesHit: record.lines.hit,
            linesFound: record.lines.found,
            branchesHit: record.branches.hit,
            branchesFound: record.branches.found,
            functionsHit: record.functions.hit,
            functionsFound: record.functions.found
        };
        return fileCoverageDetails;
    });
    const linesHit = files
        .map((file) => file.linesHit)
        .reduce((acc, curr) => acc + curr, 0);
    const linesFound = files
        .map((file) => file.linesFound)
        .reduce((acc, curr) => acc + curr, 0);
    const functionsHit = files
        .map((file) => file.functionsHit)
        .reduce((acc, curr) => acc + curr, 0);
    const functionsFound = files
        .map((file) => file.functionsFound)
        .reduce((acc, curr) => acc + curr, 0);
    const branchesHit = files
        .map((file) => file.branchesHit)
        .reduce((acc, curr) => acc + curr, 0);
    const branchesFound = files
        .map((file) => file.branchesFound)
        .reduce((acc, curr) => acc + curr, 0);
    return {
        files,
        linesHit,
        linesFound,
        branchesHit,
        branchesFound,
        functionsHit,
        functionsFound
    };
}
exports.parseLcov = parseLcov;
//# sourceMappingURL=parse-lcov.js.map