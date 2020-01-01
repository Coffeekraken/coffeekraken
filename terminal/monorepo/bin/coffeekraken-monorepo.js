#!/usr/bin/env node

const __fs = require('fs');
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

      let rootPath = __findUp.sync('.git', {
        type : 'directory'
      });

      if ( ! rootPath) {
        __log('We cannot find a ".git" folder that indicate the root of the repository...', 'error');
        process.exit();
      }

      rootPath = __path.resolve(rootPath + '/..');

      __log('Searching for each packages inside the monorepo that have a "src" folder to generate the documentation files...', 'info');

      const srcFolders = __glob.sync('**/src', {
        cwd: rootPath + '/',
        root: rootPath + '/',
        ignore: [
          '**/node_modules/**',
          '**/vendor/**',
          '**/doc/**',
          '**/demo/**',
          '**/appsRoot/**'
        ]
      });

      if ( ! srcFolders.length) {
        __log('No "src" folders finded...', 'error');
        process.exit(0);
      }

      // loop on each finded "src" folders to generate the documentation for it
      srcFolders.forEach((srcFolder) => {

        const packageRoot = __path.resolve(srcFolder + '/..');

        __log(`- Generating the documentation for the package "${__path.resolve(srcFolder + '/..')}"`, 'info');

        // generate the docuentation files for the current srcFolder
        const { execSync } = require("child_process");
        try {
          const error = execSync(`coffeekraken-docblock-to-markdown -f 'src/**/*' -d doc`, {
            stdio: "inherit",
            cwd: packageRoot
          });

          if (error) {
            __log(error, 'error');
            process.exit();
          }
        } catch(e) {}

      });


      process.exit(0);

    }


    __log(`Executing the documentation generation for the app "${localPackageJson.name || 'unknown'}"...`, 'info');

    const { execSync } = require("child_process");

    try {
      spawnSync(`coffeekraken-docblock-to-markdown -f 'src/**/*.js' -d doc`, {
        // stdio: "inherit"
      });
    } catch (e) {
      console.log('eror');
      // if (e) {
      //   __log(e, 'error');
      //   process.exit();
      // }
    }

    __log(`The documentation generation has been made successfully for the app "${localPackageJson.name || 'unknown'}".`, 'success');
    process.exit(0);

  });

  commander
    .command('docMap')
    .description(
      'Generate the "docMap.json" file at the application root folder by searching for the namespaces inside the documentation files'
    )
    .action(() => {

      let rootPath = __findUp.sync('.git', {
        type : 'directory'
      });

      if ( ! rootPath) {
        __log('- We cannot find a ".git" folder that indicate the root of the repository...', 'error');
        process.exit();
      }

      rootPath = __path.resolve(rootPath + '/..');

      __log('- Searching for the documentation files in markdown format...', 'info');

      const docFiles = __glob.sync('**/*.md', {
        cwd: rootPath + '/',
        root: rootPath + '/',
        ignore: ['**/node_modules/**']
      });

      // init the docMap object
      let docMap = {};

      __log('- Searching for namespace inside each documentation files and building docMap object...', 'info');

      // loop on each files fi find the ones that have "namespace" specified
      docFiles.forEach((docFile) => {

        // read the doc file content
        const docFileContent = __fs.readFileSync(`${rootPath}/${docFile}`, 'utf8');

        // search for the namespace tag in the doc
        const reg = /<!--\s@namespace:\s(.+)\s-->/g;
        const result = reg.exec(docFileContent);
        if ( ! result || ! result[1]) return;

        // save in the docMap
        docMap[result[1]] = docFile;

      });

      // saving the docMap at the appRoot folder
      __log('- Saving the "docMap.json" file at the application root folder...', 'info');
      try { __fs.unlinkSync(`${rootPath}/docMap.json`) } catch(e) {}
      __fs.writeFileSync(`${rootPath}/docMap.json`, JSON.stringify(docMap, null, 4), 'utf8');

      __log('- "docMap.json" generation made successfully.', 'success');

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
