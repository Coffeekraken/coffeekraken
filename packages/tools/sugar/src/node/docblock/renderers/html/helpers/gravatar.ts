import __md5 from '../../../../crypt/md5';

export default {
  id: 'gravatar',
  args: {
    email: ''
  },
  helper: function gravatar({ email, settings }) {
    const hash = __md5.encrypt(email);
    return `https://www.gravatar.com/avatar/${hash}`;
  }
};
