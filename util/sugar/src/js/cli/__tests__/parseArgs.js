module.exports = (__parseArgs) => {
  describe('sugar.js.string.parseArgs', () => {
    it('Should process the passed string correctly', (done) => {
      const args = __parseArgs(
        'hello -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep" #blop',
        {
          action: {
            type: 'String',
            alias: 'a',
            default: 'Hello World',
            required: true
          },
          id: {
            type: 'String',
            alias: 'i',
            regexp: /^#([\S]+)$/,
            required: true
          },
          hehe: {
            type: 'String',
            default: 'Nelson the cat',
            required: true
          },
          bool: {
            type: 'Boolean',
            alias: 'b',
            default: false
          },
          'hello.world': {
            type: 'String',
            default: 'plop world',
            required: true
          },
          world: {
            type: 'Array',
            alias: 'w',
            validator: (value) => {
              return Array.isArray(value);
            }
          },
          yop: {
            type: 'String',
            alias: 'y'
          },
          help: {
            type: 'String',
            alias: 'h'
          }
        },
        {
          defaultObj: {
            yop: 'Hello world'
          }
        }
      );

      expect(args).toEqual({
        world: [10, 'yop', 'hello world'],
        bool: true,
        hello: { world: 'Nelson' },
        help: 'coco yep',
        action: 'hello',
        hehe: 'Nelson the cat',
        id: '#blop',
        yop: 'Hello world'
      });

      done();
    });
  });
};
