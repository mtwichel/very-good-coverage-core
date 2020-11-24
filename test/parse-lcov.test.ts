import * as path from 'path';
import { assert } from 'chai';
import { parseLcov } from '../src/parse-lcov';

describe('parseLcov', function () {
  it('...', function () {
    const actual = parseLcov(path.join(__dirname, 'coverage/lcov.info'));

    assert.deepEqual(actual, expected);
  });
});

const expected = {
  files: [
    {
      path: 'src/tell-fortune.ts',
      lines: [
        {
          hit: 1,
          lineNumber: 1,
          lineContent: 'export function tellFortune(n: number): string {',
          found: true
        },
        {
          hit: 2,
          lineNumber: 2,
          lineContent: '  if (n <= 0) {',
          found: true
        },
        {
          hit: 1,
          lineNumber: 3,
          lineContent:
            "    return 'This omen is very bad. Expect misfouturne to follow this week.';",
          found: true
        },
        {
          hit: 1,
          lineNumber: 4,
          lineContent: '  } else if (n > 0 && n <= 20) {',
          found: true
        },
        {
          hit: 0,
          lineNumber: 5,
          lineContent:
            "    return 'This means very good fortune for you. True love will find you when the snow falls lightly.';",
          found: true
        },
        {
          hit: 1,
          lineNumber: 6,
          lineContent: '  } else if (n > 20 && n <= 1000) {',
          found: true
        },
        {
          hit: 1,
          lineNumber: 7,
          lineContent:
            "    return 'Your day will be like any other day, no better, nor worse.';",
          found: true
        },
        {
          found: false,
          lineNumber: 7,
          lineContent: '  } else {'
        },
        {
          hit: 0,
          lineNumber: 9,
          lineContent:
            "    return 'Be warry of pyramid schemes today, as they may seem legitimate but are not good ways to start businesses.';",
          found: true
        },
        {
          found: false,
          lineNumber: 9,
          lineContent: '  }'
        },
        {
          found: false,
          lineNumber: 10,
          lineContent: '}'
        },
        {
          found: false,
          lineNumber: 11,
          lineContent: ''
        }
      ],
      linesHit: 6,
      linesFound: 8,
      branchesHit: 8,
      branchesFound: 10,
      functionsHit: 1,
      functionsFound: 1
    }
  ],
  linesHit: 6,
  linesFound: 8,
  branchesHit: 8,
  branchesFound: 10,
  functionsHit: 1,
  functionsFound: 1
};
