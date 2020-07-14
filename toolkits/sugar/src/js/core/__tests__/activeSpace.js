module.exports = (__activeSpace) => {
  describe('sugar.js.core.activeSpace', () => {
    it('Should set the active space correctly', () => {
      __activeSpace.set('something.cool');
      expect(__activeSpace.get()).toBe('something.cool');
    });
    it('Should set the active space then check some passed active spaces correctly', () => {
      __activeSpace.set('something.cool.hello.world');
      expect(__activeSpace.is('something')).toBe(false);
      expect(__activeSpace.is('something.*')).toBe(true);
      expect(__activeSpace.is('*.cool.**')).toBe(true);
    });
  });
};
