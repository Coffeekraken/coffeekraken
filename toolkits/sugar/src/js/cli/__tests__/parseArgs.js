module.exports = (__parseArgs) => {
  describe('sugar.js.cli.parseArgs', () => {
    it('Should process the passed string correctly', (done) => {
      const args = __parseArgs(
        'hello -i #blop -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep"',
        {
          action: {
            type: 'String',
            description: 'Something',
            alias: 'a',
            default: 'Hello World',
            required: true
          },
          id: {
            type: 'String',
            description: 'Something',
            alias: 'i',
            regexp: /^#([\S]+)$/,
            required: true
          },
          hehe: {
            type: 'String',
            description: 'Something',
            default: 'Nelson the cat',
            required: true
          },
          bool: {
            type: 'Boolean',
            description: 'Something',
            alias: 'b',
            default: false
          },
          'hello.world': {
            type: 'String',
            description: 'Something',
            default: 'plop world',
            required: true
          },
          world: {
            type: 'Array<String|Number>',
            description: 'Something',
            alias: 'w',
            validator: (value) => {
              return (
                Array.isArray(value) ||
                typeof value === 'number' ||
                typeof value === 'string'
              );
            }
          },
          yop: {
            type: 'String',
            description: 'Something',
            alias: 'y'
          },
          help: {
            type: 'String',
            description: 'Something',
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
