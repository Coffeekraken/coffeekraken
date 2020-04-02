const { program } = require("commander");
const __packageJson = require("../../package.json");
program.version(__packageJson.version);

// program
//   .command("clients [client]")
//   .description("List all the clients available")
//   .action(require("./commands/clients"));

// require('./commands/start')();

const __CoffeeCli = require('./classes/CoffeeCli');
const cli = new __CoffeeCli();

program.parse(process.argv);
