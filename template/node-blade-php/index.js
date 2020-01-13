const execPhp = require('exec-php')
const tmp = require('tmp')
const rimraf = require('rimraf')
const fs = require('fs');
const log = require('@coffeekraken/sugar/node/log/log');

/**
 * Compile a blade php view and return a promise with the
 * resulting template
 *
 * @param    {String}    view    relative path to the view to render
 * @param    {Object}    [data={}]    The data to pass to the view
 * @return    {Promise}    A promise with the template result passed in
 *
 * @example    js
 * const nodeBladePhp = require('@coffeekraken/node-blade-php');
 * nodeBladePhp.setViewsFolder('my/cool/views/folder');
 * nodeBladePhp.compile('my-cool-view.blade.php', {
 *   hello: 'World'
 * }).then((result) => {
 *   // do something with the result
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

process.env.CK_NODE_BLADE_PHP_VIEWS_FOLDER = process.cwd() + '/views';

const setViewsFolder = (viewsFolder) => {
  console.log(viewsFolder);
  if ( ! fs.existsSync(viewsFolder)) {
    log(`The passed views folder "${viewsFolder}" does not exist...`, 'error');
    return;
  }
  process.env.CK_NODE_BLADE_PHP_VIEWS_FOLDER = viewsFolder;
};

const compile = (view, data = {}) => {
    return new Promise((resolve, reject) => {
        // create a new tmp folder for blade cache
        var tmpobj = tmp.dirSync();

        // check that the view exist
        const viewPath = view.replace('.blade.php','').replace('.php','').replace('.','/');
        let finalViewPath = null;
        if (fs.existsSync(`${process.env.CK_NODE_BLADE_PHP_VIEWS_FOLDER}/${viewPath}`)) {
          finalViewPath = viewPath;
        }
        if (fs.existsSync(`${process.env.CK_NODE_BLADE_PHP_VIEWS_FOLDER}/${viewPath}.php`)) {
          finalViewPath = viewPath;
        }
        if (fs.existsSync(`${process.env.CK_NODE_BLADE_PHP_VIEWS_FOLDER}/${viewPath}.blade.php`)) {
          finalViewPath = viewPath;
        }
        if ( ! finalViewPath) {
          log(`The wanted view "${view}" does not exist...`, 'error');
          return;
        }
        finalViewPath = finalViewPath.replace('/','.');

        // preparing the php execution
        execPhp(__dirname + '/compile.php',__dirname + '/bin/php', (error, php, outprint) => {
            // execute the php engine and get back the result
            const result = php.compile(process.env.CK_NODE_BLADE_PHP_VIEWS_FOLDER, finalViewPath, data, tmpobj.name, (err, result, output, printed) => {
                // get the best result possible
                const ret = result || printed || error
                // resolve the promise with the best result possible
                resolve(ret)
                // remove temp folder
                rimraf.sync(tmpobj.name)
            })
        })
    })
}

// export the compile function
module.exports = {
  setViewsFolder,
  compile
};
