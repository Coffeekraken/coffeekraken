const __BitbucketApi = require('../apiAdapters/bitbucket');

module.exports = function clients(client = null) {

  new __BitbucketApi('buzzbrothers');

};
