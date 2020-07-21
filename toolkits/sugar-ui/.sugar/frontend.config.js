module.exports = {
  handlers: {
    search: {
      settings: {
        rules: {
          docMap: {
            settings: {
              filePath: `${__dirname}/../../sugar/docMap.json`
            }
          }
        }
      }
    }
  }
};
