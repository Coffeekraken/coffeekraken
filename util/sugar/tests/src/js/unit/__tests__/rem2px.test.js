import __rem2px from '../rem2px';

describe('sugar.js.unit.rem2px', () => {

  it('Should convert the passed rem value to px correctly', () => {
    expect(__rem2px(2)).toBe(32);
  });

});