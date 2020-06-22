module.exports = {
  scripts: {
    "start": `node ${__dirname}/bin/coffeekraken-squid.js start squid`,
    "dist": `node ${__dirname}/bin/coffeekraken-squid.js dist all`,
    "dist.js": `node ${__dirname}/bin/coffeekraken-squid.js dist js`,
    "dist.css": `node ${__dirname}/bin/coffeekraken-squid.js dist css`,
    "squid.js": `node ${__dirname}/bin/coffeekraken-squid.js squid js`,
    "squid.css": `node ${__dirname}/bin/coffeekraken-squid.js squid css`
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
        `${process.cwd()}/src/js/**/*.js`,
        `${process.cwd()}/views/**/*.js`
      ]
    },
    "dist.css": {
      paths: [
        `${process.cwd()}/src/css/**/*.scss`,
        `${process.cwd()}/views/**/*.scss`
      ]
    },
    "squid.js": {
      paths: [
        `${__dirname}/src/js/**/*.js`
      ]
    },
    "squid.css": {
      paths: [
        `${__dirname}/src/css/**/*.scss`
      ]
    }
  }
};
