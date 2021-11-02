export default {
  id: 'concat',
  args: {},
  process: function concat({ settings }) {
    var result = '';

    for (var i in arguments) {
      result += (typeof arguments[i] === 'string' ? arguments[i] : '') + ' ';
    }

    return result;
  }
};
