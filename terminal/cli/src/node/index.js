const { program } = require("commander");
const __packageJson = require("../../package.json");
program.version(__packageJson.version);

program
  .command("clients [client]")
  .description("List all the clients available")
  .action(require("./commands/clients"));

program.parse(process.argv);
