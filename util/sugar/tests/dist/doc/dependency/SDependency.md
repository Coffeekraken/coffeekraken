
# Class


## ```js SDependency ```
### Since: 2.0.0

This class is the base one for dependencys like PHP, Node, etc... It allows you to check if you have already the dependency installed,
if you can update it, etc...

## Parameters

- **name**  String: The dependency name like "php", "node", etc...

- **settings** ([object Object]) Object: An object of settings described bellow:



## Example (js)

```js
const SDependency = require('@coffeekraken/sugar/node/dependency/SDependency');
class MyDependency extends SDependency {
   constructor() {
     super('myDependency');
   }
}
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _loadDepFile ```


Load the dep file path content




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js install ```


This method process to the installation of the dependency

## Parameters

- **version**  String: The version you want to install




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _execCommands ```


This method take care of executing one or more commands and send back an SPromise on which you can subscribe for:
- data: Triggered when a log happens in the child process
- then: Triggered when one command is finished and another starts
- finally: Triggered when all the commands have finished successfully
- error: Triggered when something goes wrong inside a command

## Parameters

- **commands**  Array,String: The commands you want to execute




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js _settings ```


Store the process settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _name ```


Store the dependency name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _depFilepath ```


Store the dependency file path



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _depJson ```


Store the dependency object description



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

