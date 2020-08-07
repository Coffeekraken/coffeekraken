module.exports = (__SCli) => {
  describe('sugar.node.cli.SCli', () => {
    it('Check that the SCli class work correctly', () => {
      class MyCli extends __SCli {
        static command = 'php [hostname]:[port] [rootDir] [arguments]';
        static definitionObj = {
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
        _run() {}
      }

      const cli = new MyCli();

      expect(cli.commandString).toBe(
        'php [hostname]:[port] [rootDir] [arguments]'
      );
      expect(typeof cli.definitionObj).toBe('object');

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
