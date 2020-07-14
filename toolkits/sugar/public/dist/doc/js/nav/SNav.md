


<!-- @namespace    sugar.js.nav -->
<!-- @name    SNav -->

# ```js SNav ```
### Since: 2.0.0

This class represent a navigation tree that you can manage, add items, and display in multiple formats like html, markdown, and more to come

## Parameters

- **itemsArray**  Array<SNav,SNavItem>: An array of SNav or SNavItem instance representing a navigation item

- **settings** ([object Object]) Object: A settings object to configure your nav tree



## Example (js)

```js
import SNav from '@coffeekraken/sugar/js/nav/SNav';
import SNavItem from '@coffeekraken/sugar/js/SNavItem';
const myNav = new SNav([
   new SNavItem('myCoolItem', 'Something cool', '#anchorLink')
]);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    getItemIndex -->

# ```js getItemIndex ```


This method allows you to get the passed item instance index in the navigation

## Parameters

- **item**  SNavItem: The item instance you want the index for




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    getItem -->

# ```js getItem ```


This method allows you to get an item using either an index like "0", "1", etc... or a uniqid String

## Parameters

- **from**  String,Number: The parameter you want to get an index with




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    addItem -->

# ```js addItem ```


This method is used to add an SNavItem instance to the navigation

## Parameters

- **...items**  SNavItem: One or more items to add




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    removeItem -->

# ```js removeItem ```


THis method is used to remove an item either by specifying his uniqid, his index in the nav items array or directly the SNavItem instance to remove

## Parameters

- **...items**  String,Number,SNavItem: The items identifier to remove. Can be the item uniqid, the index in the nav or the SNavItem instance directly




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toMarkdown -->

# ```js toMarkdown ```


This method allows you to get a markdown version of the navigation

## Parameters

- **settings** (settings.markdown) Object: A settings object to configure your markdown conversion:
// TODO: list options



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    toHtml -->

# ```js toHtml ```


This method allows you to get an HTML version of the navigation

## Parameters

- **settings** (settings.html) Object: A settings object to configure your html conversion:
// TODO: list options



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _settings -->

# ```js _settings ```


Store the settings object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _id -->

# ```js _id ```


Store the uniqid of this navigation



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _text -->

# ```js _text ```


Store the navigation text that can be displayed or not



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _itemsArray -->

# ```js _itemsArray ```


Store the array of SNavItems instances that will compose the navigation



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    promise -->

# get ```js promise ```


Access the SPromise instance on which you can subscribe for these events:
- item.add: Triggered when an item has been added. The item is passed with the event
- item.remove: Triggered when an item has been removed. The item is passed with the event



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    id -->

# get ```js id ```


Access the navigation id



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    text -->

# get ```js text ```


Access the navigation text



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    items -->

# get ```js items ```


Access the registered nav items



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

