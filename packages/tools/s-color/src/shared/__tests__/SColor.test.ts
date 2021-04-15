import __SColor from '../SColor';

describe('sugar.js.color.color', () => {
  it('Should return rgba(255,0,255,1) string when using the toString method', () => {
    const color = new __SColor('#ff00ff');
    expect(color.toString()).toBe('#ff00ff');
  });
});
