


<!-- @namespace    sugar.node.blessed -->

# ```js SComponent ```


This class is the base one for all the sugar blessed components like input, panel, etc...

## Parameters

- **settings** ([object Object]) Object: A settings object to configure your list. Here's the available settings:



## Example (js)

```js
const SComponent = require('@coffeekraken/sugar/node/blessed/SComponent');
class MyCoolComponent extends SComponent {
   constructor(settings = {}) {
     super(settings);
   }
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js attach ```


This method simply append the component to the generated screen




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js update ```


This method simply update the screen if the component is a child of one




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _settings ```


Store the component settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

