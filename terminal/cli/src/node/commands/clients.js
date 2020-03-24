const __BitbucketApi = require('../apiAdapters/bitbucket');

module.exports = function clients(client = null) {
  console.log(client);

  new __BitbucketApi('buzzbrothers');

};
