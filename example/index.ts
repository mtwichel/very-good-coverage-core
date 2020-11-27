const core = require('../dist/index');
const results = core.parseLcov('./coverage/lcov.info', ['**/*.ts']);

console.log(JSON.stringify(results, undefined, 2));

core.generateReport(results, './coverage', 0.5, 0.95);
