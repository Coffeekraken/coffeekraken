const __fs = require('fs');
const __md5 = require('md5');

module.exports = function(req, res, next) {
  let packageJson;
  // load package.json
  if (__fs.existsSync(req.config.pwd + '/package.json')) {
    packageJson = require(req.config.pwd + '/package.json');
    if (packageJson.contributors) {
      packageJson.contributors = packageJson.contributors.map((contributor) => {
        contributor.gravatar = `https://www.gravatar.com/avatar/${__md5(contributor.email)}`;
        return contributor;
      });
    }
    // attach packageJson to req
    req.packageJson = packageJson;
  }
  // next
  next();
}
