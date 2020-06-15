


<!-- @namespace    sugar.node.blessed -->
<!-- @name    SCommandPanel -->

# ```js SCommandPanel ```


This class is a simple SPanel extended one that accesp an SCommandPanel instance
to log the data's from and display an simple UI depending on the SCommandPanel configured keys

## Parameters

- **process**  SCommandPanel: The SCommandPanel instance you want to attach

- **settings** ([object Object]) Object: The settings object to configure your SCommandPanel



## Example (js)

```js
const SCommandPanel = require('@coffeekraken/sugar/node/terminal/SCommandPanel');
const myPanel = new SCommandPanel(myProcess, {
   screen: true
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _subscribeToCommandsEvents -->

# ```js _subscribeToCommandsEvents ```
### Since: 2.0.0

This method subscribe to the commands events to make corresponding action like log, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _initFilterPopup -->

# ```js _initFilterPopup ```


This method initialize the filter popup




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    summary -->

# ```js summary ```


This method display a summary list to the user with the possibility to update
each data and validate




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    filterByNamespace -->

# ```js filterByNamespace ```


This method simply takes a namespae and filter the displayed commands

## Parameters

- **namespace**  String: The namespace to apply




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _clearCommands -->

# ```js _clearCommands ```


This method remove all the command boxes from the content panel as
well as in the "_commands" property as well as in the "_boxesObjectsMap"




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _generateUI -->

# ```js _generateUI ```


This method take the registered keys in the process and generate a nice and clean UI for it




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _updateCommandBoxesStyle -->

# ```js _updateCommandBoxesStyle ```


This method handle the display of a command box depending on his state, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _openCommandBox -->

# ```js _openCommandBox ```


This method simply open the passed panel box by animating the transition state

## Parameters

- **commandInstance**  SCommand: The command instance for which you want to open the box




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _closePanelBox -->

# ```js _closePanelBox ```


This method simply open the passed panel box by animating the transition state

## Parameters

- **commandInstance**  SCommand: The panel that store the box to animate




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _updateCommandBoxesContent -->

# ```js _updateCommandBoxesContent ```


This method take all the current commandInstance available and set the layout correctly depending
on how many they are, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _updateCommandBoxesLayout -->

# ```js _updateCommandBoxesLayout ```


This method take all the current commandInstance available and set the layout correctly depending
on how many they are, etc...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _commands -->

# ```js _commands ```


Store the passed "commands" parameter that can be either an Array of SCommands instances,
either a namespace string of commands that you want to display



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    $log -->

# ```js $log ```


Store the actual box where the logs will be pushed



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    $namespace -->

# ```js $namespace ```


Store the "namespace" panel that display which is the current namespace displayed



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _namespace -->

# ```js _namespace ```


Store the current displayed namespace



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

