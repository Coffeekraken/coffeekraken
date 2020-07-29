// const __sugarConfig = require('./config/sugar');
// const __SLog = require('./log/SLog');
const __isChildProcess = require('./is/childProcess');
const __blessed = require('blessed');

const __SProcessOutput = require('./blessed/SProcessOutput');
const $output = new __SProcessOutput(process, {
  width: '100%',
  height: '100%',
  style: {
    bg: 'red'
  }
});

const $box = new __blessed.box({
  width: 200,
  height: 200,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  style: {
    bg: 'red',
    fg: 'white'
  },
  mouse: false,
  keys: false,
  scrollable: false,
  padding: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

process.on('unhandledRejection', (error) => {
  // console.log('COCOCOCOCOCOC');
  // if (__isChildProcess()) {
  let errorArray = [`[error]`];

  if (error.name) errorArray.push(error.name);
  errorArray.push('\n');
  if (error.fileName) errorArray.push(error.fileName);
  if (error.fileName && error.lineNumber)
    errorArray.push(':' + error.lineNumber);
  errorArray.push('\n');
  if (error.message) errorArray.push(error.message);
  errorArray.push('\n');
  if (error.stack) errorArray.push(error.stack);

  if (global.screen) {
    global.screen.append($box);
    $box.setContent(' wfijweojf woiej fowj efjwpojfe qw jeiwqefoijwoijf');
    setTimeout(() => {
      // global.screen.append($output);
      // $output.log(errorArray.join('\n'));
      console.log('COCO');
      global.screen.render();
    }, 2000);
  }

  // console.log(errorArray.join('\n'));
  return;
  // }
});

// /**
//  * @name                    index
//  * @namespace           node
//  *
//  * This file is the "initialisation" one for the sugar node toolkit.
//  * It's optional to include it but if you do, you will get these features "for free":
//  * - Logging: Get the powerfull options of the SLog class without any change in your codebase
//  *
//  * @since       2.0.0
//  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//  */

// // Logging
// new __SLog(__sugarConfig('log'));
