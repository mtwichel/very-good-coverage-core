import * as fse from 'fs-extra';
import * as path from 'path';
import { compile, registerHelper } from 'handlebars';
import { CoverageDetails } from './model';

/**
 *
 * @param detail A `CoverageDetails` object returned from the `parseLcov` method. These are the values that will be filled into the reports.
 * @param outputPath The path to where you would like the files written to.
 * @param mediumThreshold The percentage (0-1) of when cells should move from red to yellow. Defaults to 0.75.
 * @param highThreshold The percentage (0-1) of when cells should move from yellow to green. Defaults to 1.0.
 */
export function generateReport(
  detail: CoverageDetails,
  outputPath: string,
  mediumThreshold = 0.75,
  highThreshold = 1
): void {
  if (mediumThreshold < 0 || mediumThreshold > 1) {
    throw new Error(
      `mediumThreshold should be between 0 and 1, but was ${mediumThreshold}`
    );
  }
  if (highThreshold < 0 || highThreshold > 1) {
    throw new Error(
      `highThreshold should be between 0 and 1, but was ${highThreshold}`
    );
  }
  if (mediumThreshold >= highThreshold) {
    throw new Error(
      `mediumThreshold should be strictly less than highThreshold.`
    );
  }
  const roundToTwoDecimals = (num: number) =>
    Math.round((num + Number.EPSILON) * 10000) / 100;

  registerHelper('roundToTwoDecimals', function (num: number) {
    return `${roundToTwoDecimals(num)}`;
  });

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
    if (hits / found <= mediumThreshold) {
      return 'red';
    } else if (hits / found > mediumThreshold && hits / found < highThreshold) {
      return 'yellow';
    } else {
      return 'green';
    }
  });

  registerHelper('prettyDate', function (date: Date) {
    return date.toLocaleString();
  });

  const mainTemplateString = fse.readFileSync(
    path.join(__dirname, '../templates/main_report_template.handlebars'),
    'utf-8'
  );
  const fileTemplateString = fse.readFileSync(
    path.join(__dirname, '../templates/file_report_template.handlebars'),
    'utf-8'
  );

  const mainTemplate = compile(mainTemplateString);
  const fileTemplate = compile(fileTemplateString);

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
