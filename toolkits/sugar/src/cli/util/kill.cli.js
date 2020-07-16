const __parseHtml = require('../../node/terminal/parseHtml');
const __fkill = require('fkill');
const psList = require('ps-list');
const __SPromise = require('../../node/promise/SPromise');

module.exports = async (stringArgs = '') => {
  // const promise = new __SPromise(() => {
  //   console.log('COCO');
  // });

  // setTimeout(() => {
  //   promise.resolve();
  // });

  // await promise;

  // console.log('FINISHED');

  // return;

  if (!stringArgs) {
    throw new Error(`You must specify a sugar process(s) to kill using the following format:
      - sugar util.kill server // this will kill all the sugar processes that starts with "server"
      - sugar util.kill server.frontend // this will kill the sugar process called "server.frontend"
      - sugar util.kill all // this will kill all the sugar processes
    `);
  } else if (stringArgs.trim() === 'all') {
    stringArgs = '';
  }

  const processesArray = [];

  console.log(
    __parseHtml(`Listing all the processes that need to be killed...`)
  );

  let processesObj = await psList();
  Object.keys(processesObj).forEach((key) => {
    const processObj = processesObj[key];

    if (processObj.pid === process.pid || processObj.pid === process.ppid) {
      return;
    }
    if (processObj.name !== 'node') return;
    if (
      processObj.cmd.includes('/bin/sh -c ps -e|grep') ||
      processObj.cmd.includes('grep sugar ') ||
      processObj.cmd.includes('sugar util.kill ')
    )
      return;

    let filterReg = new RegExp(
      `^(.*)?sugar\\s${stringArgs.split('.').join('\\.')}(.*?)$`,
      'gi'
    );
    if (!processObj.cmd.match(filterReg)) return;

    processesArray.push(processObj);
  });

  if (processesArray.length === 0) {
    console.log(__parseHtml(`<green>Theirs's no process to kill...</green>`));
    process.exit();
  }

  console.log(
    __parseHtml(
      `Process(es) to kill: <primary>${processesArray.length}</primary>`
    )
  );

  for (let obj in processesArray) {
    const processObj = processesArray[obj];
    console.log(
      __parseHtml(
        `Killing the process <primary>${processObj.cmd}</primary> with the PID <cyan>${processObj.pid}</cyan>`
      )
    );
    await __fkill(parseInt(processObj.pid), {
      force: true
      // silent: true
    });
  }

  console.log(
    __parseHtml(
      `<primary>${processesArray.length}</primary> process(es) have been killed <green>successfully</green>`
    )
  );

  process.exit();
};
