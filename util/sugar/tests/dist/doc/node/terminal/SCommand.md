


<!-- @namespace    sugar.node.terminal -->

# ```js SCommand ```


This class define a command that you can launch, subscribe for data, etc...

// TODO: settings documentation

## Parameters

- **name**  String: Specify a simple name for this command

- **command**  String: The command that this instance has to represent. Can contain some "tokens" like "[port]" that will be replaced with the asked question results

- **settings** ([object Object]) Object: Some settings to configure your command
- ask (null) {Object|Array}: Specify one or more (Array) questions to ask before running the command. Here's the possible object properties for a question:
   - type (summary) {String}: Specify the question type. For now it support:
       - summary: This display a list of default values for some properties with the ability to edit each of them.
         - items ([]) {Array}: An array of properties object to display.
           - id (null) {String}: The id of the property like "port"
           - text (null) {String}: The text to display before the property value like "Server port"
           - default (null) {Mixed}: The default value for this property
   - question (null) {String}: Specify the question to ask to the user



## Example (js)

```js
const SCommand = require('@coffeekraken/sugar/node/terminal/SCommand');
const myCommand = new SCommand('ls -la', {});
myCommand.run();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# Static ```js getCommandsByName ```
### Since: 2.0.0

This static methods allows you to get back all the commands instances depending on the passed namespace glob pattern.
Each commands can have as setting a "namespace" property that will be used to get the commands back using this method.
Note that a command that does not have any namespace cannot be retreived using this command.

## Parameters

- **name**  String: TThe command name that you want to get back




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# Static ```js getCommandsByNamespace ```
### Since: 2.0.0

This static methods allows you to get back all the commands instances depending on the passed namespace glob pattern.
Each commands can have as setting a "namespace" property that will be used to get the commands back using this method.
Note that a command that does not have any namespace cannot be retreived using this command.

## Parameters

- **namespace**  String: TThe command glob namespace pattern that you want to get back




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js isRunning ```


This method return true if the command is currently running, false if not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js concurrent ```


This method return true if the command can be concurrent, false if not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _initKey ```


This method init the key listening if a settings.key is defined




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js isWatching ```


Get if this command is currently watching or not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js unwatch ```
### Since: 2.0.0

This methid allows you to stop the watch process if one has been launched




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js watch ```


This method init the watch process passed in the settings.watch object




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js kill ```


This method can be used to kill the current running process




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js destroy ```
### Since: 2.0.0

This method is used to destroy this instance.
This mean that you can not run it anymore, you cannot retreive it by using
the static "getCommands" method, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js run ```


This method is used to run the command

## Parameters

- **args** (settings.argsObj) Object: An optional arguments object for this particular process instance. If not specified, will take the default one passed in the constructor settings

- **skipAsk** (true) Boolean: Specify if you want to skip the "ask" process




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _runSCli ```


This method run a SCli based command




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _ask ```


This method take care of asking something to the user ans return back the user answer.

## Parameters

- **question**  Object: The question object that describe what to ask. Here's the list of properties available:
- question (null) {String}: Specify the question to ask
- type (yesOrNo) {String}: Specify the type of question to ask. Can be only "yesOrNo" for now but more to come...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _check ```


This methood takes a command as parameter and return true if it is executable or throw an error if not




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _id ```
### Since: 2.0.0

Store the command generated uniquid



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _name ```
### Since: 2.0.0

Store the command name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _command ```
### Since: 2.0.0

Store the command



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _id ```
### Since: 2.0.0

Store a unique id that identify the command instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _destroyed ```
### Since: 2.0.0

Store the "destroy" state of this command



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _currentProcess ```
### Since: 2.0.0

This store the current process object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _watchProcess ```
### Since: 2.0.0

This store the watch child process instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _processesStack ```
### Since: 2.0.0

This store all the runned processes



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _isWatching ```


Store the watching status



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# Static ```js _commandsStack ```
### Since: 2.0.0

This static property store all the commands instances that have been instanciated



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js name ```


Get the command name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js title ```


Get the command title if specified in the settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js key ```


Get the command key



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js namespace ```


Get the command namespace



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js color ```


Get the command color



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js command ```


Get the command command



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js lastProcessObj ```


Get the last process. It can be the running one as well as a finished one



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js runningProcessObj ```


Get the running process.



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js processesStack ```


Get all the runned/ing processes objects



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

