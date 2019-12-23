const __fs = require('fs');
const __path = require('path');

let allFileContent = 'export default {';

__fs.readdirSync('js').forEach((dir) => {

  if (dir === '_all.js') return;

  let fileContent = 'export default {';
  const path = __path.join('js', dir);

  __fs.readdirSync(path).forEach((file) => {
    if (file === '_all.js') return;

    fileContent += `
    '${file.split('.')[0]}': require('./${file.split('.')[0]}'),`;

  });
  fileContent += `
  };
  `;

  allFileContent += `
  '${dir}': require('./${dir}/_all'),`;

  // save the _all.js file
  __fs.writeFile(`${path}/_all.js`, fileContent, (error) => {
    if (error) throw error;
    console.log(`All files in the ${path} path exported`);
  });

});

allFileContent += `
};
`;

__fs.writeFile(`js/_all.js`, allFileContent, (error) => {
  if (error) throw error;
});
