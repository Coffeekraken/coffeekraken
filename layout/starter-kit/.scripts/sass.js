const sass = require('sass');
const globImporter = require('sass-glob-importer');
const fs = require('fs');

sass.render({
  file: './src/scss/style.scss',
  outputStyle: 'compressed',
  importer: globImporter()
}, (error, result) => {
    if(!error){
      // No errors during the compilation, write this result on the disk
      fs.writeFile('./dist/css/style.css', result.css, function(err){

      });
    }
});
