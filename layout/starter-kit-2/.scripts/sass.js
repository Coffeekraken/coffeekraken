const sass = require('sass');
const globImporter = require('sass-glob-importer');
const fs = require('fs');
const path = require('path');
const Bundler = require("scss-bundle").Bundler;

(async () => {
    // Absolute project directory path.
    const projectDirectory = path.resolve(__dirname, "./../");
    const bundler = new Bundler(undefined, projectDirectory);
    // Relative file path to project directory path.
    const result = await bundler.bundle("./src/scss/style.scss");

    fs.writeFileSync('.scripts/bundledcss.scss', result.bundledContent);

    fs.appendFileSync('.scripts/bundledcss.scss', `
      /**
       * Views
       * Import all the scss files found in the views folder
       */
      @import '../views/**/*.scss';
    `);

    sass.render({
      file: `${__dirname}/bundledcss.scss`,
      outputStyle: 'compressed',
      includePaths: ['node_modules'],
      importer: globImporter()
    }, (error, result) => {
        if(!error){

          try {
            fs.unlinkSync('./dist/css/style.css');
          } catch(e) {}

          // No errors during the compilation, write this result on the disk
          fs.writeFileSync('./dist/css/style.css', result.css.toString());
        } else {
          console.log(error);
        }
    });

})();
