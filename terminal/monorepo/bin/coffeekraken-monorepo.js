#!/usr/bin/env node

const __path = require('path');
const __initApp = require('@coffeekraken/sugar/node/app/initApp');
const __log = require('@coffeekraken/sugar/node/log/log');
const __glob = require('glob');
const __appRootPath = require('app-root-path');
const __findUp = require('find-up');


// set some process variables
process.env["SUPPRESS_NO_CONFIG_WARNING"] = false;

// parse arguments
let args = process.argv.slice(2);
const script = args[0] || "run";

// import dependencies
const pkgUp = require("pkg-up");
const findUp = require("find-up");
const commander = require("commander");
const exec = require("exec-sh");
const fs = require("fs");
const localPackageJsonPath = process.cwd() + "/package.json";
const localPackageJson = require(localPackageJsonPath);

// load the general package.json file for the monorepo
let generalPackageJsonPath = pkgUp.sync({
  cwd: process.cwd() + "/../"
});
if (!generalPackageJsonPath) {
  generalPackageJsonPath = pkgUp.sync({
    cwd: process.cwd()
  });
}
const generalPackageJson = require(generalPackageJsonPath);

// init the app
__initApp({
  cwd: __path.resolve(__dirname + '/../')
});

// register the CLI arguments
commander
  .version(localPackageJson.version)
  .option(
    "-p, --path <type>",
    "specify in which path to execute the script",
    process.cwd()
  )
  .option(
    "-c, --config <type>",
    "specify the config filename to look for",
    "package.json"
  );

// register the CLI commands
commander
  .command("run <script>")
  .description(
    `Run a script registered in the local package.json file or in the global "${commander.config}" file`
  )
  .action(script => {
    let shellScript =
      localPackageJson &&
      localPackageJson.scripts &&
      localPackageJson.scripts[script]
        ? localPackageJson.scripts[script]
        : null;
    // check that the script exist either in the local package.json file or in the global config file
    if (
      !shellScript &&
      generalPackageJson.scripts &&
      generalPackageJson.scripts[script]
    ) {
      shellScript = generalPackageJson.scripts[script];
    }
    if (!shellScript) {
      _log(
        `The script "${script}" that you want to run does not exist either in the local "package.json" file and in the general "${commander.config}" file...`, 'warn'
      );
      process.exit(0);
    }
    // otherwise, we run the script using the exec-sh package

    __log(`Execution of the script "${script}"...`, 'info');

    exec(
      shellScript,
      {
        cwd: process.cwd()
      },
      error => {
        if (error) {
          __log(error, 'error');
          process.exit();
        }
        __log(`The script "${script}" has been correctly executed.`, 'success');
        process.exit(0);
      }
    );
  });

commander
  .command('doc [all]')
  .description(
    'Generate the "doc/src/**" folders and markdown files from the sources files'
  )
  .action((all) => {

    if (all === 'all') {

      const rootPath = __findUp.sync('.git', {
        type : 'directory'
      });

      console.log(rootPath);

      if ( ! rootPath) {
        __log('We cannot find a ".git" folder that indicate the root of the repository...', 'error');
        process.exit();
      }

      console.log(__path.resolve(rootPath + '/..'));

      console.log(__glob.sync('*/*/src', {
        cwd: __path.resolve(rootPath + '/..') + '/',
        root: __path.resolve(rootPath + '/..') + '/'
      }));
      process.exit(0);

    }


    __log(`Executing the documentation generation for the app "${localPackageJson.name || 'unknown'}"...`, 'info');

    const { execSync } = require("child_process");
    const error = execSync(`coffeekraken-docblock-to-markdown -f 'src/**/*.js' -d doc`, { stdio: "inherit" })

    if (error) {
      __log(error, 'error');
      process.exit();
    }
    __log(`The documentation generation has been made successfully for the app "${localPackageJson.name || 'unknown'}".`, 'success');
    process.exit(0);

  });

commander
  .command("install")
  .description(
    'Install all the dependencies from the "package.json" file available in the current process directory'
  )
  .action(() => {
    const { execSync } = require("child_process");
    const globalDependencies = JSON.parse(
      fs.readFileSync(localPackageJsonPath || generalPackageJsonPath)
    ).globalDependencies;

    if (globalDependencies) {
      let globalDependenciesString = "";
      Object.keys(globalDependencies).forEach(globaldep => {
        globalDependenciesString += ` ${globaldep}@${globalDependencies[globaldep]}`;
      });

      __log(`Installing the global dependencies for the app "${localPackageJson.name || 'unknown'}"...`, 'info');

      const error = execSync(`npm i -g ${globalDependenciesString}`, {
        stdio: "inherit"
      });
      if (error) {
        __log(error, 'error');
        process.exit();
      }
      __log(`The global dependencies for the app "${localPackageJson.name || 'unknown'}" have been successfully installed.`, 'success');
    }
    const devDependencies = JSON.parse(
      fs.readFileSync(localPackageJsonPath || generalPackageJsonPath)
    ).devDependencies;
    if (devDependencies) {
      let devDependenciesString = "";
      Object.keys(devDependencies).forEach(devdep => {
        devDependenciesString += ` ${devdep}@${devDependencies[devdep]}`;
      });

      __log(`Installing the development dependencies for the app "${localPackageJson.name || 'unknown'}"...`, 'info');

      const error = execSync(`npm i ${devDependenciesString}`, { stdio: "inherit" })
      if (error) {
        __log(error, 'error');
        process.exit();
      }
      __log(`The development dependencies for the app "${localPackageJson.name || 'unknown'}" have been successfully installed.`, 'success');

    }
    const dependencies = JSON.parse(
      fs.readFileSync(localPackageJsonPath || generalPackageJsonPath)
    ).dependencies;
    if (dependencies) {
      let dependenciesString = "";
      Object.keys(dependencies).forEach(dep => {
        dependenciesString += ` ${dep}@${dependencies[dep]}`;
      });

      __log(`Installing the dependencies for the app "${localPackageJson.name || 'unknown'}"...`, 'info');

      const error = execSync(`npm i ${dependenciesString}`, { stdio: "inherit" })
      if (error) {
        __log(error, 'error');
        process.exit();
      }
      __log(`The dependencies for the app "${localPackageJson.name || 'unknown'}" have been successfully installed.`, 'success');
      process.exit(0);
    }
  });

// parse the arguments
commander.parse(process.argv);

// search for the config file
const configPath = findUp.sync(commander.config);

// if no config file, stop here
if (!configPath) {
  console.log(
    `You need to create a "package.json" file in the package directory or a ${commander.config} in one of the parents in order to use this CLI...`
  );
  process.exit(0);
}
