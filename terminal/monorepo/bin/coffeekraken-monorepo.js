#!/usr/bin/env node

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
      console.log(
        `The script "${script}" that you want to run does not exist either in the local "package.json" file and in the general "${commander.config}" file...`
      );
      process.exit(0);
    }
    // otherwise, we run the script using the exec-sh package
    exec(
      shellScript,
      {
        cwd: process.cwd()
      },
      error => {
        if (error) {
          process.exit(error);
        }
        process.exit(0);
      }
    );
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
      console.log(
        execSync(`npm i -g ${globalDependenciesString}`, {
          stdio: "inherit"
        })
      );
    }
    const devDependencies = JSON.parse(
      fs.readFileSync(localPackageJsonPath || generalPackageJsonPath)
    ).devDependencies;
    if (devDependencies) {
      let devDependenciesString = "";
      Object.keys(devDependencies).forEach(devdep => {
        devDependenciesString += ` ${devdep}@${devDependencies[devdep]}`;
      });
      console.log(
        execSync(`npm i ${devDependenciesString}`, { stdio: "inherit" })
      );
    }
    const dependencies = JSON.parse(
      fs.readFileSync(localPackageJsonPath || generalPackageJsonPath)
    ).dependencies;
    if (dependencies) {
      let dependenciesString = "";
      Object.keys(dependencies).forEach(dep => {
        dependenciesString += ` ${dep}@${dependencies[dep]}`;
      });
      console.log(
        execSync(`npm i ${dependenciesString}`, { stdio: "inherit" })
      );
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
