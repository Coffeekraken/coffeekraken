module.exports = (__typeof) => {
  describe('sugar.js.value.typeof', () => {
    it('Should return the correct typeof of the passed values', () => {
      let something;
      expect(__typeof(true)).toEqual('Boolean');
      expect(__typeof(10)).toEqual('Integer');
      expect(__typeof(12.3)).toEqual('Number');
      expect(__typeof(null)).toEqual('Null');
      expect(__typeof(something)).toEqual('Undefined');
      expect(__typeof(['hello'])).toEqual('Array');
      expect(
        __typeof({
          helloWorld: true
        })
      ).toEqual('Object');
    });
    expect(__typeof(function coco() {})).toBe('Function');
    expect(__typeof(new Date())).toBe('Date');
    expect(__typeof(new Map())).toBe('Map');

    expect(__typeof(['hello', 10, 12.5], { of: true })).toEqual(
      'Array<String|Integer|Number>'
    );
    expect(
      __typeof(
        {
          hello: 'world',
          coco: 10,
          plop: true
        },
        { of: true }
      )
    ).toEqual('Object<String|Integer|Boolean>');

    class MyCoolClass {
      constructor() {}
    }

    expect(__typeof(MyCoolClass)).toBe('MyCoolClass');

    expect(__typeof(new MyCoolClass())).toBe('MyCoolClass');
    expect(
      __typeof(new MyCoolClass(), {
        customClass: false
      })
    ).toBe('Object');
  });
};
