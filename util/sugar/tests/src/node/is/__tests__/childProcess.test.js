const __isChildProcess = require('../childProcess');

describe('sugar.node.is.childProcess', () => {
  it('Should return false on the test in a child process', (done) => {
    expect(__isChildProcess()).toBe(true);
    done();
  });
});
