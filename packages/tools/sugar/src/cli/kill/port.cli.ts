const __execSync = require('child_process').execSync;

module.exports = function (stringArgs = '') {
  const port = parseInt(stringArgs.replace(/"/g, '').trim());

  let processId;
  try {
    processId = __execSync(`lsof -ti:${port}`, {
      shell: true
    });
  } catch (e) {
    console.log(`No process running on the port "${port}"`);
    return;
  }
  console.log(`Killing process on port "${port}"`);
  try {
    __execSync(`kill ${processId}`);
  } catch (e) {
    console.log(e);
    return;
  }
  console.log('Process killed');
};
