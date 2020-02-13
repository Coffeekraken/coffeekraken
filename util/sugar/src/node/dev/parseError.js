/**
 * @name                                  parseError
 * @namespace                             sugar.node.dev
 * @type                                  Function
 *
 * Parse an error throwed in the terminal and return a nicely formated object like this:
 * {
 *    filename: 'something/cool.js',
 *    message: 'Something cool has appened in the terminal...',
 *    type: 'Error',
 *    line: 65,
 *    row: 23,
 *    stack: [{
 *      filename: 'something.cool.js',
 *      function: 'parseError',
 *      line: 65,
 *      row: 23
 *    }, {
 *      filename: 'other/thing.js',
 *      function: 'require',
 *      line: 30,
 *      row: 18
 *    }]
 * }
 *
 * @param             {Error}                error              The error to parse
 * @return            {Object}                                  A nicely formated object of the error
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function parseError(error) {
  const message = error.message;

  let stackTrace = error.stack.split(/\s{4}at\s/);
  stackTrace.shift();

  error = error.toString();
  error = error.split('\n').join('').replace(/\s+/g, " ");

  const type = error.match(/([a-zA-Z0-9\s]+):/)[1];

  // let stackArray = stackString.split('    at ');
  // stackArray.shift();
  stackTrace = stackTrace.map((s) => {
    s = s.replace('\n', '').trim();

    let func = s.match(/([\s\S]+)\(/);
    func = func ? func[1] : '';
    let path = s.match(/\(([\s\S]+):[0-9]+:[0-9]+\)/);
    path = path ? path[1] : '';
    let lines = s.match(/[\s\S]+:([0-9]+:[0-9]+)\)$/);
    lines = lines ? lines[1] : '';

    if ( ! func || ! path || ! lines) return false;

    return {
      function: func,
      filename: path,
      line: lines.split(':')[0],
      row: lines.split(':')[1]
    };

  });
  stackTrace = stackTrace.filter((s) => {
    if ( ! s) return false;
    return true;
  });

  return {
    filename: stackTrace[0].filename,
    message: message.split('\n').join('').replace(/\s+/g, " ").trim(),
    type: type,
    line: stackTrace[0].line,
    row: stackTrace[0].row,
    stack: stackTrace
  };
}
