import * as fs from 'fs';
import { CoverageDetails } from '../';
import { registerHelper } from 'handlebars';

export function generateReport(detail: CoverageDetails): ReportStrings {
  const roundToTwoDecimals = (num: number) =>
    Math.round((num + Number.EPSILON) * 10000) / 100;

  registerHelper('coverage', function (hits: number, found: number) {
    if (found === 0) {
      // assume 0 found means 100% coverage
      return '100.00%';
    }
    return `${roundToTwoDecimals(hits / found)}%`;
  });

  registerHelper('coverageColor', function (hits: number, found: number) {
    if (found === 0) {
      // assume 0 found means 100% coverage
      return 'green';
    }
    if (hits / found <= 0.75) {
      return 'red';
    } else if (hits / found > 0.75 && hits / found < 1) {
      return 'yellow';
    } else if (hits / found === 1) {
      return 'green';
    } else {
      throw new Error('Invalid hits vs found ratio.');
    }
  });

  registerHelper('prettyDate', function (date) {
    return date.toLocaleString();
  });

  const mainTemplateString = fs.readFileSync(
    './templates/main_report_template.handlebars',
    'utf-8'
  );
  const fileTemplateString = fs.readFileSync(
    './templates/file_report_template.handlebars',
    'utf-8'
  );

  const mainTemplate = Handlebars.compile(mainTemplateString);
  const fileTemplate = Handlebars.compile(fileTemplateString);

  const mainPage = mainTemplate(detail);
  const filesPages: { [path: string]: string } = {};
  for (const file of detail.files) {
    filesPages[file.path] = fileTemplate(file);
  }

  return {
    mainPage,
    filesPages
  };
}

export interface ReportStrings {
  mainPage: string;
  filesPages: { [path: string]: string };
}
