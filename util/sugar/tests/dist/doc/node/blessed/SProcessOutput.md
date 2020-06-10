


<!-- @namespace    sugar.node.blessed -->

# ```js SProcessOutput ```


This class is a simple SPanel extended one that accesp an SProcessOutput instance
to log the data's from and display an simple UI depending on the SProcessOutput configured keys

## Parameters

- **process**  SProcessOutput: The SProcessOutput instance you want to attach

- **settings** ([object Object]) Object: The settings object to configure your SProcessOutput



## Example (js)

```js
const SProcessOutput = require('@coffeekraken/sugar/node/terminal/SProcessOutput');
const myPanel = new SProcessOutput(myProcess, {
   screen: true
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _subscribeToProcess ```


This method simply listen to the process and log the values getted
from it into the panel




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js log ```


This method simply log the passed arguments

## Parameters

- **...args**  Mixed: The arguments you want to log




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _generateUI ```


This method take the registered keys in the process and generate a nice and clean UI for it




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _process ```


Store the SProcessOutput instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _logBox ```


Store the actual box where the logs will be pushed



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

