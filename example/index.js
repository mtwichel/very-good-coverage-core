const package = require('../../dist/src/index');
const results = package.parseLcov('./coverage/lcov.info');

console.log(JSON.stringify(results, undefined, 2));

package.generateReport(results, './coverage', 0.5, 0.95);