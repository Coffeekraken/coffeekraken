module.exports = {
  scripts: {
    "start": `node ${__dirname}/bin/coffeekraken-squid.js start squid`,
    "dist": `node ${__dirname}/bin/coffeekraken-squid.js dist all`,
    "dist.js": `node ${__dirname}/bin/coffeekraken-squid.js dist js`
  },
  watch: {
    "start": {
      paths: [
        `${__dirname}/app.js`,
        `${__dirname}/src/**/*.js`,
        `${process.cwd()}/controllers/**/*.js`,
        `${process.cwd()}/views/**/*`,
        `${process.cwd()}/squid.config.js`,
        `${process.cwd()}/squid/*.js`
      ]
    },
    "dist.js": {
      paths: [
        `${__dirname}/src/js/**/*.js`,
        `${process.cwd()}/src/js/**/*.js`,
        `${process.cwd()}/views/**/*.js`
      ]
    }
  }
};
