import __px2rem from '../px2rem';

describe('sugar.js.unit.px2rem', () => {

  it('Should convert the passed px value to rem correctly', () => {
    expect(__px2rem(32)).toBe(2);
  });

});