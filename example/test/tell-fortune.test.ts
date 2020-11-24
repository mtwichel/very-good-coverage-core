import { assert } from 'chai';
import { tellFortune } from '../src/tell-fortune';

describe('tellFortune', function () {
  it('should return correct omen when input is less than 0', function () {
    assert.equal(
      tellFortune(-1),
      'This omen is very bad. Expect misfouturne to follow this week.'
    );
  });
  it('should return correct omen when input is less than 1000 but greater than 20', function () {
    assert.equal(
      tellFortune(40),
      'Your day will be like any other day, no better, nor worse.'
    );
  });
});
