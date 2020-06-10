


<!-- @namespace    sugar.js.class -->

# ```js SBind ```


This class allows to bind properties between objects, object to HTMLElement attribute and vice versa.



## Example (js)

```js
const binder = new SBind();

// keep in sync the myObject2.title with the myObject1.title property
binder.bindObjectPath2ObjectPath(myObject1, 'title', myObject2, 'title');

// update and HTMLElement attribute when the myObject1.title is updated
binder.bindObjectPath2ElementAttribute(myObject1, 'title', myHTMLElement, 'title');

// and more...
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js bind ```


This method allows you to bind an Object|HTMLElement property to another Object|HTMLElement property
This mean that when the property of the first passed element is updated, the same property on the second
element will be updated as well

## Parameters

- **source**  Object,HTMLElement: The source object

- **sourcePath**  String: The source path to the property that you want to bind

- **target**  Object,HTMLElement: The target object

- **targetPath** (sourcePath) String: The target path to the property that you want to be sync with the source element




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _bindStack ```


Store all the bind objects settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _mutationObservedElementsStack ```


Store all the mutation observers that are used to
be notified when attributes are updated



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _digestsMutation ```


Store for each binded HTMLElement if each binded attributes are
in digest phase to avoid multiple assignement of the same attribute
in each digest phase



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

