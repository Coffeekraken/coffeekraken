const chalk = require("chalk");
const Script = require("./Script");

class Run {
  /**
   * Constructor
   * @param    {Object}    [config={}]    The config object to override default ones
   */
  constructor(commands, config = {}) {
    // save the commands to run
    this._commandsStringsArray = commands.split("&&");
    // save the config
    this._config = {
      ...config
    };

    // load the package.json file
    this._packageJson = this._loadPackageJson();

    // loop on each commands to create a stack
    this._commandsStack = {};
    this._commandsStringsArray.forEach(command => {
      this._commandsStack[command] = {
        script: new Script(command.trim()),
        command: command.trim()
      };
    });

    // init the "timer"
    this._elapsedTime = 0;
    this._elapsedTimeInterval = setInterval(() => {
      this._elapsedTime += 1;
      this._setLineContent(this._lineContent);
    }, 1000);

    // run the stack
    this._runStack();
  }

  async _runStack() {
    // loop on the stack to execute every commands
    for (const key in this._commandsStack) {
      const command = this._commandsStack[key];
      const commandString = command.command;
      const { script } = command;

      // listen for data
      script.on("data", data => {
        if (!data) return;
        this._setLineContent(`${data}`);
      });

      this._elapsedTime = 0;
      this._commandStatus = null;
      this._commandName = ` ${commandString}`;
      this._lineContent = "";

      try {
        // run the script
        this._commandStatus = "running";
        this._setLineContent("");
        await script.run();
        this._commandStatus = "success";
        this._setLineContent();
        process.stdout.cursorTo(9999999999999999);
        process.stdout.write("\n");
      } catch (error) {
        this._commandStatus = "error";
        this._setLineContent();
        process.stdout.cursorTo(9999999999999999);
        process.stdout.write("\n");
        if (error && Array.isArray(error)) {
          error = error.join("");
        }
        process.stdout.write(error);
        // break the loop
        break;
      }
    }

    // all done
    clearInterval(this._elapsedTimeInterval);
  }

  _setLineContent(content = null) {
    const startString = `${
      this._commandName
    } |${this._elapsedTime.toString().padStart(2, "0")}s| `;
    const startStringLength = startString.length;
    const maxStringLength = process.stdout.columns - startStringLength;

    if (content) {
      this._lineContent = content
        .toString()
        .replace(/\n/g, " ")
        .substr(0, maxStringLength);
      this._lineContent = this._lineContent.padEnd(
        maxStringLength - this._lineContent.length,
        " "
      );
    } else {
      this._lineContent = "".padEnd(maxStringLength, " ");
    }

    let colorFn = chalk.bgBlack;
    switch (this._commandStatus) {
      case "running":
        colorFn = chalk.bgYellow;
        break;
      case "success":
        colorFn = chalk.bgGreen;
        break;
      case "error":
        colorFn = chalk.bgRed;
        break;
      default:
    }

    this._rewriteLine(
      `${colorFn(chalk.black(startString + this._lineContent))}`
    );
  }

  _rewriteLine(content) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(content);
    process.stdout.cursorTo(0);
  }

  _loadPackageJson() {
    const packageJson = require(`${process.cwd()}/package.json`);
    if (!packageJson) {
      throw new Error(
        'Run : It seems that you don\'t have any "package.json" file...'
      );
    }
    return packageJson;
  }
}

module.exports = Run;
