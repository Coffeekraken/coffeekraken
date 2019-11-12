module.exports = {
  watch: {
    dist: {
      paths: "src/**/*.js",
      options: {}
    }
  },
  scripts: {
    dist: "babel src -d dist",
    start: "./bin/coffeekraken-scripts-stack -i start"
  }
}
