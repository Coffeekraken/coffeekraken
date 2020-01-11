const path = require("path");
const fs = require("fs");
const blessed = require("blessed");
const logSymbols = require("log-symbols");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const stripAnsi = require("strip-ansi");
const nodeNotifier = require("node-notifier");
const terminate = require("terminate");
const clear = require("clear");
const pad = require("pad");
const flatten = require("flat");
const pkgUp = require("pkg-up");
const deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const Script = require("./Script");

class scriptsStack {
  constructor(config) {
    this._config = Object.assign(
      {},
      {
        color: "yellow"
      },
      config
    );
    this._scriptsIds = [];
    this._scriptsStack = {};
    this._watchers = {};
    this._screen = null;
    this._currentScriptId = null;

    // load package json
    this._packageJson = this._loadPackageJson();

    // check if we have a packageJson in an upper folder
    this._packageUpJson;
    const pkgUpPath = pkgUp.sync({
      cwd: process.cwd() + "/../"
    });
    if (pkgUpPath) {
      const packageUp = require(pkgUpPath);
      if (packageUp) {
        this._packageUpJson = packageUp;
      }
    }

    // set the process name
    process.title = `coffeekraken-scripts-stack.${this._packageJson.name}`;

    if (this._config.config && this._config.config.length > 0) {
      this._config.config.forEach((configFile) => {
        if (fs.existsSync(configFile)) {
          this._config = deepMerge(this._config, require(configFile));
        }
      });
    }

    // save the scripts in a global variable
    this._scriptsObj = {};
    if (this._packageUpJson && this._packageUpJson.scripts) {
      this._scriptsObj = this._packageUpJson.scripts;
    }
    if (this._packageJson && this._packageJson.scripts) {
      this._scriptsObj = {
        ...this._scriptsObj,
        ...this._packageJson.scripts
      };
    }
    if (this._config.config && this._config.config.length > 0) {
      this._config.config.forEach((configFile) => {
        if (fs.existsSync(configFile)) {
          this._scriptsObj = {
            ...this._scriptsObj,
            ...require(configFile).scripts || {}
          };
        }
      });
    }
  }

  start() {
    // list all scripts
    this._scriptsIds = [];
    if (this._packageJson.scripts) {
      this._scriptsIds = [
        ...this._scriptsIds,
        ...Object.keys(this._packageJson.scripts)
      ];
    }
    if (this._packageUpJson.scripts) {
      this._scriptsIds = [
        ...this._scriptsIds,
        ...Object.keys(this._packageUpJson.scripts)
      ];
    }
    if (this._config.config && this._config.config.length > 0) {
      this._config.config.forEach((configFile) => {
        if (fs.existsSync(configFile)) {
          this._scriptsIds = [
            ...this._scriptsIds,
            ...Object.keys(require(configFile).scripts || {})
          ];
        }
      });
    }

    // remove the ignored scripts
    (this._config.ignore || []).forEach(ignoreScript => {
      const startScriptIdx = this._scriptsIds.indexOf(ignoreScript);
      if (startScriptIdx !== -1) {
        this._scriptsIds.splice(startScriptIdx, 1);
      }
    });

    // init scripts
    this._scriptsStack = this._initScriptsStack(this._scriptsIds);

    // init screen
    this._screen = this._initScreen();

    // add keyboard listeners
    this._addKeyboardListeners(this._screen);

    // add listeners to scripts
    this._addScriptsListeners(this._scriptsStack);

    // update the scripts list
    this._initScriptsList(this.screen.$scriptsList, this._scriptsStack);

    // select the first script
    const firstScript = this._scriptsStack[this._scriptsIds[0]];
    this._selectScript(firstScript);

    // update footer content
    this._updateFooterContent();

    // listen for exit
    this._handleExit();

    // start passed scripts
    if (this._config.scripts && this._config.scripts.length) {
      this._config.scripts.forEach(scriptId => {
        this._runScript(scriptId);
      });
    }

    // render screen
    this._renderScreen();
  }

  _initScriptsStack(scriptsIds) {
    const stack = {};
    scriptsIds.forEach(scriptId => {
      let watchObj = null;
      if (this._packageJson.watch && this._packageJson.watch[scriptId]) {
        watchObj = {
          ...(watchObj || {}),
          ...this._packageJson.watch[scriptId]
        };
      }
      if (this._packageUpJson.watch && this._packageUpJson.watch[scriptId]) {
        watchObj = {
          ...(watchObj || {}),
          ...this._packageUpJson.watch[scriptId]
        };
      }
      if (this._config.config && this._config.config.length > 0) {
        this._config.config.forEach((configFile) => {
          if (fs.existsSync(configFile)) {
            watchObj = {
              ...(watchObj || {}),
              ...require(configFile).watch[scriptId] || {}
            };
          }
        });
      }
      stack[scriptId] = new Script(
        scriptId,
        this._scriptsObj[scriptId],
        Object.keys(watchObj).length > 0 ? watchObj : null
      );
      if (this._config.watch) {
        stack[scriptId].watch();
      }
    });
    return stack;
  }

  _loadPackageJson() {
    const packageJson = require(process.env.PWD + "/package.json");
    if (!packageJson) {
      throw new Error(
        'Scripts Stack : It seems that you don\'t have any "package.json" file...'
      );
    }
    return packageJson;
  }

  _getScriptInstance(key) {
    if (typeof key === "number") {
      return this._scriptsStack[
        Object.keys(this._scriptsStack)[parseInt(key) - 1]
      ];
    } else if (key instanceof Script) {
      return key;
    } else if (typeof key === "string") {
      return this._scriptsStack[this._getScriptIdFromListLine(key)];
    }
  }

  _getCurrentScriptInstance() {
    return this._scriptsStack[this._currentScriptId];
  }

  _initScreen() {
    const screen = blessed.screen({
      smartCSR: true,
      autoPadding: true,
      ignoreLocked: ["C-c"],
      style: {
        bg: "black"
      }
    });
    screen.title = this._packageJson.name;

    screen.$container = blessed.box({
      parent: screen,
      width: "100%",
      height: "100%",
      style: {
        bg: "black"
      }
    });

    const headerContent = [];
    if (this._packageJson.license) {
      headerContent.push(
        chalk.bold.white.bgBlack(` ${this._packageJson.license} `)
      );
    }
    headerContent.push(
      `${chalk.black.bold(this._packageJson.name)} ${chalk.bgWhite.black(
        " " + this._packageJson.version + " "
      )}`
    );

    screen.$headerBox = blessed.box({
      parent: screen.$container,
      width: "100%",
      content: `\n ${headerContent.join(" ")}`,
      height: 3,
      style: {
        bg: this._config.color
      }
    });
    screen.$scriptsList = blessed.list({
      parent: screen.$container,
      width: "25%",
      top: 4,
      bottom: 2,
      keys: true,
      mouse: true,
      tags: true,
      vi: false,
      invertSelected: false,
      style: {
        selected: {
          bold: true,
          fg: this._config.color,
          bg: "black"
        },
        fg: "white",
        bg: "black"
      }
    });
    screen.$scriptsList.focus();
    screen.$scriptsList.on("select", (item, index) => {
      // get the script instance of the selected script and run it
      const script = this._getScriptInstance(item.getContent());
      if (!script) return;
      // select script
      this._selectScript(script);
    });

    screen.$separationLine = blessed.line({
      parent: screen.$container,
      orientation: "vertical",
      top: 4,
      left: "26%",
      width: 1,
      bottom: 3,
      style: {
        fg: this._config.color,
        bg: "black"
      }
    });

    screen.$consoleBox = blessed.box({
      parent: screen.$container,
      top: 4,
      bottom: 3,
      left: "28%",
      keys: true,
      mouse: true,
      tags: true,
      vi: false,
      scrollable: true,
      alwaysScroll: true,
      style: {
        bg: "black",
        fg: "white"
      },
      scrollbar: {
        bg: this._config.color
      }
    });

    screen.$footerBox = blessed.box({
      parent: screen.$container,
      width: "100%",
      content: ``,
      height: 2,
      bottom: 0,
      style: {
        bg: this._config.color
      }
    });

    // return the screen instance
    return screen;
  }

  _addKeyboardListeners() {
    // Quit on Escape, q, or Control-C.
    this.screen.key(["escape", "q", "C-c"], (ch, key) => {
      // unwatch files
      Object.keys(this._watchers).forEach(watchKey => {
        this._watchers[watchKey].close();
      });
      this.screen.destroy();
      clear();
      try {
        terminate(process.pid, () => {
          process.exit(0);
        });
      } catch (e) {
        process.exit(0);
      }
    });

    this.screen.key(["r"], (ch, key) => {
      // run the selected script
      const script = this._getCurrentScriptInstance();
      if (!script) return;
      this._runScript(script);
    });

    this.screen.key(["s"], (ch, key) => {
      // run the selected script
      this._config.switch = !this._config.switch;
      // update the footer content
      this._updateFooterContent();
    });

    this.screen.key(["w"], (ch, key) => {
      // run the selected script
      const script = this._getCurrentScriptInstance();
      if (!script) return;
      if (script.isWatched()) {
        script.unwatch();
      } else if (script.isWatchable()) {
        script.watch();
      }
      const listItemIdx = this._getScriptIdxInList(script.id);
      this.screen.$scriptsList.setItem(
        listItemIdx,
        this._listScriptName(script.id)
      );
      // update footer content
      this._updateFooterContent();
      this._renderScreen();
    });

    this.screen.key(["c"], (ch, key) => {
      // run the selected script
      const script = this._getCurrentScriptInstance();
      if (!script) return;
      clipboardy.writeSync(stripAnsi(script.stack.join("")));
    });

    this.screen.key(["e"], (ch, key) => {
      // run the selected script
      const script = this._getCurrentScriptInstance();
      if (!script) return;
      script.kill();
    });

    let keyTimeout = null;
    let keys = "";
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].forEach(key => {
      this.screen.key([`${key}`], (ch, key) => {
        keys += key.full;

        clearTimeout(keyTimeout);
        keyTimeout = setTimeout(() => {
          if (parseInt(keys) > Object.keys(this._scriptsStack).length) {
            keys = "";
            return;
          }

          // select the script
          const script = this._scriptsStack[
            Object.keys(this._scriptsStack)[parseInt(keys) - 1]
          ];
          this.screen.$scriptsList.select(parseInt(keys) - 1);
          this._selectScript(script);
          this._renderScreen();

          // reset keys
          keys = "";
        }, 150);
      });
    });
  }

  _updateFooterContent() {
    const footerContent = [];
    const switchColorFn = this._config.switch
      ? chalk.bgGreen.black
      : chalk.bgRed.black;
    const currentScript = this._getCurrentScriptInstance();
    const watchColorFn = currentScript.isWatched()
      ? chalk.bgBlue.black
      : chalk.bgWhite.black;
    footerContent.push(`${chalk.bgWhite.black(" Run (r) ")}`);
    footerContent.push(`${chalk.bgWhite.black(" Exit (e) ")}`);
    footerContent.push(`${chalk.bgWhite.black(" Copy (c) ")}`);
    if (currentScript.isWatchable()) {
      footerContent.push(`${watchColorFn(" Watch (w) ")}`);
    }
    footerContent.push(`${switchColorFn(" Switch (s) ")}`);
    // footerContent.push(`${chalk.bgWhite.black(' Exit ')} ${chalk.bold.black('ctrl-c')} `)
    footerContent.push(`\n`);
    if (this._packageJson.homepage) {
      footerContent.push(
        `${chalk.bgBlack.white(" Homepage ")} ${chalk.bold.black(
          this._packageJson.homepage
        )} `
      );
    }
    if (this._packageJson.author) {
      footerContent.push(
        `${chalk.bgBlack.white(" Author ")} ${chalk.bold.black(
          this._packageJson.author
        )}`
      );
    }
    this.screen.$footerBox.setContent(footerContent.join(""));
  }

  _renderScreen() {
    this.screen.render();
  }

  _getScriptIdxInList(id) {
    return this.screen.$scriptsList.getItem(
      Object.keys(this._scriptsStack).indexOf(id)
    );
  }

  _getScriptIdFromListLine(line) {
    const splits = line.split(" ");
    return splits[splits.length - 1];
  }

  _listScriptName(scriptId, icon = null) {
    const script = this._getScriptInstance(scriptId);
    let watched = script.isWatchable() ? chalk.blue("-") + " " : "";
    if (script.isWatched()) {
      watched = chalk.blue("w") + " ";
    }
    let iconToDisplay = watched;
    if (icon) {
      iconToDisplay = `${icon} `;
    }

    let readedIcon = "";
    if (!script.isReaded()) {
      readedIcon = logSymbols.info + " ";
    }

    let idx = pad(
      2,
      Object.keys(this._scriptsStack).indexOf(scriptId) + 1,
      "0"
    );

    return ` ${idx}. ${iconToDisplay}${readedIcon}${scriptId}`;
  }

  _initScriptsList(blessedList, scriptsStack) {
    blessedList.clearItems();
    Object.keys(scriptsStack).forEach(scriptId => {
      blessedList.addItem(this._listScriptName(scriptId));
    });
  }

  _runScript(script) {
    script = this._getScriptInstance(script);
    this._switchToScript(script);
    script.run();
  }

  _switchToScript(script) {
    script = this._getScriptInstance(script);
    if (this._config.switch) {
      clearTimeout(this._switchTimeout);
      this._switchTimeout = setTimeout(() => {
        const listItemIdx = this._getScriptIdxInList(script.id);
        this.screen.$scriptsList.select(listItemIdx);
        this._selectScript(script);
      });
    }
  }

  _selectScript(script) {
    // set the current script id
    this._currentScriptId = script.id;

    // set the console content to the selected script
    this.screen.$consoleBox.setContent(script.stack.join(""));
    this.screen.$consoleBox.scroll(99999999999);

    // mark the script as read
    // script.markAsRead()

    if (!script.isRunning()) {
      const listItemIdx = this._getScriptIdxInList(script.id);
      this.screen.$scriptsList.setItem(
        listItemIdx,
        this._listScriptName(script.id)
      );
    }

    // update footer content
    this._updateFooterContent();

    this._renderScreen();
  }

  _addScriptsListeners(scriptsStack) {
    Object.keys(scriptsStack).forEach(scriptId => {
      const scr = scriptsStack[scriptId];
      (script => {
        script.on("start", data => {
          const chars = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];
          let current = 0;
          const listItemIdx = this._getScriptIdxInList(script.id);
          script._updateInterval = setInterval(() => {
            current = current + 1 < chars.length ? current + 1 : 0;
            this.screen.$scriptsList.setItem(
              listItemIdx,
              this._listScriptName(script.id, chalk.cyan(chars[current]))
            );
            this._renderScreen();
          }, 50);
          // switch to script
          this._switchToScript(script);
        });
        script.on("exit", data => {
          clearInterval(script._updateInterval);
          const listItemIdx = this._getScriptIdxInList(script.id);
          script._updateInterval = setTimeout(() => {
            this.screen.$scriptsList.setItem(
              listItemIdx,
              this._listScriptName(script.id)
            );
            this._renderScreen();
          }, 1000);
          this.screen.$scriptsList.setItem(
            listItemIdx,
            this._listScriptName(script.id, chalk.green(logSymbols.success))
          );
          this._renderScreen();

          // notification
          const icons = ["css", "fonts", "icons", "img", "js"];
          const splitedScript = script.id.split(":");
          const lastSplit = splitedScript[splitedScript.length - 1];
          const icon =
            icons.indexOf(lastSplit) !== -1 ? `icon-${lastSplit}` : null;
          if (this._config.notifications) {
            nodeNotifier.notify({
              title: this._packageJson.name,
              subtitle: script.id,
              message: "Completed successfuly",
              icon: icon
                ? path.join(__dirname, `../.resources/${icon}.png`)
                : null,
              sound: true,
              timeout: 4
            });
          }
        });
        script.on("data", data => {
          if (this._currentScriptId === scriptId) {
            this.screen.$consoleBox.setContent(script.stack.join(""));
          }
          this.screen.$consoleBox.scroll(99999999999);
          this._renderScreen();
        });
        script.on("error", data => {
          // set the error icon on the item
          clearInterval(script._updateInterval);
          const listItemIdx = this._getScriptIdxInList(script.id);
          this.screen.$scriptsList.setItem(
            listItemIdx,
            this._listScriptName(script.id, chalk.red(logSymbols.error))
          );
          this._renderScreen();
        });
        // script.on('warning', (data) => {
        //   // set the error icon on the item
        //   clearInterval(script._updateInterval)
        //   const listItemIdx = this._getScriptIdxInList(script.id)
        //   this.screen.$scriptsList.setItem(listItemIdx, this._listScriptName(script.id, chalk.yellow(logSymbols.warning)))
        //   this._renderScreen()
        // })
      })(scr);
    });
  }

  _handleExit() {
    // process.on( 'SIGINT', function() {
    // })
  }

  get packageJson() {
    return this._packageJson;
  }

  get screen() {
    return this._screen;
  }
}

module.exports = scriptsStack;
