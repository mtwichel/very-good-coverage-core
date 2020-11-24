"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = void 0;
const fse = require("fs-extra");
const path = require("path");
const handlebars_1 = require("handlebars");
function generateReport(detail, outputPath, mediumThreshold = 0.75, highThreshold = 1) {
    const roundToTwoDecimals = (num) => Math.round((num + Number.EPSILON) * 10000) / 100;
    handlebars_1.registerHelper('roundToTwoDecimals', function (num) {
        return `${roundToTwoDecimals(num)}`;
    });
    handlebars_1.registerHelper('coverage', function (hits, found) {
        if (found === 0) {
            // assume 0 found means 100% coverage
            return '100.00%';
        }
        return `${roundToTwoDecimals(hits / found)}%`;
    });
    handlebars_1.registerHelper('coverageColor', function (hits, found) {
        if (found === 0) {
            // assume 0 found means 100% coverage
            return 'green';
        }
        if (hits / found <= mediumThreshold) {
            return 'red';
        }
        else if (hits / found > mediumThreshold && hits / found < highThreshold) {
            return 'yellow';
        }
        else {
            return 'green';
        }
    });
    handlebars_1.registerHelper('prettyDate', function (date) {
        return date.toLocaleString();
    });
    const mainTemplateString = fse.readFileSync(path.join(__dirname, '../../templates/main_report_template.handlebars'), 'utf-8');
    const fileTemplateString = fse.readFileSync(path.join(__dirname, '../../templates/file_report_template.handlebars'), 'utf-8');
    const mainTemplate = handlebars_1.compile(mainTemplateString);
    const fileTemplate = handlebars_1.compile(fileTemplateString);
    const mainPage = mainTemplate({
        ...detail,
        mediumThreshold,
        highThreshold,
        date: new Date()
    });
    fse.writeFileSync(`${outputPath}/index.html`, mainPage);
    for (const file of detail.files) {
        const filePage = fileTemplate({
            ...file,
            mediumThreshold,
            highThreshold,
            date: new Date()
        });
        fse.outputFileSync(`${outputPath}/${file.path}.html`, filePage);
    }
}
exports.generateReport = generateReport;
//# sourceMappingURL=generate-report.js.map