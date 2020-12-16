import __getArgsNames from '../getArgsNames';

module.exports = (__checkArgs) => {
  function checkArgs(param1, param2, param3 = 'hello', param4) {
    __checkArgs(checkArgs, arguments, {
      param1: 'String -v hello,world',
      param2: 'Array,Number',
      param3: 'String',
      param4: '-u'
    });
  }

  describe('sugar.js.dev.checkArgs', () => {
    it('Sould pass the check correctly', (done) => {
      try {
        checkArgs('yop', 10, 'world');
      } catch (e) {
        console.log(e);
        done();
      }
    });
  });
};
