export default (__SCli, __SInterface) => {
  describe('sugar.node.cli.SCli', () => {
    it('Check that the SCli class work correctly', () => {
      class MyInterface extends __SInterface {
        static definition = {
          hostname: {
            type: 'String',
            description: 'Server hostname',
            default: 'localhost'
          },
          port: {
            type: 'Number',
            description: 'Server port',
            default: 8080
          },
          rootDir: {
            type: 'String',
            description: 'Root directory',
            default: '.'
          },
          arg1: {
            type: 'Boolean',
            alias: 'a',
            description: 'Argument 1',
            default: true
          }
        };
      }

      class MyCli extends __SCli {
        static command = 'php %hostname:%port %rootDir %arguments';
        static interfaces = {
          this: MyInterface
        };
        _run() {}
      }

      const cli = new MyCli();

      expect(cli.command).toBe('php %hostname:%port %rootDir %arguments');
      expect(typeof cli.interface).toBe('object');

      expect(
        cli.toString({
          port: 8888
        })
      ).toBe('php localhost:8888 . -a');

      expect(
        cli.toString(
          {
            port: 8888
          },
          false
        )
      ).toBe('php localhost:8888 .');
    });
  });
};
