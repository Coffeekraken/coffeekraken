const p = require('../../server/SPhpServerCli');
new p();

module.exports = (__SCli) => {
  return;
  describe('sugar.node.cli.SCli', () => {
    it('Check that the SCli class work correctly', async (done) => {
      const cli = new __SCli('php [hostname]:[port] [rootDir] [arguments]', {
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
      });

      expect(cli.commandString).toBe(
        'php [hostname]:[port] [rootDir] [arguments]'
      );
      expect(typeof cli.definitionObj).toBe('object');

      expect(
        cli.buildCommandLine({
          port: 8888
        })
      ).toBe('php localhost:8888 . -a');

      expect(
        cli.buildCommandLine(
          {
            port: 8888
          },
          false
        )
      ).toBe('php localhost:8888 .');

      // expect(__SCli('Hello world', 'debug')).toBe('debug: Hello world');
      done();
    });
  });
};
