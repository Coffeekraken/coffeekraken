module.exports = (__parseArgs) => {

  describe('sugar.js.string.parseArgs', () => {


    it('Should process the passed string correctly', done => {

      const args = __parseArgs('hello -w 10 --help "coco yep" #blop', {
        action: 'String -a --action /^\\S$/',
        world: 'Integer -w --world',
        help: 'String -h --help',
        id: 'String -i --id /^#([\\S]+)$/',
        yop: 'String -y --yop "Default value"'
      });

      console.log(args);

      expect(__parseArgs('199')).toBe(199);

      done();
    });

  });

}