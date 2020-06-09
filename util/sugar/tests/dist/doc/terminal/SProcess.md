
# Class


## ```js SProcess ```
### Since: 2.0.0

TODO: documentation

## Parameters

- **commands**  String: The commands that you want to be available in this process. The format is { name: command }

- **settings** ([object Object]) Object: An object of settings described bellow:
- type (default) {String}: This specify the type of process you want. It can be:
   - default: Simple process that does not launch anything by default
   - steps: This describe a step by step process that will automatically launch the first command and run the next after next ones
- keys ({}) {Object}: This describe the keyboard hotkeys associated with this process. Each hotkey has to be described with these properties:
   - key: Specify the key to listen for
   - type: Can be either "toggle", "run" or "action"
       - toggle: Simply toggle the "value" property in the key object to true/false
       - run: Simply launch the associated command by specifying the property "command" with the command name wanted
- action: Does nothing by default. Simply specify the action name you want in the "action" property and you'll get access to that by listening "key.action" on the promise
- menu: Specify the text wanted in the menu when using this class with an SProcessPanel instance
- action: Specify an action name when the type is "action"
- command: Specify a command name to run when the type is "run"



## Example (js)

```js
const SProcess = require('@coffeekraken/sugar/node/terminal/SProcess');
const app = new SProcess({
   install: {
     command: 'npm install something'
   }
}, {
   // some settings here...
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _pipeCommandsPromises ```


This methods pipe all the SCommand promises to this process promise




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js run ```


This method is used to run the command

## Parameters

- **command**  SCommand,String: The SCommand instance to run or the name under which it is stored in the commands object




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js _settings ```


Store the process settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _commands ```


This is an object that store the available commands in this process



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js biggestCommandName ```


Get the biggest command name passed in constructor



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js commands ```


Access the commands object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

