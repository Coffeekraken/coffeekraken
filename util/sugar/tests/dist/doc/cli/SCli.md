
# Class


## ```js SCli ```
### Since: 2.0.0

This class represent a basic CLI command with his definition object, his command string, etc...

## Parameters

- **commandString**  String: The command string that contains arguments tokens and the "[arguments]" token where you want the parsed arguments to be placed

- **definitionObj**  Object: The definition object that represent all the available arguments, their types, etc... Here's the definitionObj format:
- argName:
   - type (null) {String}: The argument type like "String", "Boolean", "Array", "Number" or "Object"
   - alias (null) {String}: A 1 letter alias for the argument to be used like "-a", "-g", etc...
   - description (null) {String}: A small and efficient argument description
   - default (null) {Mixed}: The default argument value if nothing is specified
   - level (1) {Number}: This represent the "importance" of the argument. An argument with level 1 is an argument often used that will be displayed in the summary command list. An argument of level 2 if less important and can be skipped.



## Example (js)

```js
const SCli = require('@coffeekraken/sugar/js/cli/SCli');
class MyCli extends SCli {
   static command = 'php [hostname]:[port] [rootDir] [arguments]';
   static definitionObj = {
     hostname: {
       type: 'String',
       description: 'Server hostname',
       default: 'localhost'
     },
     port: {
       type: 'Number',
       description: 'Server port',
       default: 8080
     },
     // etc...
   }:
   constructor(settings = {}) {
     super(settings);
   }
}
const myCli = new MyCli();
myCli.getCommandLine({
   port: 8888
}); // => php localhost:8888 .
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _checkCliIntegrity ```


This method simply check that the extended SCli instance has the needed overrided methods, etc...




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js toString ```


This method allows you to pass an arguments object and return the builded command line string depending on the definition object.

## Parameters

- **argsObj**  Object: An argument object to use for the command line string generation

- **includeAllArgs** (settings.includeAllArgs) Boolean: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js run ```


This method run a new child process with the provided arguments and the definition object.
The returned object MUST be an SPromise instance that emit these "events":
- start: Triggered when the command start a process
- close: Triggered when the process is closed
- kill: Triggered when the process has been killed
- success: Triggered when the process has finished without any error
- error: Triggered when the process has had an error
- stdout.data: Triggered when some data are pushed in the stdout channel
- stderr.data: Triggered when some data are pushed in the srderr channel

You can use the "spawn" function available under the namespace "sugar.node.childProcess" in order to
spawn the process with already all these events setted...

## Parameters

- **argsObj** (settings.argsObj) Object: An argument object to override the default values of the definition object

- **includeAllArgs** (settings.includeAllArgs) Boolean: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument



## Example (js)

```js
myCli.run({
   port: 8888
}).on('start', data => {
   // do something...
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js isRunning ```


This method simply return true or false if the child process is running or not




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js runWithOutput ```


This method run the command line and display his output
in a nicely styled screen.
Check the "run" method documentation for the the arguments and return values




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js kill ```


This method simply kill the running child process if their's one, otherwise it will do nothing.




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _runningProcessArgsObject ```


This method take an argument object as parameter and return
the final argument object depending on the definitionObj and the passed object

## Parameters

- **argsObj** (settings.argsObj) Object: An argument object used for processing the final argument object one

- **includeAllArgs** (settings.includeAllArgs) Boolean: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js log ```


This method simulate a log coming fron the child process

## Parameters

- **...args**  Mixed: The message(s) to log




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js _childProcess ```


Store the spawned child process



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _runningArgsObj ```


Store the currently running process arguments object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _settings ```


Store the instance settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js commandString ```


Access the command string



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js definitionObj ```


Access the definition object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## get ```js runningArgsObj ```


Get the current process lauched with "run" or "runWithOutput" methods arguments



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

