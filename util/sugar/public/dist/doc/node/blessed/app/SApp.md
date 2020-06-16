


<!-- @namespace    sugar.node.blessed.app -->
<!-- @name    SApp -->

# ```js SApp ```


This class is the main one when you want to create a Sugar terminal based application.

## Parameters

- **settings** ([object Object]) Object: A settings object to configure your list. Here's the available settings:



## Example (js)

```js
const SApp = require('@coffeekraken/sugar/node/blessed/app/SApp');
class MyApp extends SApp {
   constructor(settings = {}) {
     super(settings);
   }
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    config -->

# ```js config ```


This methods allows you to get some configuration through the setted SConfig instance

## Parameters

- **dotedPath**  String: The doted path to the config you want to get




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    goTo -->

# ```js goTo ```


This methods allows you to specify the "url" you want to go to

## Parameters

- **url**  String: The url you want to go to



## Example (js)

```js
myCoolApp.goTo('/something/cool');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    back -->

# ```js back ```


This method simply go back 1 url in the history




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _goTo -->

# ```js _goTo ```


This is the internal version of the goTo method. It will take care of actualy change the page etc...

## Parameters

- **sUrl**  SUrl: An SUrl instance to work with




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _initCommands -->

# ```js _initCommands ```


This methods takes the commands classes specified in the configuration
and instanciate them to be available through the app




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _getProcessInstance -->

# ```js _getProcessInstance ```


This method take care of retreiving the SProcess instance linked to a certain page/url.

## Parameters

- **url**  String: The url where the user want to go

- **rawUrl**  String: The raw url used in the config. This is the url that may content some params like "{what}", etc...

- **parsedSchema**  Object: The parsed url schema




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    exec -->

# ```js exec ```


This method takes one or more SCommand instances and execute them.
You can also pass as parameter a simple text command like "ls -la" or whatever

## Parameters

- **command**  String,SCommand,Array: The command(s) to execute



## Example (js)

```js
myCoolApp.exec('ls -la');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    process -->

# ```js process ```


This method take as parameter an SProcess instance and display it properly

## Parameters

- **process**  SProcess: The SProcess to display



## Example (js)

```js
myCoolApp.process(myCoolProcess);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    append -->

# ```js append ```


This method simply append some content inside the contentBox

## Parameters

- **component**  SComponent: The component to add

- **ui**  Boolean: Specify if you want to append this component to the ui or in the content box




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    update -->

# ```js update ```


This method simply draw the UI on the screen




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _historyArray -->

# ```js _historyArray ```


Store the urls object history



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _pagesStack -->

# ```js _pagesStack ```


Store the pages instances to reuse them instead of recreate them every
page change...



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _commandsStack -->

# ```js _commandsStack ```


Store the instanciated commands specified in the config



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    currentUrlObj -->

# get ```js currentUrlObj ```


Access the current url object.



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    previousUrlObj -->

# get ```js previousUrlObj ```


Access the previous url object.



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

