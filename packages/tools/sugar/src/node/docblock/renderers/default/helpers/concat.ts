import __md5 from '../../../../../shared/crypt/md5';

export default {
  id: 'concat',
  args: {},
  helper: function concat({ settings }) {
    var result = '';

    for (var i in arguments) {
      result += (typeof arguments[i] === 'string' ? arguments[i] : '') + ' ';
    }

    return result;
  }
};
