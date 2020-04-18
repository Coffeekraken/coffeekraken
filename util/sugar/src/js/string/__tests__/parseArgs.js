module.exports = (__parseArgs) => {

  describe('sugar.js.string.parseArgs', () => {


    it('Should process the passed string correctly', done => {

      const args = __parseArgs('hello -w 10 --help "coco yep" #blop', {
        action: {
          type: 'String',
          alias: 'a',
          default: 'Hello World'
        },
        world: {
          type: 'Integer',
          alias: 'w'
        },
        id: {
          type: 'String',
          alias: 'i',
          regexp: /^#([\\S]+)$/
        },
        yop: {
          type: 'Array',
          alias: 'y'
        }
      });

      console.log(args);

      // expect(__parseArgs('199')).toBe(199);

      done();
    });

  });

}